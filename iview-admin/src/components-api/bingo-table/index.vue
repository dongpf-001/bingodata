<template>
    <div class="i-table-border list-page-out list-resize"  :style="'height:'+ 'calc(100% - '+sHeight+'px)' " ref="table-list" v-resize="handleResize" :class="{'fullScreen': fullFlag}">
        <div  v-show="toolbar" ref="toolbar">
            <bingo-toolbar :showNew="showNew" :showDelete="showDelete" :fullFlag="fullFlag"
                           :showRefresh="showRefresh" :showAllButton="showAllButton" :showOpenButton="showOpenButton" @on-new="newClick" @on-refresh="onRefresh" @on-delete="onDelete" @open-full-modal="openFullModal"
                           :disabledNew="disabledNew" :disabledDelete="disabledDelete" :disabledRefresh="disabledRefresh">
            <span slot="toolbar">
             <slot></slot>
                 <Select  v-if="layoutShow" v-model="layoutValue" style="width:150px;margin-left: 5px" placeholder="请选择布局" @on-change="layoutChange">
                      <Option  value="">空模板</Option>
                    <Option v-for="item in layoutList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
                <Button v-if="layoutShow" type='primary' @click="openLayout" style="margin-left: 5px">设置布局</Button>
            </span>
            </bingo-toolbar>
        </div>
        <div :class="{'table-full': fullFlag}">
            <Table
                    stripe
                    v-bind="$attrs"
                    v-on="$listeners"
                    @on-select="onSelect"
                    @on-select-all="onSelectAll"
                    :no-data-text="noDataText"
                    @on-sort-change="onSortChange"
                    @on-selection-change="onSelectionChange"
                    ref="table"
                    :disabledHover="disabledHover"
                    :columns="columnsList"
                    :loading="loading"
                    :height="zHeigth"
                    :draggable="draggable"
                    @on-drag-drop="onDragDrop"
                    :data="data"
                    :border="true"
                    :size="size"
                    :highlight-row="highlightRow"
            >
                <template slot-scope="{ row, index }" v-for="col in columns" :slot="col.slot">
                    <slot :name="col.slot" :row="row" :index="index"></slot>
                </template>
            </Table>
            <div class="page-wrapper ivu-text-center" v-show="page">
                <Page placement="top" :total="pageSetting.pageTotal" :page-size="pageSetting.pageSize"
                      :current.sync="pageSetting.pageNum" :show-sizer="pageSetting.showSizer"
                      :page-size-opts="pageSizeOpts" show-total @on-page-size-change="pagesizechange"
                      @on-change="pageChange"></Page>
            </div>
        </div>
        <bingoModalEdit v-model="layoutModal" :width="860"   title="布局管理">
           <span slot="toolbar">
                   <Button type='primary' customIcon='iconfont iconxinjian1' @click="addLayout">新建</Button>
                    <Button type='primary' customIcon='iconfont iconbaocun1' @click="saveLayout">保存</Button>
                    <Button type='primary' customIcon='iconfont iconbaocunbingguanbi' @click="saveLayoutClose">保存并关闭</Button>
                    <Button type='primary' icon='md-trash' @click="delLayout">删除</Button>
                    <Button type='primary' icon='md-close' @click="layoutModal=false">关闭</Button>
               <!--<Button type='primary' icon='md-close' @click="syncCurrentLayout">同步列表布局</Button>-->
                </span>
            <Tabs value="name1" type="card">
                <TabPane label="基础" name="name1">
                    <bingo-form :col="2" :labelWidth="90" ref="form" :button="false">
                        <bingo-grid-item>
                            <FormItem label="模板名称" prop="layoutName" label-for="layoutName">
                                <Input v-model="layoutDetail.name"/>
                            </FormItem>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <FormItem label="每页条数" prop="layoutDetail.pageSize" label-for="pageSize">
                                <RadioGroup v-model="layoutDetail.pageSize">
                                    <Radio :label="20">20</Radio>
                                    <Radio :label="40">40</Radio>
                                    <Radio :label="50">50</Radio>
                                    <Radio :label="100">100</Radio>
                                </RadioGroup>
                            </FormItem>
                        </bingo-grid-item>
                        <bingo-grid-item :colspan="2">
                            <FormItem label="默认" label-for="default">
                                <!--<Input v-model="layoutDetail.default"/>-->
                                <RadioGroup v-model="layoutDetail.defaultValue">
                                    <Radio :label="1">是</Radio>
                                    <Radio :label="0">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </bingo-grid-item>
                        <bingo-grid-item :colspan="2">
                            <FormItem label="备注" label-for="remark">
                                <Input v-model="layoutDetail.remark"  type="textarea" :rows="3" maxlength="500"/>
                            </FormItem>
                        </bingo-grid-item>
                    </bingo-form>
                </TabPane>
                <TabPane label="显示" name="name2">
                    <div style="height: 100%">
                        <ag-grid-vue style="width: 100%; height: 320px" class="table ag-theme-fresh"
                                     :gridOptions="gridOptions_column"
                                     @grid-ready="onGridReady_column"
                                     :columnDefs="columnDefs_column"
                                     :defaultColDef="defaultColDef_column"
                                     :rowDragManaged="true"
                                     :animateRows="true"
                                     :localeText="localeText"
                                     :rowData="currentLayout"
                                     :modules="modules"
                        ></ag-grid-vue>
                    </div>
                </TabPane>
            </Tabs>
        </bingoModalEdit>
    </div>
</template>
<script>
import bingoToolbar from '@/components-api/bingo-toolbar'
import Vue from 'vue'
import * as Api from '@/api/bmsa/account'
import bingoModalEdit from '@/components-api/bingo-modal/bingo-modal-edit'
import bingoForm from '@/components-api/bingo-form/index.vue'
import bingoGridItem from '@/components-api/bingo-grid-item/index.vue'
import { AgGridVue } from '@ag-grid-community/vue'
import { AllModules } from '@ag-grid-enterprise/all-modules'
export default {
  name: 'bingo-table',
  props: {
    layoutShow: {
      type: Boolean,
      default: true
    },
    disabledHover: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    disabledNew: {
      type: Boolean,
      default: false
    },
    disabledDelete: {
      type: Boolean,
      default: false
    },
    disabledRefresh: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array
    },
    data: {
      type: Array,
      default: function () {
        return [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    showNew: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showOpenButton: {
      type: Boolean,
      default: true
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    showAllButton: {
      type: Boolean,
      default: true
    },
    query: {
      type: Boolean,
      default: true
    },
    modalTable: {
      type: Boolean,
      default: false
    },
    bill: {
      type: Boolean,
      default: false
    },
    page: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    layoutName: {
      type: String,
      default: ''
    },
    customHeight: {
      type: Number,
      default: 0
    },
    height: {
      type: Number
    },
    pageSetting: {
      type: Object,
      default: {
        pageNum: 2,
        pageTotal: 50,
        pageSize: 40,
        showSizer: true
      }
    },
    pageSizeOpts: {
      type: Array,
      default: function () {
        return [20, 40, 50, 100]
      }
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  components: {
    AgGridVue, bingoToolbar, bingoModalEdit, bingoForm, bingoGridItem
  },
  data () {
    return {
      pageChangeFlag: false,
      noDataText: '',
      layoutValue: '',
      layoutModal: false,
      layoutDetail: {
        pageSize: 40,
        defaultValue: 0,
        name: ''
      },
      layoutList: [],
      fullModal: false,
      loading: false,
      sHeight: 0,
      tHeight: 0,
      zHeigth: 0,
      selection: [],
      orderBy: '',
      fullFlag: false,
      params: {},
      currentLayout: [],
      columnDefs_column: [
        {
          field: '移动',
          width: 38,
          suppressMenu: true,
          headerClass: 'header-center',
          cellStyle: { 'text-align': 'center' },
          rowDrag: true
        },
        { field: 'colName', headerName: '列名', width: 150 },
        { field: 'width', headerName: '宽度', width: 80, editable: true },
        { field: 'hide',
          headerName: '是否显示',
          width: 120,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellRenderer: function (params) {
            if (!params.value || params.value == false) {
              return '显示'
            } else {
              return '隐藏'
            }
          },
          cellEditorParams: {
            cellRenderer: function (params) {
              if (!params.value || params.value == false) {
                return '显示'
              } else {
                return '隐藏'
              }
            },
            values: [ true, false]
          }
        },
        { field: 'sort',
          headerName: '排序',
          width: 80,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellRenderer: function (params) {
            if (params.value == 'asc') {
              return '正序'
            } else if (params.value == 'desc') {
              return '倒序'
            } else {
              return '无排序'
            }
          },
          cellEditorParams: {
            cellRenderer: function (params) {
              if (params.value == 'asc') {
                return '正序'
              } else if (params.value == 'desc') {
                return '倒序'
              } else {
                return '无排序'
              }
            },
            values: [ 'asc', 'desc', '']
          }
        },
        { field: 'pinned',
          headerName: '是否锁定',
          width: 120,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellRenderer: function (params) {
            if (params.value == 'left') {
              return '靠左锁定'
            } else {
              return '不锁定'
            }
          },
          cellEditorParams: {
            cellRenderer: function (params) {
              if (params.value == '1' || params.value == 'left') {
                return '靠左锁定'
              } else {
                return '不锁定'
              }
            },
            values: [ 'left', '']
          }
        }
        // { field: 'filter', headerName:'过滤条件', width:150, editable: true, },

      ],
      gridOptions_column: {},
      components: {},
      localeText: {
        page: '页',
        more: '更多',
        to: '到',
        of: 'of',
        next: '下一页',
        last: '上一页',
        first: '首页',
        previous: '上一页',
        loadingOoo: '加载中...',
        selectAll: '查询全部',
        searchOoo: '查询...',
        blanks: '空白',
        filterOoo: '过滤...',
        applyFilter: 'daApplyFilter...',
        equals: '相等',
        notEqual: '不相等',
        lessThan: '小于',
        greaterThan: '大于',
        lessThanOrEqual: '小于等于',
        greaterThanOrEqual: '大于等于',
        inRange: '范围',
        contains: '包含',
        notContains: '不包含',
        startsWith: '开始于',
        endsWith: '结束于',
        group: '组',
        columns: '列',
        filters: '筛选',
        rowGroupColumns: 'laPivot Cols',
        rowGroupColumnsEmptyMessage: 'la drag cols to group',
        valueColumns: 'laValue Cols',
        pivotMode: 'laPivot-Mode',
        groups: 'laGroups',
        values: '值',
        pivots: 'laPivots',
        valueColumnsEmptyMessage: 'la drag cols to aggregate',
        pivotColumnsEmptyMessage: 'la drag here to pivot',
        toolPanelButton: 'la tool panel',
        noRowsToShow: '暂无数据',
        pinColumn: '列定位',
        valueAggregation: 'laValue Agg',
        autosizeThiscolumn: '自动调整该列大小',
        autosizeAllColumns: '自动调整所有列大小',
        groupBy: '排序',
        ungroupBy: '不排序',
        resetColumns: '重置列',
        expandAll: '展开全部',
        collapseAll: '关闭',
        toolPanel: '工具面板',
        export: '导出',
        csvExport: '导出为CSV格式文件',
        excelExport: '导出到Excel',
        pinLeft: '靠左 &lt;&lt;',
        pinRight: '靠右 &gt;&gt;',
        noPin: '清除定位 &lt;&gt;',
        sum: '总数',
        min: '最小值',
        max: '最大值',
        none: '无',
        count: '总',
        average: '平均值',
        copy: '复制',
        copyWithHeaders: '携带表头复制',
        ctrlC: 'ctrl + C',
        paste: '粘贴',
        ctrlV: 'ctrl + V'
      },
      defaultColDef_column: { resizable: true },
      modules: AllModules,
      columnsList: []
    }
  },
  created () {
  },
  mounted () {
    this.changeHeight()
    if (!this.query) {
      this.sHeight = 0
    } else {
      this.sHeight = 65
    }
    if (this.layoutShow) {
      this.getLayout()
    }
    this.toChangeColumn(this.columns)
    // this.$nextTick(()=>{
    //     this.renderHeaderFilter();
    // })
  },
  computed: {
  },
  watch: {
    fullFlag () {
      if (this.bill) {
        if (this.fullFlag) {
        } else {
          this.zHeigth = 0
        }
      }
    },
    columns () {
      this.toChangeColumn(this.columns)
    }
  },
  methods: {
    toChangeColumn (columns) {
      this.columnsList = []
      if (columns.length > 0) {
        for (let item of columns) {
          if (!item.sortable && item.type != 'index' && item.title != '操作') {
            item.sortable = true
          }
          if (this.resizable && item.type != 'index' && item.title != '操作') {
            item.resizable = true
          }
          if (item.type == 'index') {
            item.width = '65'
          }
          // if(!item.filterMethod&&item.type!="index"&&item.title!="操作"){
          //     item.filters=[]
          //     item.filterMethod=function (value, row){
          //         debugger
          //         return row.address.indexOf(value) > -1;
          //     }
          // }
          if (!item.hide) {
            this.columnsList.push(item)
          }
        }
      }
    },
    onGridReady_column (params) {
      this.gridApi_column = params.api
      this.gridApi_column.sizeColumnsToFit()
    },
    layoutChange (layoutValue) {
      if (layoutValue && layoutValue != '') {
        this.getLayoutInfo(layoutValue)
      } else {
        this.toChangeColumn(this.columns)
      }
    },
    syncCurrentLayout () {
      // this.currentLayout=this.gridApi.columnController.getColumnState()
      for (let item of this.columnsList) {
        let data = {}
        if (item.type == 'selection') {
          data = {
            aggFunc: null,
            colId: '多选框',
            hide: item.hide,
            pinned: item.fixed,
            pivotIndex: null,
            rowGroupIndex: null,
            width: item.width,
            sort: item.sort,
            colName: '多选框'
          }
        } else if (item.colId == 'index') {
          data = {
            aggFunc: null,
            colId: '序号',
            hide: item.hide,
            pinned: item.fixed,
            pivotIndex: null,
            rowGroupIndex: null,
            width: item.width,
            sort: item.sort,
            colName: '序号'
          }
        } else {
          data = {
            aggFunc: null,
            colId: item.key,
            hide: item.hide,
            pinned: item.fixed,
            pivotIndex: null,
            rowGroupIndex: null,
            width: item.width,
            sort: item.sort,
            slot: item.slot,
            colName: item.title
          }
        }

        this.currentLayout.push(data)
      }
      //  this.rowData_column=this.currentLayout;
    },
    openLayout () {
      this.layoutModal = true
      if (this.layoutValue && this.layoutValue != '') {
        this.getLayoutInfo(this.layoutValue)
      } else {
        this.syncCurrentLayout()
        this.layoutDetail = {
          pageSize: 40,
          defaultValue: 0,
          name: ''
        }
      }
    },
    getLayoutInfo (layoutValue) {
      let params = { userId: this.$store.state.admin.user.info.data.userId, layoutName: layoutValue, tableName: this.layoutName }
      Api.getUserLayoutInfo(params).then(res => {
        this.layoutDetail = res.data.info
        this.currentLayout = res.data.list
        for (let column of this.currentLayout) {
          debugger
          if (column.colId == '多选框' || column.colId == '0') {
            column.colId = '0'
            column.colName = '多选框'
            this.$set(column, 'align', 'center')
            column.pinned = 'left'
            column.flag = '0'
          } else if (column.colName == '序号' || column.colId == '1') {
            column.colId = '1'
            column.colName = '序号'
            this.$set(column, 'align', 'center')
            column.pinned = 'left'
          } else if (column.colId == '"action"' || column.colName == '操作') {
            column.pinned = 'left'
            this.$set(column, 'align', 'center')
            column.flag = '0'
          }
          for (let item of this.columns) {
            if (column.colId == item.key) {
              column.colName = item.title
              column.resizable = item.resizable
              column.align = item.align
              column.minWidth = item.minWidth
              column.tooltip = item.tooltip
            }
          }
          console.log(column, this.columnsList)
        }

        // this.gridApi.columnController.setColumnState(this.currentLayout)
        this.orderBy = ''
        for (let item of this.currentLayout) {
          if (item.sort) {
            this.orderBy = item.colId + ' ' + item.sort
            item.sortType = item.sort
            debugger
            break
          }
        }
        console.log(this.orderBy)
        if (this.layoutDetail.pageSize) {
          this.pageSetting.pageSize = this.layoutDetail.pageSize
        }
        let data = {}
        let list = []
        for (let item of this.currentLayout) {
          if (item.colId == '多选框' || item.colId == '0' || item.colName == '多选框') {
            data = {
              type: 'selection',
              title: item.colName,
              key: item.colId,
              width: item.width,
              slot: item.slot,
              fixed: item.pinned,
              align: item.align,
              hide: item.hide,
              sort: item.sort
            }
          } else if (item.colId == '序号' || item.colId == '1' || item.colName == '序号') {
            data = {
              type: 'index',
              title: item.colName,
              key: item.colId,
              width: item.width,
              slot: item.slot,
              fixed: item.pinned,
              align: item.align,
              hide: item.hide,
              sort: item.sort
            }
          } else {
            data = {
              title: item.colName,
              key: item.colId,
              width: item.width,
              sortType: item.sortType,
              slot: item.slot,
              fixed: item.pinned,
              align: item.align,
              hide: item.hide,
              sort: item.sort
            }
          }
          list.push(data)
        }
        this.toChangeColumn(list)
        this.$emit('getData')
      })
    },
    getLayout () {
      let params = { userId: this.$store.state.admin.user.info.data.userId, tableName: this.layoutName }
      Api.getUserLayout(params).then(res => {
        this.layoutList = res.data
        // for(let item of this.layoutList){
        //     if(item.defaultValue==1||item.defaultValue=='1'){
        //         this.layoutValue=item.name;
        //         this.getLayoutInfo (this.layoutValue);
        //     }
        // }
      })
    },
    delLayout () {
      if (this.layoutValue == '') {
        this.$Message.warning('请选择要删除的布局')
        return
      }
      let params = { id: this.layoutDetail.id }
      Api.delLayoutSave(params).then(res => {
        this.$Message.success('删除成功')
        this.layoutModal = false
        this.getLayout()
      })
    },
    addLayout () {
      this.layoutDetail = {
        pageSize: 40,
        defaultValue: 0,
        name: ''
      },
      this.orderBy = ''
      this.layoutList = []
    },
    saveLayout () {
      let dataDD = []
      this.gridApi_column.forEachNode(function (node, index) {
        dataDD.push(node.data)
      })
      let params = {}
      // Object.assign(params, this.gridApi.columnController.getColumnState(),this.layoutDetail);
      params.info = this.layoutDetail
      params.info.tableName = this.layoutName
      params.info.userId = this.$store.state.admin.user.info.data.userId
      params.list = dataDD
      Api.userLayoutSave(params).then(res => {
        if (res.code == '200') {
          this.$Message.success('保存成功')
          this.getLayout()
          this.layoutValue = ''
        }
        // this.layoutList = res.data;
      })
    },
    saveLayoutClose () {
      let dataDD = []
      this.gridApi_column.forEachNode(function (node, index) {
        dataDD.push(node.data)
      })
      let params = {}
      params.info = this.layoutDetail
      params.info.tableName = this.layoutName
      params.info.userId = this.$store.state.admin.user.info.data.userId
      params.list = dataDD
      Api.userLayoutSave(params).then(res => {
        if (res.code == '200') {
          this.$Message.success('保存成功')
          this.layoutModal = false
          this.getLayout()
          this.layoutValue = ''
        }
      })
    },

    renderHeaderFilter () {
      let allHeader = document.querySelectorAll('.ivu-table-header .ivu-table-cell')
      console.log(allHeader)

      allHeader.forEach((element) => {
        let createNew = document.createElement('div')
        createNew.classList.add('vue-header-filter')
        createNew.innerHTML = ' <Poptip trigger="click">\n' +
                         '        <i class="ivu-icon ivu-icon-md-settings"></i>\n' +
                         '    </Poptip>'
        element.appendChild(createNew)
        // new Vue({
        //     render(h){
        //         return h(TableHeaderFilter,{
        //             props:{}
        //         })
        //     }
        // }).$mount(createNew);
      })
    },
    getParams () {
      let orderBy = {}, pageParams = {}
      debugger
      if (!this.pageChangeFlag && this.$parent.$parent.$refs.query && JSON.stringify(this.$parent.$parent.$refs.query.getParams()) != '{}') {
        this.pageSetting.pageNum = 1
      }
      if (this.page) {
        pageParams = { pageNum: this.pageSetting.pageNum, pageSize: this.pageSetting.pageSize }
      }
      if (this.orderBy && this.orderBy != '') {
        orderBy = { orderBy: this.orderBy }
      }

      return Object.assign(orderBy, pageParams)
    },
    setCustomHeight (customHeight) {
      this.sHeight = this.sHeight + customHeight
    },
    setLoading () {
      if (this.loading) {
        this.noDataText = '暂无数据'
        this.pageChangeFlag = false
      }
      this.loading = !this.loading
    },
    handleResize () {
      this.changeHeight()
    },
    changeHeight () {
      if (this.toolbar) {
        this.tHeight = this.$refs['table-list'].offsetHeight - this.$refs['toolbar'].offsetHeight - 30
      } else {
        this.tHeight = this.$refs['table-list'].offsetHeight - 30
      }
      if (this.height) {
        this.zHeigth = this.height
      } else {
        this.zHeigth = this.tHeight
      }
      if (this.fullFlag) {
        this.zHeigth = document.body.clientHeight - 120
      }
      if (this.bill && this.fullFlag) {
        this.zHeigth = document.body.clientHeight - 180
      }
    },
    pageChange (page) {
      this.pageChangeFlag = true
      this.$emit('getData')
    },
    pagesizechange (pageSize) {
      this.pageSetting.pageSize = pageSize
      this.pageChange(1)
    },
    onSelect (selection, row) {
      this.selection = selection
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.selection = selection
    },
    onSelectAllCancel (selection) {
      this.$emit('on-select-all-cancel', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    newClick (selection) {
      this.$emit('on-new')
    },
    onRefresh (selection) {
      this.$emit('getData')
    },
    onRowClick (row) {
      this.$emit('on-row-click', row)
    },
    onDelete (selection) {
      this.$emit('on-delete')
    },
    onSortChange (data) {
      if (data.order == 'normal') {
        this.orderBy = ''
      } else {
        this.orderBy = data.key + ' ' + data.order
      }
      this.$emit('getData')
    },
    openFullModal () {
      this.fullFlag = !this.fullFlag
      this.$emit('open-full-modal', this.fullFlag)
    },
    onCurrentChange (newValue, oldValue) {
      this.$emit('on-current-change', newValue, oldValue)
    },
    onDragDrop (a, b) {
      this.$parent('onDragDrop', a, b)
    }
  }
}
</script>
<style>
    .vue-header-filter{
        display: inline-block;
        cursor: pointer;
    }
</style>
<style>
    .red-bg input{
        border: 2px solid red;
        height: 26px;
    }
    .bingo-advance .biaoTou {
        /*border-top: 5em #199fff solid!important; !*上边框宽度等于表格第一行行高*!*/
        /*border-left: 200px #ff8838 solid!important; !*左边框宽度等于表格第一行第一格宽度*!*/
        /*position: relative!important; !*让里面的两个子容器绝对定位*!*/
        /*color:white!important;*/
        background: url("../../assets/images/line.png");
        background-size:100% 100% ;
        width: 200px;
        height: 36px;
        margin: 0 auto;
    }
    div.table.ag-theme-fresh .ag-input-wrapper input[type='text'] {
        display: inline-block;
        width: 100%;
        margin: 0;
        padding: 0;
        height: 38px;
    }
    .ag-header-cell-label {

        height: 100%;
        padding:0 !important;
    }
    .bingo-advance .customHeaderLabel {
        margin-left: -14px;
        margin-top: 3px;
    }
    .bingo-advance .cell-left{
        float: left;margin-top: 3px;margin-left: 10px
    }
    .bingo-advance .cell-right{
        float: right;margin-top: -4px;margin-right: 17px;
    }
    .ag-theme-fresh .ag-row {
        height: 36px!important;
    }
    .ag-theme-fresh .ag-cell {
        line-height: 36px!important;
    }
    .ag-theme-fresh .ag-header {
        line-height: 36px!important;
        background-color: rgba(51, 63, 72, 0.06)!important;
        background-image: none;
        font-weight: 400;
        font-size: 14px;
        border-bottom: 1px solid #e8eaec;
    }
    .ag-theme-fresh .ag-header-cell {
        border-right: 1px solid #e8eaec;
    }
    .ag-theme-fresh .ag-root {
        border: 1px solid #e8eaec;
    }
    .ag-theme-fresh .ag-cell.ag-cell-inline-editing {
        height: 36px!important;
        padding: 0;
    }
    .ag-theme-fresh .ag-ltr .ag-cell {
        border-right: 1px solid #e8eaec;
    }
    .ag-theme-fresh .ag-ltr .ag-cell:not(.ag-cell-focus).ag-cell-last-left-pinned:not(.ag-cell-range-right), .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-last-left-pinned:not(.ag-cell-range-right), .ag-theme-fresh .ag-ltr .ag-root:not(.ag-has-focus) .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right) {
        border-right: 1px solid #e8eaec;
    }
    .ag-theme-fresh .ag-filter .ag-filter-header-container {
        height: 45px!important;
    }
    .ag-theme-fresh .ag-column-drop-horizontal {
        background-color: #f6f6f6;
        height: 36px!important;
        padding-left: 12px;
    }
    .header-center .ag-header-cell-text{
        margin: 0 auto;
    }
    .ag-theme-fresh .cell-center{
        text-align: center;
    }
    .ag-theme-fresh .ag-header-select-all {
        margin-right: 12px;
        margin-left: 8px;
    }
    .ag-theme-fresh .ag-selection-checkbox{
        margin-left: 8px;
    }
    .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-left, .ag-theme-fresh .ag-rtl .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-left {
        border-left-color: #0077c8;
    }
    .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-top, .ag-theme-fresh .ag-rtl .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-top {
        border-top-color: #0077c8;
    }
    .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-bottom, .ag-theme-fresh .ag-rtl .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-bottom {
        border-bottom-color: #0077c8;
    }
    .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-right, .ag-theme-fresh .ag-rtl .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-right {
        border-right-color: #0077c8;
    }
    .ag-cell-range-single-cell{
        border: 1px solid #0077c8!important;
    }
    .ag-cell-range-handle{
        border: 1px solid #0077c8!important;
    }
    .ag-theme-fresh .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-fresh .ag-ltr .ag-has-focus .ag-cell-focus.ag-cell-range-single-cell, .ag-theme-fresh .ag-ltr .ag-cell-focus.ag-cell-range-single-cell.ag-cell-range-handle, .ag-theme-fresh .ag-rtl .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-fresh .ag-rtl .ag-has-focus .ag-cell-focus.ag-cell-range-single-cell, .ag-theme-fresh .ag-rtl .ag-cell-focus.ag-cell-range-single-cell.ag-cell-range-handle{
        border: 1px solid #0077c8!important;
    }
    .ag-theme-fresh .ag-rich-select .ag-rich-select-list {
        width: 100%;
        min-width: 200px;
        height: auto!important;
    }
</style>
