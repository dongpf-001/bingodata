<template>
    <div class="bmsa-drop-grid-wrapper">
        <vxe-pulldown ref="xDown" transfer @hide-panel="handleHide">
            <div class="bmsa-drop-grid-tooltip" slot="default">
                <!--显示框区域，可自定义头尾图标-->
                <vxe-input v-model="inputShow" readonly class="bmsa-drop-grid-input"
                           :class="showDrop ? 'is--active' : ''" @focus="handleShow">
                    <template #prefix>
                        <slot name="prefix"></slot>
                    </template>
                    <template #suffix>
                        <i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow" @click="handleShow"/>
                    </template>
                </vxe-input>
                <!--选中数据后显示-->
                <div class="bmsa-drop-grid-tag" v-if="multiple">
                    <Tag v-for="(item, key) in checkSelect"
                         v-if="key<maxTagCount"
                         closable
                         @on-close="handleCheckClose(item)">
                        {{item[rowName]}}
                    </Tag>
                    <Tooltip :content="getTooltip" transfer v-if="checkSelect.length>maxTagCount" :max-width="150">
                        <Tag v-if="checkSelect.length>maxTagCount">
                            + {{checkSelect.length-maxTagCount}}...
                        </Tag>
                    </Tooltip>
                </div>
                <div class="bmsa-drop-grid-tag" v-else-if="!multiple && JSON.stringify(radioSelect)!='{}'">
                    <Tag closable @on-close="handleRadioClose">{{radioSelect[rowName]}}</Tag>
                </div>
            </div>
            <template #dropdown>
                <div class="bmsa-drop-grid-drop">
                    <slot name="header"></slot>
                    <vxe-grid ref="xTable" v-bind="gridOptions" class="bmsa-table"
                              :row-id="rowId"
                              @current-change="handleRadioChange"
                              :checkbox-config="{checkRowKeys: getCheckDefault}"
                              @checkbox-change="handleCheckChange"
                              @checkbox-all="handleCheckAll">
                        <!--单选-->
                        <template #radio="{ row }">
                            <vxe-button type="text" @click="handleClearRadioRow" v-if="JSON.stringify(radioSelect)!='{}'">取消</vxe-button>
                            <vxe-button type="text" v-else>选择</vxe-button>
                        </template>
                        <!--分页-->
                        <template #pager>
                            <vxe-pager border
                                       size="medium"
                                       align="center"
                                       :layouts="['Total', 'PrevPage', 'Number', 'NextPage', 'Sizes']"
                                       :current-page.sync="page.currentPage"
                                       :page-size.sync="page.pageSize"
                                       :total="page.totalResult"
                                       @page-change="handlePageChange">
                            </vxe-pager>
                        </template>
                    </vxe-grid>
                </div>
            </template>
        </vxe-pulldown>
    </div>
</template>

<script>
    export default {
        name: 'bmsa-drop-grid',
        data () {
            return {
                inputShow: '', // 选中后显示的内容
                showDrop: false, // 是否显示下拉表格
                gridOptions: { // 表格的通用配置
                    height: this.height,
                    data: [],
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: true,
                    autoResize: true,
                    highlightHoverRow: true,
                    loading: false,
                    highlightCurrentRow: !this.multiple,
                    size: 'small',
                    stripe: true, // 斑马纹
                    columns: this.columns
                },
                page: { // 表格分页
                    currentPage: 1, // 查询页数
                    pageSize: 10, // 查询数量
                    totalResult: 0, // 总数量
                },
                radioSelect: {}, // 单选选中的数据
                checkSelect: {}, // 多选选中的数据
            }
        },
        props: {
            columns: { // 表格列
                type: Array,
                default: () => {
                    return []
                }
            },
            height: { // 下拉表格的高度
                type: [String, Number],
                default: '300'
            },
            api: { // 查询数据源的api，接口方法名固定是getList
                type: Object,
                default: () => {
                    return {}
                }
            },
            rowId: { // 区分数据唯一的字段
                type: String,
                default: 'id'
            },
            rowName: { // 选中后显示的字段
                type: String,
                default: 'name'
            },
            multiple: { // 是否支持多选
                type: Boolean,
                default: false
            },
            isDefaultGather: { // 回显时是否根据数据集回显，默认是直接根据rowId回显
                type: Boolean,
                default: false
            },
            defaultRadio: { // 单选时默认回显的数据
                type: [String, Number, Object],
                default: null
            },
            defaultCheckbox: { // 多选时默认回显的数据
                type: Array,
                default: () => {
                    return []
                }
            },
            maxTagCount: { // input框最多显示的个数
                type: Number,
                default: 2
            }
        },
        computed: {
            getTooltip () { // 构造显示的tooltip
                let message = []
                if (this.checkSelect.length) {
                    this.checkSelect.forEach((item, key) => {
                        if (key > this.maxTagCount - 1) {
                            message.push(item[this.rowName])
                        }
                    })
                }
                return message.join(',')
            },
            getCheckDefault () { // 多选情况下获取默认回显的字段集合
                let rowIds = []
                if (this.isDefaultGather) { // 根据数据集回显
                    this.defaultCheckbox.forEach(item => {
                        rowIds.push(item[this.rowId])
                    })
                } else {
                    rowIds = this.defaultCheckbox
                }
                return rowIds
            }
        },
        watch: {
        },
        methods: {
            // 构造表格列
            setColumns () {
                if (this.columns && this.columns.length) {
                    if (this.multiple) { // 多选
                        this.columns.unshift({
                            type: 'checkbox',
                            align: 'center',
                            fixed: 'left',
                            width: 60
                        })
                    }
                }
            },
            // 调用接口(核心接口)，接口返回数据格式是data[rows:{}]
            getApiData (params) {
                return new Promise((resolve) => {
                    this.api.getList(params).then(res=>{
                        resolve(res)
                    })
                })
            },
            //获取列表数据源
            getData(params){
                let page = {
                    pageNum: this.page.currentPage,
                    pageSize: this.page.pageSize,
                }
                if (params) { // 有查询条件
                    page = Object.assign(page, params)
                }
                this.gridOptions.loading = true
                this.getApiData(page).then(res=>{
                    this.gridOptions.data = res.rows
                    this.page.totalResult = res.total
                    this.gridOptions.loading = false
                    // 构造回显后必须从新reloadData下表格
                    if (this.$refs.xTable) {
                        this.$refs.xTable.reloadData(this.gridOptions.data)
                    }
                    // 单选的时候回显高亮
                    this.getRadioHighlight()
                })
            },
            // 获取默认选中的数据
            getDefaultSelect () {
                // 获取默认选中的数据
                this.radioSelect = {} // 单选时回显
                this.checkSelect = [] // 多选时
                if (this.isDefaultGather) { // 根据数据集回显
                    if (this.multiple && this.defaultCheckbox.length) { // 多选
                        this.checkSelect = this.defaultCheckbox
                    } else if (!this.multiple && this.defaultRadio) { // 单选
                        if (this.defaultRadio.constructor === Object) { // 判断是对象
                            this.radioSelect = this.defaultRadio
                        } else {
                            this.$Message.warning('回显的参数(defaultRadio)必须是对象！')
                        }
                    }
                } else { // 根据rowId回显
                    const allApi = [] // 异步接口集合
                    if (this.multiple && this.defaultCheckbox.length) { // 多选
                        this.defaultCheckbox.forEach(item => {
                            let page = {
                                pageNum: this.page.currentPage,
                                pageSize: this.page.pageSize,
                            }
                            page[this.rowId] = item
                            const oneApi = this.getApiData(page)
                            allApi.push(oneApi)
                        })
                        Promise.all(allApi).then((data) => {
                            data.forEach(item => {
                                item.rows.forEach(item2 => {
                                    this.checkSelect.push(item2)
                                })
                            })
                        })
                    } else if (!this.multiple && this.defaultRadio) { // 单选
                        let page = {
                            pageNum: this.page.currentPage,
                            pageSize: this.page.pageSize,
                        }
                        page[this.rowId] = this.defaultRadio
                        this.getApiData(page).then(res => {
                            if (res.rows.length) {
                                this.radioSelect = res.rows[0]
                            }
                        })
                    }
                }
            },
            // 单选的时候回显触发高亮 每次getData都要触发
            getRadioHighlight () {
                if (!this.multiple && this.defaultRadio) {
                    for (let i=0; i<this.gridOptions.data.length; i++) {
                        let item = this.gridOptions.data[i]
                        if (item[this.rowId] == (this.isDefaultGather ? this.defaultRadio[this.rowId] : this.defaultRadio)) {
                            this.$refs.xTable.setCurrentRow(this.gridOptions.data[i])
                            break
                        }
                    }
                }
            },
            // 点击展开下拉时触发
            handleShow () {
                if (!this.columns.length) {
                    this.$Message.warning('请传入表格列！')
                    return
                }
                if (this.api == {}) {
                    this.$Message.warning('请传入表格api！')
                    return
                }
                this.page = { // 重置表格分页
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 0,
                }
                this.$refs.xDown.showPanel()
                this.showDrop = true
                this.getData() // 获取列表数据源
            },
            // 隐藏时触发
            handleHide () {
                this.showDrop = false
            },
            // 切换页码
            handlePageChange ({ currentPage, pageSize }) {
                this.page.currentPage = currentPage
                this.page.pageSize = pageSize
                this.getData() // 获取列表数据源
            },
            // 单选事件
            handleRadioChange ({ row }) {
                this.radioSelect = row
                this.$emit('on-select', this.radioSelect) // 选完查询条件后的回调
            },
            // 单选的取消选中
            handleClearRadioRow () {
                this.radioSelect = {}
                this.$refs.xTable.clearRadioRow()
                this.$emit('on-select', this.radioSelect) // 选完查询条件后的回调
            },
            // 单选时删除input中标签
            handleRadioClose () {
                let deleteItem = JSON.parse(JSON.stringify(this.radioSelect))
                this.radioSelect = {}
                this.$refs.xTable.clearCurrentRow() // 去掉高亮
                this.$emit('on-select', {}) // 选完查询条件后的回调
                this.$emit('on-delete', deleteItem)
            },
            // 多选事件
            handleCheckChange ({ row }) {
                let flag = true // true为选中，false为取消选中
                let index = 0
                for (let i=0; i<this.checkSelect.length; i++) {
                    let item = this.checkSelect[i]
                    if (item[this.rowId] == row[this.rowId]) {
                        flag = false
                        index = i
                        break
                    }
                }
                if (flag) { // 选中添加
                    this.checkSelect.push(row)
                } else { // 取消删除
                    this.checkSelect.splice(index, 1)
                }
                // 选中的全部数据/参数为当前选中的数据
                this.$emit('on-select', this.checkSelect, row)
            },
            // 全选事件
            handleCheckAll ({ records }) {
                let datas = JSON.parse(JSON.stringify(this.checkSelect)) // 拷贝当前选中的数据
                if (records.length) { // 表示选中当前页数据
                    this.gridOptions.data.forEach(item => { // 当前页数据循环
                        let flag = true
                        datas.forEach(item2 => {
                            if (item[this.rowId] == item2[this.rowId]) { // 代表选中的数据中已存在该数据
                                flag = false
                            }
                        })
                        if (flag) { // 添加
                            this.checkSelect.push(item)
                        }
                    })
                } else { // 表示取消选中当前页数据
                    this.gridOptions.data.forEach(item => { // 当前页数据循环
                        let rowId = null
                        datas.forEach(item2 => {
                            if (item[this.rowId] == item2[this.rowId]) { // 代表选中的数据中已存在该数据
                                rowId = item2[this.rowId]
                            }
                        })
                        if (rowId) { // 添加
                            this.checkSelect.forEach((item, index) => {
                                if (item[this.rowId] == rowId) {
                                    this.checkSelect.splice(index, 1)
                                }
                            })
                        }
                    })
                }
                this.$emit('on-select', this.checkSelect)
            },
            // 多选时删除input中标签
            handleCheckClose (row) {
                for (let i=0; i<this.checkSelect.length; i++) {
                    let item = this.checkSelect[i]
                    if (item[this.rowId] == row[this.rowId]) {
                        this.checkSelect.splice(i, 1)
                        break
                    }
                }
                this.$refs.xTable.reloadData(this.gridOptions.data) // 从新加载数据
                this.$emit('on-select', this.checkSelect) // 选完查询条件后的回调
                this.$emit('on-delete', row)
            }
        },
        mounted () {
            this.setColumns()
            this.getDefaultSelect()
        }
    }
</script>
<style lang="less" scoped>
    .bmsa-drop-grid-wrapper {
        /deep/ .vxe-pulldown {
            width: 100%;
        }
        .bmsa-drop-grid-input { // 显示选择数据的input框
            width: 100%;
        }
    }
    .bmsa-drop-grid-drop { // 下拉
        width: 600px;
        padding: 12px 12px 0 12px;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    }
    .bmsa-drop-grid-tooltip { // input框
        position: relative;
        overflow: hidden;
        .bmsa-drop-grid-tag { // 显示的标签
            max-width: calc(~'100% - 40px');
            overflow: hidden;
            position: absolute;
            top: 2px;
            left: 4px;
        }
        .ivu-select-arrow {
            transform: translateY(-50%);
            font-size: 14px;
            color: #808695;
            transition: all 0.2s ease-in-out;
        }
        .is--active .ivu-select-arrow {
            transform: translateY(-50%) rotate(180deg);
            display: inline-block;
        }
    }
</style>
