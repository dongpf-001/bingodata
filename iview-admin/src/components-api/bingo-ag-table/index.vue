<template>
  <div ref="table-list" class="i-table-border list-page-out list-resize bingo-advance" :style="'height:'+ 'calc(100% - '+sHeight+'px)'">
    <div v-show="toolbar" ref="toolbar">
      <bingo-toolbar :showNew="showNew" :showDelete="showDelete" :showRefresh="showRefresh"
                     :showAllButton="showAllButton" @on-new="newClick" @on-refresh="onRefresh"
                     @on-delete="onDelete" @open-full-modal="openFullModal">
            <span slot="toolbar">
             <slot>

             </slot>
<!--              <Button type='primary' @click="saveLayout">保存布局</Button>-->
            </span>
      </bingo-toolbar>
    </div>
    <ag-grid-vue ref="table"
                 v-bind="$attrs"
                 v-on="$listeners"
                 class="table ag-theme-balham"
                 rowHeight="40"
                 headerHeight="40"
                 :columnDefs="columns"
                 :rowData="rowData"
                 :suppressContextMenu="false"
                 :components="components"
                 @gridReady="onGridReady"
                 @selection-changed="onSelectionChanged"
    >
    </ag-grid-vue>
    <!--页数-->
    <div class="ivu-mt ivu-text-center" v-show="page">
      <Page :total="pageSetting.pageTotal" :page-size="pageSetting.pageSize"
            :current.sync="pageSetting.pageNum" :show-sizer="pageSetting.showSizer"
            :page-size-opts="pageSetting.pageSizeOpts" show-total @on-page-size-change="pagesizechange"
            @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
// 引入ag-grid-vue
import { AgGridVue } from 'ag-grid-vue'
import bingoToolbar from '@/components-api/bingo-toolbar'
export default {
  name: 'bingo-ag-table',
  data () {
    return {
      gridApi: null,
      columnApi: null,
      columns: [],
      selection: [], // 选中的数据
      sHeight: 0,
      tHeight: 0,
      zHeigth: 0,
      components: {}
    }
  },
  props: {
    columnDefs: {
      type: Array,
      default: () => { return [] }
    },
    rowData: {
      type: Array,
      default: () => { return [] }
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    showNew: {
      type: Boolean,
      default: true
    },
    showDelete: {
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
    page: {
      type: Boolean,
      default: true
    },
    pageSetting: {
      type: Object,
      default: function () {
      }
    }
  },
  components: {
    AgGridVue, bingoToolbar
  },
  created () {
  },
  mounted () {
    this.toColumn(this.columnDefs) // 处理columns
    // 计算高度
    this.changeHeight()
    if (!this.query) {
      this.sHeight = 0
    } else {
      this.sHeight = 65
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 表格创建完成后执行
    onGridReady (params) {
      console.log(params)
      // 获取gridApi
      this.gridApi = params.api
      this.columnApi = params.columnApi
      // 调整表格列宽大小自适应
      // this.gridApi.sizeColumnsToFit()
    },
    // 处理columns
    toColumn (columns) {
      this.columns = []
      let data = {}
      for (let column of columns) {
        if (column.type === 'selection') {
          data = {
            field: column.key,
            type: column.type,
            headerName: column.title,
            editable: true,
            pinned: 'left',
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true, // 添加选框
            width: column.width
          }
        } else if (column.type === 'index') {
          data = {
            headerName: '序号',
            pinned: 'left',
            width: 80,
            valueGetter: params => params.node.rowIndex + 1
          }
        } else {
          data = {
            field: column.key,
            pinned: column.fixed,
            width: column.width,
            minWidth: column.minWidth,
            type: column.type,
            rowGroup: column.rowGroup,
            enableRowGroup: column.enableRowGroup,
            headerName: column.title,
            headerClass: column.headerClass,
            headerComponent: column.headerComponent,
            cellRendererFramework: column.slot,
            cellEditorFramework: column.cellEditorFramework,
            editable: column.editable,
            cellEditorSelector: column.cellEditorSelector,
            cellEditor: column.cellEditor,
            cellEditorParams: column.cellEditorParams,
            cellRenderer: column.cellRenderer,
            keyCreator: column.keyCreator,
            hide: column.hide,
            valueFormatter: column.valueFormatter,
            sort: column.sort
          }
        }
        this.columns.push(data)
      }
    },
    onSelectionChanged () {
      // 获取选中的数据getSelectedRows()为底层方法
      this.selection = this.gridApi.getSelectedRows()
      this.$emit('selection-changed', this.selection)
    },
    newClick (selection) {
      this.$emit('on-new')
    },
    onRefresh (selection) {
      this.$emit('getData')
    },
    onDelete (selection) {
      this.$emit('on-delete')
    },
    openFullModal () {
      this.fullFlag = !this.fullFlag
    },
    // 页数
    pagesizechange (pageSize) {
      this.pageSetting.pageSize = pageSize
      this.pageChange(1)
    },
    pageChange (page) {
      this.$emit('getData')
    },
    // 计算高度
    handleResize () { // 重置高度
      this.changeHeight()
    },
    changeHeight () {
      if (this.toolbar) {
        this.tHeight = this.$refs['table-list'].offsetHeight - this.$refs['toolbar'].offsetHeight - 40
      } else {
        this.tHeight = this.$refs['table-list'].offsetHeight - 40
      }
      if (this.height) {
        this.zHeigth = this.height
      } else {
        this.zHeigth = this.tHeight
      }
    }
  }
}
</script>
<style lang="less">
  .table {
    width: 100%;
    height: 100%;
  }
  .list-resize .ivu-mt{
    margin-top: 10px!important;
    margin-bottom: 10px!important;
  }
  .bingo-advance .biaoTou {
    /*border-top: 5em #199fff solid!important; !*上边框宽度等于表格第一行行高*!*/
    /*border-left: 200px #ff8838 solid!important; !*左边框宽度等于表格第一行第一格宽度*!*/
    /*position: relative!important; !*让里面的两个子容器绝对定位*!*/
    /*color:white!important;*/
    background: url("../../assets/images/line.png");
    background-size:100% 100% ;
    width: 200px;
    height: 40px;
    margin: 0 auto;
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

  .ag-theme-fresh .ag-cell {
    line-height: 40px;
  }
  .ag-theme-fresh .ag-header {
    line-height: 40px!important;
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
    height: 40px;
    padding: 0;
  }
  .ag-theme-fresh .ag-ltr .ag-cell {
    border-right: 1px solid #e8eaec;
  }
  .ag-theme-fresh .ag-ltr .ag-cell:not(.ag-cell-focus).ag-cell-last-left-pinned:not(.ag-cell-range-right), .ag-theme-fresh .ag-ltr .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-last-left-pinned:not(.ag-cell-range-right), .ag-theme-fresh .ag-ltr .ag-root:not(.ag-has-focus) .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right) {
    border-right: 1px solid #e8eaec;
  }
  .ag-theme-fresh .ag-filter .ag-filter-header-container {
    height: 45px;
  }
  .ag-theme-fresh .ag-column-drop-horizontal {
    background-color: #f6f6f6;
    height: 40px;
    padding-left: 12px;
  }
</style>
