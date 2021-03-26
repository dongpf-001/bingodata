<template>
    <div>
        <!--input形式-->
        <Tooltip :content="message" transfer :disabled="disabled" v-if="showInput" :max-width="150">
            <div style="position: relative; overflow: hidden" v-if="showInput">
                <Input v-model="selectModel" readonly :icon='highlightRow ? "md-person" : "icon iconfont iconrenyuan"'
                       @on-click="open"/>
                <div style="position: absolute;top: 0;left: 1px;line-height: 32px">
                    <div class="ivu-tag ivu-tag-checked" v-for="(value, key) in showData" :key="key"
                         v-if="maxTagCount === undefined || key < maxTagCount">
                        <span class="ivu-tag-text">{{value[field]}}</span>
                        <i class="ivu-icon ivu-icon-ios-close" v-if="!value._disabled"
                           @click="deleteClick(value, key, 'out')"></i>
                    </div>
                    <div class="ivu-tag ivu-tag-checked"
                         v-if="maxTagCount !== undefined && showData.length > maxTagCount">
                    <span class="ivu-tag-text ivu-select-max-tag">
                        <template>+ {{ showData.length - maxTagCount }}...</template>
                    </span>
                    </div>
                </div>
            </div>
        </Tooltip>
        <!--弹出的页面-->
        <bingo-modal ref="modal" class="model-select-wrapper" :title="title" :closable="model.closable"
                     :maskClosable="model.maskClosable" v-model="show"
                     :fullscreen="model.fullscreen" :draggable="model.draggable" :footer-hide="model.footerHide"
                     :width="model.width" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
            <bingo-query ref="query" :type="query.types" :col="query.col" :labelWidth="query.labelWidth"
                         @on-submit="getUser(true)" @on-reset="getUser(true)" :data="queryData">
                <slot>
                    <bingo-grid-item>
                        <FormItem label="姓名" prop="name">
                            <Input v-model="queryData.name" placeholder=""/>
                        </FormItem>
                    </bingo-grid-item>
                    <bingo-grid-item>
                        <FormItem label="工号" prop="pernr">
                            <Input v-model="queryData.pernr" placeholder="" element-id="pernr"/>
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
                    @on-row-dblclick="onDblclick"
                    @on-select="onSelect"
                    @on-select-cancel="onSelectCancel"
                    @on-select-all="onSelectAll"
                    @on-select-all-cancel="onSelectAllCancel"
                    @on-current-change="onCurrentChange"
                    style="height: 290px">
                <template slot-scope="{ row, index }" v-for="col in columns" :slot="col.slot">
                    <slot :name="col.slot" :row="row" :index="index"></slot>
                </template>
            </bingo-table>
            <p v-if="!highlightRow">已选择的数据：{{choiceNumber}}</p>
            <div style="position: relative; overflow: hidden; overflow-y: auto" v-if="!highlightRow">
                <textarea name="" cols="3" class="ivu-input">
                </textarea>
                <div style="position: absolute;top: 1px;left: 1px">
                    <div class="ivu-tag ivu-tag-checked" v-for="(value, key) in areaData" :key="key">
                        <span class="ivu-tag-text">{{value[field]}}</span>
                        <i class="ivu-icon ivu-icon-ios-close" v-if="!value._disabled"
                           @click="deleteClick(value, key, 'in')"></i>
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
        data() {
            return {
                selectModel: '', // 计划用它来帮顶选中的值，但是input绑定时不支持数组，所以目前弃用
                data: [],
                showFlag: true, // 弹窗是否第一次显示
                show: false,
                areaData: [],
                showData: [],
                choiceNumber: 0,
                softId: 0,
                delectFlag: false,
                message: '', // tooltip提示的内容
                disabled: true, // 判断是否使用tooltip
                model: {
                    show: true,
                    closable: true,
                    fullscreen: false,
                    maskClosable: true,
                    draggable: false,
                    footerHide: false,
                    width: '900'
                },
                modelTable: {
                    toolbar: false,
                    border: true,
                    page: true,
                    pageSetting: {
                        pageNum: 1,
                        pageTotal: 0,
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
                default() {
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
            query: {
                type: Object,
                default() {
                    return {
                        col: 3,
                        labelWidth: 70,
                        types: 'float'
                    }
                }
            },
            queryData: {
                type: Object,
                default: function () {
                    return {
                        name: '',
                        pernr: ''
                    }
                }
            },
            columns: {
                type: Array,
                default: () => {
                    return [
                        {
                            title: '序号',
                            type: 'index',
                            width: 60,
                            align: 'center',
                            fixed: 'left'
                        },
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center',
                            fixed: 'left'
                        },
                        {
                            title: '姓名',
                            width: 100,
                            key: 'name'
                        },
                        {
                            title: '工号',
                            key: 'pernr',
                            minWidth: 100
                        },
                        /* {
                                          title: '职位',
                                          width: 200,
                                          key: 'subGroupName'
                                      }, */
                        {
                            title: '邮箱',
                            key: 'email',
                            minWidth: 120
                        }/*,
                        {
                            title: '出生日期',
                            key: 'gbDat',
                            minWidth: 200
                        },
                        {
                            title: '创建时间',
                            key: 'createDate',
                            minWidth: 200
                        } */
                    ]
                }
            },
            disabledOption: { // 控制哪些人员不可选择，只用于选择人员
                type: Array,
                default: () => {
                    return []
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
                default: 2
            },
            showInput: {
                type: Boolean,
                default: true
            },
            isCustom: { // 是否自定义数据源
                type: Boolean,
                default: false
            }
        },
        watch: {
            showData(item) {
                let arr = []
                item.forEach(item => {
                    arr.push(item[this.field])
                })
                this.message = arr.join(',') // tooltip提示的信息
                if (arr.length > this.maxTagCount) {
                    this.disabled = false
                }
            },
            areaData() {
                this.choiceNumber = this.areaData.length
            },
            show(value) {
                this.delectFlag = false
                if (value) {
                    if (!this.isCustom) { // 使用默认数据源时每次打开初始化分页
                        this.modelTable.pageSetting = {
                            pageNum: 1,
                            pageTotal: 0,
                            pageSize: 40,
                            showSizer: true,
                            pageSizeOpts: [10, 20, 40]
                        }
                        this.data = []
                    }
                    if (this.value) {
                        this.areaData = JSON.parse(JSON.stringify(this.value))
                        this.showData = JSON.parse(JSON.stringify(this.value))
                        this.areaData.forEach((value) => { // 判断哪些人员不可选
                            this.disabledOption.forEach((item) => {
                                if (value[this.keyId] == item) {
                                    value._disabled = true
                                }
                            })
                        })
                        this.showData.forEach((value) => { // 判断哪些人员不可选
                            this.disabledOption.forEach((item) => {
                                if (value[this.keyId] == item) {
                                    value._disabled = true
                                }
                            })
                        })
                    } else {
                        this.areaData = []
                        this.showData = []
                    }
                    if (this.highlightRow) {
                        this.columns.forEach((item, key) => {
                            if (item.type === 'selection') {
                                this.columns.splice(key, 1)
                            }
                        })
                    }
                    if (!this.datas) { // 判断是否传入数据源
                        let params = {
                            isFreeze: 0,
                            isExpire: 0,
                            isEmatrixUser: 1
                        }
                        Api.getUserList(params).then(res => {
                            if (res.success) {
                                this.data = res.data.rows
                                this.data.forEach((value) => { // 判断哪些人员不可选
                                    this.disabledOption.forEach((item) => {
                                        if (value[this.keyId] == item) {
                                            value._disabled = true
                                        }
                                    })
                                })
                                this.modelTable.pageSetting.pageTotal = res.data.total
                                if (this.value && this.value.length > 0) { // 页面显示默认值
                                    this.data.forEach((value) => {
                                        value._checked = false
                                        value._highlight = false
                                        this.value.forEach((item) => {
                                            if (value[this.keyId] === item[this.keyId]) {
                                                value._checked = true
                                                value._highlight = true
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    } else {
                        this.data = this.datas
                        if (this.value && this.value.length > 0) { // 页面显示默认值
                            this.data.forEach((value) => {
                                value._checked = false
                                value._highlight = false
                                this.value.forEach((item) => {
                                    if (value[this.keyId] === item[this.keyId]) {
                                        value._checked = true
                                        value._highlight = true
                                    }
                                })
                            })
                        }
                    }

                    this.showFlag = false
                }

                if (!value) {
                    Object.keys(this.queryData).map(key => this.queryData[key] = '')
                }
            },
            datas(value) {
                this.data = value
                if (this.value && this.value.length > 0 && !this.delectFlag) { // 页面显示默认值
                    // 如果是删除数据导致datas发生变化则不走这里
                    this.data.forEach((value) => {
                        value._checked = false
                        value._highlight = false
                        this.areaData.forEach((item) => {
                            if (value[this.keyId] === item[this.keyId]) {
                                value._checked = true
                                value._highlight = true
                            }
                        })
                    })
                    this.delectFlag = false
                }
            },
            value(value) {
                if (value) { // 显示默认值
                    this.areaData = JSON.parse(JSON.stringify(value))
                    this.showData = JSON.parse(JSON.stringify(value))
                }
            }
        },
        components: {
            bingoModal, bingoQuery, bingoGridItem, bingoTable, Vue, Api
        },
        created() {
            if (this.value) { // 显示默认值
                this.areaData = JSON.parse(JSON.stringify(this.value))
                this.showData = JSON.parse(JSON.stringify(this.value))
            }
        },
        methods: {
            open() {
                this.$refs.modal.show = true
                this.$emit('on-open-modal')
            },
            getUser(flag) {
                let params = {}
                params = Object.assign(this.$refs.table.getParams(), this.$refs.query.getParams())
                params.isFreeze = 0 // 去掉冻结的人员
                params.isExpire = 0
                params.isEmatrixUser = 1
                if (flag) {
                    params.pageNum = 1
                    this.modelTable.pageSetting.pageNum = 1
                }
                if (!((this.datas && this.datas.length > 0) || this.isCustom)) {
                    this.$refs.table.setLoading()
                    Api.getUserList(params).then(res => {
                        if (res.success) {
                            this.$refs.table.setLoading()
                            this.data = res.data.rows
                            this.modelTable.pageSetting.pageTotal = res.data.total
                            this.data.forEach((value) => {
                                value._checked = false
                                value._highlight = false
                                this.areaData.forEach((item) => {
                                    if (value[this.keyId] === item[this.keyId]) {
                                        value._checked = true
                                        value._highlight = true
                                    }
                                })
                                this.disabledOption.forEach((item) => { // 判断哪些人员不可选
                                    if (value[this.keyId] == item) {
                                        value._disabled = true
                                    }
                                })
                            })
                        }
                    })
                }

                this.$emit('getData', params)
            },
            ok() {
                this.showData = JSON.parse(JSON.stringify(this.areaData)) // 选择的数据显示在input框中
                this.$refs.modal.show = false // 关闭modal
                this.$emit('input', this.areaData)
                this.$emit('on-ok', this.areaData) // 提供on-ok内置方法，将选中的数据返回
            },
            cancel() {
                this.$refs.modal.show = false
                this.$emit('on-cancel')
            },
            onSelectAll(item) {
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
            onSelectAllCancel() {
                this.data.forEach((value) => {
                    value._checked = false
                    for (let i = 0; i < this.areaData.length; i++) {
                        if (this.areaData[i][this.keyId] === value[this.keyId]) {
                            this.areaData.splice(i, 1)
                        }
                    }
                })
            },
            onSelect(item, row) { // 选中时
                this.areaData.push(row) // 添加选中区域
                this.data.forEach((value) => { // 添加列表选中
                    if (value[this.keyId] === row[this.keyId]) {
                        value._checked = true
                    }
                })
            },
            onSelectCancel(item, row) { // 取消选中时
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
            onSelectChange(item) { // 多选
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
            deleteClick(value, key, position) { // 删除
                if (position === 'out') { // 在input框处删除
                    this.value.splice(key, 1)
                    if (this.showData.length <= this.maxTagCount) {
                        this.disabled = true
                    }
                } else { // 在textarea区域删除
                    this.areaData.splice(key, 1)
                    // this.showData.splice(key, 1);
                    this.data.forEach((item, key) => {
                        if (value[this.keyId] === item[this.keyId]) {
                            item._checked = false
                            Vue.set(this.data, key, item)
                            this.delectFlag = true
                        }
                    })
                }
                this.$emit('on-delete', value, position) // 删除的数据和删除的位置
            },
            onCurrentChange(newValue, oldValue) { // 单选
                this.areaData = []
                this.areaData.push(newValue)
            },
            onDblclick(value) { // 双击时触发
                if (this.highlightRow) {
                    this.data.forEach((item) => {
                        if (item[this.keyId] == value[this.keyId]) {
                            item._highlight = true
                        }
                    })
                    this.ok()
                }
            },
            visibleChange(value) { // 选人弹窗状态
                this.$emit('on-visible-change', this.show)
            }
        }
    }
</script>
<style lang="less">
    /*.model-select-wrapper .ivu-modal-no-mask {*/
    /*    background-color: rgba(55, 55, 55, 0.6)*/
    /*}*/
</style>
