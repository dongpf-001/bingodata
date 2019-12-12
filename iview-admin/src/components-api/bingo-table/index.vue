<template>
    <div class="i-table-border list-page-out list-resize"  :style="'height:'+ 'calc(100% - '+sHeight+'px)' " ref="table-list" v-resize="handleResize" :class="{'fullScreen': fullFlag}">
        <div  v-show="toolbar" ref="toolbar">
            <bingo-toolbar :showNew="showNew" :showDelete="showDelete" :fullFlag="fullFlag"
                           :showRefresh="showRefresh" :showAllButton="showAllButton" @on-new="newClick" @on-refresh="onRefresh" @on-delete="onDelete" @open-full-modal="openFullModal">
            <span slot="toolbar">
             <slot></slot>
            </span>
            </bingo-toolbar>
         </div>
        <div :class="{'table-full': fullFlag}">
            <Table
                    stripe
                    v-bind="$attrs"
                    v-on="$listeners"
                    ref="table"
                    :columns="columns"
                    :loading="loading"
                    :height="zHeigth"
                    :data="data"
                    :border="border"
                    :size="size"
                    :highlight-row="highlightRow"
                    >
                <template slot-scope="{ row, index }" v-for="col in columns" :slot="col.slot">
                    <slot :name="col.slot" :row="row" :index="index"></slot>
                </template>
            </Table>
            <div class="ivu-mt ivu-text-center" v-show="page">
                <Page :total="pageSetting.pageTotal" :page-size="pageSetting.pageSize"
                      :current.sync="pageSetting.pageNum" :show-sizer="pageSetting.showSizer"
                      :page-size-opts="pageSetting.pageSizeOpts" show-total @on-page-size-change="pagesizechange"
                      @on-change="pageChange"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import bingoToolbar from '@/components-api/bingo-toolbar'
export default {
  name: 'bingo-table',
  props: {
    columns: {
      type: Array,
      default: function () {
        return [
          {
            title: 'Name',
            key: 'name',
            width: '100'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ]
      }
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
    page: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
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
      default: function () {
      }
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  components: {
    bingoToolbar
  },
  data () {
    return {
      fullModal: false,
      loading: false,
      sHeight: 0,
      tHeight: 0,
      zHeigth: 0,
      selection: [],
      orderBy: '',
      fullFlag: false,
      params: {}
    }
  },
  created () {
  },
  mounted () {
    this.changeHeight()
    if (!this.query) {
      this.sHeight = 0
    } else {
      this.sHeight = 37
    }
  },
  computed: {
  },
  watch: {
    fullFlag () {
      if (this.fullFlag) {
        this.zHeigth = document.body.clientHeight - 60
      } else {
        if (this.height) {
          this.zHeigth = this.height
        } else {
          this.zHeigth = this.tHeight
        }
      }
    }
  },
  methods: {
    getParams () {
      let orderBy = {}, pageParams = {}
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
      this.loading = !this.loading
    },
    handleResize () {
      this.changeHeight()
    },
    changeHeight () {
      if (this.toolbar) {
        this.tHeight = this.$refs['table-list'].offsetHeight - this.$refs['toolbar'].offsetHeight - 65
      } else {
        this.tHeight = this.$refs['table-list'].offsetHeight - 65
      }
      if (this.height) {
        this.zHeigth = this.height
      } else {
        this.zHeigth = this.tHeight
      }
    },
    pageChange (page) {
      this.$emit('getData')
    },
    pagesizechange (pageSize) {
      this.pageSetting.pageSize = pageSize
      this.pageChange(1)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
      this.selection = selection
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
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
    },
    onCurrentChange (newValue, oldValue) {
      this.$emit('on-current-change', newValue, oldValue)
    }
  }
}
</script>
