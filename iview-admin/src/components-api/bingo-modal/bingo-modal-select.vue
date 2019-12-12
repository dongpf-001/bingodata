<template>
    <div>
        <!--input形式-->
        <div style="position: relative; overflow: hidden" v-if="showInput">
            <Input v-model="selectModel" readonly icon="md-menu" @on-click="open"/>
            <div style="position: absolute;top: 0;left: 1px">
                <div class="ivu-tag ivu-tag-checked" v-for="(value, key) in showData" :key="key"
                     v-if="maxTagCount === undefined || key < maxTagCount">
                    <span class="ivu-tag-text">{{value[field]}}</span>
                    <i class="ivu-icon ivu-icon-ios-close" @click="deleteClick(value, key)"></i>
                </div>
                <div class="ivu-tag ivu-tag-checked" v-if="maxTagCount !== undefined && showData.length > maxTagCount">
                    <span class="ivu-tag-text ivu-select-max-tag">
                        <template>+ {{ showData.length - maxTagCount }}...</template>
                    </span>
                </div>
            </div>
        </div>
        <!--弹出的页面-->
        <bingo-modal ref="modal" class="model-select-wrapper" :title="title" :closable="model.closable"
                     :maskClosable="model.maskClosable" v-model="show"
                     :fullscreen="model.fullscreen" :draggable="model.draggable" :footer-hide="model.footerHide"
                     :width="model.width" @on-ok="ok" @on-cancel="cancel">
            <bingo-query ref="query" :type="query.types" :col="query.col" :labelWidth="query.labelWidth"
                         @on-submit="getUser" @on-reset="getUser" :data="queryData">
                <slot>
                    <bingo-grid-item>
                        <FormItem label="人员名称" prop="name">
                            <Input v-model="queryData.name" placeholder="请输入人员名称"/>
                        </FormItem>
                    </bingo-grid-item>
                </slot>
            </bingo-query>
            <bingo-table
                    ref="table"
                    @getData="getUser"
                    :highlight-row="highlightRow"
                    :columns="columns"
                    :data="data"
                    :toolbar="modelTable.toolbar"
                    :border="modelTable.border"
                    :page="modelTable.page"
                    :pageSetting="modelTable.pageSetting"
                    @on-select="onSelect"
                    @on-select-cancel="onSelectCancel"
                    @on-select-all="onSelectAll"
                    @on-select-all-cancel="onSelectAllCancel"
                    @on-current-change="onCurrentChange"
                    style="height: 290px">
            </bingo-table>
            <p>已选择的数据：{{choiceNumber}}</p>
            <div style="position: relative; overflow: hidden; overflow-y: auto">
                <textarea name="" cols="3" class="ivu-input">
                </textarea>
                <div style="position: absolute;top: 1px;left: 1px">
                    <div class="ivu-tag ivu-tag-checked" v-for="(value, key) in areaData" :key="key">
                        <span class="ivu-tag-text">{{value[field]}}</span>
                        <i class="ivu-icon ivu-icon-ios-close" @click="deleteClick(value, key)"></i>
                    </div>
                </div>
            </div>
        </bingo-modal>
    </div>
</template>
<script>
import bingoModal from '@/components-api/bingo-modal'
import bingoQuery from '@/components-api/bingo-query'
import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
import bingoTable from '@/components-api/bingo-table'
import Vue from 'vue'
import * as Api from '@/api/bmsa/demo'

export default {
  name: 'bingo-modal-select',
  data () {
    return {
      selectModel: '', // 计划用它来帮顶选中的值，但是input绑定时不支持数组，所以目前弃用
      data: [],
      showFlag: true, // 弹窗是否第一次显示
      show: false,
      areaData: [],
      showData: [],
      choiceNumber: 0,
      softId: 0,
      model: {
        show: true,
        closable: true,
        fullscreen: false,
        maskClosable: true,
        draggable: false,
        footerHide: false,
        width: '900'
      },
      query: {
        col: 3,
        labelWidth: 70,
        types: 'float'
      },
      modelTable: {
        toolbar: false,
        border: true,
        page: true,
        pageSetting: {
          pageNum: 1,
          pageTotal: 50,
          pageSize: 40,
          showSizer: true,
          pageSizeOpts: [10, 20, 40]
        }
      }
    }
  },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default () {
        return ''
      }
    },
    title: {
      type: String,
      default: '编辑'
    },
    keyId: { // 唯一标识的字段
      type: [String],
      default: 'id'
    },
    field: {
      type: String,
      default: 'name'
    },
    queryData: {
      type: Object,
      default: function () {
        return { name: '' }
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '公司名称',
            key: 'companyName',
            minWidth: 140
          },
          {
            title: '姓名',
            width: 100,
            key: 'name'
          },
          {
            title: '职位',
            width: 200,
            key: 'subGroupName'
          },
          {
            title: '邮箱',
            key: 'email',
            minWidth: 120
          },
          {
            title: '出生日期',
            key: 'gbDat',
            minWidth: 200
          },
          {
            title: '创建时间',
            key: 'createDate',
            minWidth: 200
          }
        ]
      }
    },
    datas: {
      type: Array
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number,
      default: 3
    },
    showInput: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    areaData () {
      this.choiceNumber = this.areaData.length
    },
    show (value) {
      if (value && this.showFlag) {
        if (this.highlightRow) {
          this.columns.forEach((item, key) => {
            if (item.type === 'selection') {
              this.columns.splice(key, 1)
            }
          })
        }
        if (!this.datas) { // 判断是否传入数据源
          Api.getUserList().then(res => {
            if (res.success) {
              this.data = res.data.rows
              this.modelTable.pageSetting.pageTotal = res.data.total
            }
          })
        } else {
          this.data = this.datas
          if (this.value && this.value.length > 0) { // 页面显示默认值
            this.data.forEach((value) => {
              value._checked = false
              this.value.forEach((item) => {
                if (value[this.keyId] === item[this.keyId]) {
                  value._checked = true
                }
              })
            })
          }
        }

        this.showFlag = false
      }
    },
    datas (value) {
      this.data = value
      if (this.value && this.value.length > 0) { // 页面显示默认值
        this.data.forEach((value) => {
          value._checked = false
          this.value.forEach((item) => {
            if (value[this.keyId] === item[this.keyId]) {
              value._checked = true
            }
          })
        })
      }
    },
    value (value) {
      if (value) { // 显示默认值
        this.areaData = value
        this.showData = value
      }
    }
  },
  components: {
    bingoModal, bingoQuery, bingoGridItem, bingoTable, Vue, Api
  },
  created () {
    if (this.value) { // 显示默认值
      this.areaData = this.value
      this.showData = this.value
    }
  },
  methods: {
    open () {
      this.$refs.modal.show = true
      this.$emit('on-open-modal')
    },
    getUser () {
      let params = {}
      params = Object.assign(this.$refs.table.getParams(), this.$refs.query.getParams())
      if (!(this.datas && this.datas.length > 0)) {
        this.$refs.table.setLoading()
        Api.getUserList(params).then(res => {
          if (res.success) {
            this.$refs.table.setLoading()
            this.data = res.data.rows
            this.modelTable.pageSetting.pageTotal = res.data.total
            this.data.forEach((value) => {
              value._checked = false
              this.areaData.forEach((item) => {
                if (value[this.keyId] === item[this.keyId]) {
                  value._checked = true
                }
              })
            })
          }
        })
      }

      this.$emit('getData', params)
    },
    ok () {
      this.showData = JSON.parse(JSON.stringify(this.areaData)) // 选择的数据显示在input框中
      this.$refs.modal.show = false // 关闭modal
      this.$emit('input', this.areaData)
      this.$emit('on-ok', this.areaData) // 提供on-ok内置方法，将选中的数据返回
    },
    cancel () {
      this.$refs.modal.show = false
      this.$emit('on-cancel')
    },
    onSelectAll (item) {
      item.forEach((value) => {
        let flag = false
        for (let i = 0; i < this.areaData.length; i++) {
          if (this.areaData[i][this.keyId] === value[this.keyId]) {
            flag = true // 说明areaData已经存在了选中的数据
          }
        }
        if (!flag) {
          this.areaData.push(value)
        }
      })
      this.data.forEach((value) => {
        value._checked = true
      })
    },
    onSelectAllCancel () {
      this.data.forEach((value) => {
        value._checked = true
        for (let i = 0; i < this.areaData.length; i++) {
          if (this.areaData[i][this.keyId] === value[this.keyId]) {
            this.areaData.splice(i, 1)
          }
        }
      })
    },
    onSelect (item, row) { // 选中时
      this.areaData.push(row) // 添加选中区域
      this.data.forEach((value) => { // 添加列表选中
        if (value[this.keyId] === row[this.keyId]) {
          value._checked = true
        }
      })
    },
    onSelectCancel (item, row) { // 取消选中时
      for (let i = 0; i < this.areaData.length; i++) { // 删除显示区域
        if (this.areaData[i][this.keyId] === row[this.keyId]) {
          this.areaData.splice(i, 1)
        }
      }
      this.data.forEach((value) => { // 去掉列表选中
        if (value[this.keyId] === row[this.keyId]) {
          value._checked = false
        }
      })
    },
    onSelectChange (item) { // 多选
      this.areaData = []
      this.data.forEach((value) => {
        value._checked = false
      })
      item.forEach((item) => {
        this.areaData.push(item)
        this.data.forEach((value) => {
          if (value[this.keyId] === item[this.keyId]) {
            value._checked = true
          }
        })
      })
    },
    deleteClick (value, key) { // 删除
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][this.keyId] === value[this.keyId]) {
          this.data[i]._checked = false
          Vue.set(this.data, i, this.data[i])
        }
      }

      this.areaData.splice(key, 1)
    },
    onCurrentChange (newValue, oldValue) { // 单选
      this.areaData = []
      this.areaData.push(newValue)
    }
  }
}
</script>
<style lang="less">
    /*.model-select-wrapper .ivu-modal-no-mask {*/
    /*    background-color: rgba(55, 55, 55, 0.6)*/
    /*}*/
</style>
