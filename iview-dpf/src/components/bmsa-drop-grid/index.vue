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
                         :closable="!showDrop"
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
                    <Tag :closable="!showDrop" @on-close="handleRadioClose">{{radioSelect[rowName]}}</Tag>
                </div>
            </div>
            <template #dropdown>
                <div class="bmsa-drop-grid-drop">
                    <slot name="header"></slot>
                    <vxe-grid ref="xTable" v-bind="gridOptions" class="bmsa-table"
                              :row-id="rowId"
                              :radio-config="{checkRowKey: defaultRadioId}"
                              @radio-change="handleRadioChange"
                              :checkbox-config="{checkRowKeys: defaultCheckbox}"
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
                    height: '300',
                    data: [],
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: true,
                    autoResize: true,
                    highlightHoverRow: true,
                    loading: false,
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
            defaultRadioId: { // 单选时默认回显的数据
                type: [String, Number],
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
            getTooltip () {
                let message = []
                if (this.checkSelect.length) {
                    this.checkSelect.forEach((item, key) => {
                        if (key > this.maxTagCount - 1) {
                            message.push(item[this.rowName])
                        }
                    })
                }
                return message.join(',')
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
                    } else { // 单选
                        this.columns.unshift({
                            type: 'radio',
                            slots: { header: 'radio' },
                            align: 'center',
                            fixed: 'left',
                            width: 60
                        })
                    }
                }
            },
            //获取列表数据
            getList(params){
                let page = {
                    pageNum: this.page.currentPage,
                    pageSize: this.page.pageSize,
                }
                if (params) { // 有查询条件
                    page = Object.assign(page, params)
                }
                this.gridOptions.loading = true
                return new Promise((resolve) => {
                    this.api.getList(page).then(res=>{
                        this.gridOptions.data = res.rows
                        this.page.totalResult = res.total
                        this.gridOptions.loading = false
                        resolve(res.rows)
                    })
                })
            },
            // 获取默认选中的数据
            getDefaultSelect () {
                this.getList().then(() => {
                    // 获取默认选中的数据
                    this.radioSelect = {} // 单选时回显
                    this.checkSelect = [] // 多选时
                    if (this.multiple && this.defaultCheckbox.length) { // 多选
                        this.gridOptions.data.forEach(item => {
                            this.defaultCheckbox.forEach(item2 => {
                                if (item[this.rowId] == item2) {
                                    this.checkSelect.push(item)
                                }
                            })
                        })
                    } else if (!this.multiple && this.defaultRadioId) { // 单选
                        this.gridOptions.data.forEach(item => {
                            if (item[this.rowId] == this.defaultRadioId) {
                                this.radioSelect = item
                            }
                        })
                    }
                    if (this.$refs.xTable) { // 构造回显后必须从新reloadData下表格
                        this.$refs.xTable.reloadData(this.gridOptions.data)
                    }
                })
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
                this.getDefaultSelect() // 获取列表数据
            },
            // 隐藏时触发
            handleHide () {
                this.showDrop = false
            },
            // 切换页码
            handlePageChange ({ currentPage, pageSize }) {
                this.page.currentPage = currentPage
                this.page.pageSize = pageSize
                this.getList() // 获取列表数据
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
                this.$emit('on-select', {}) // 选完查询条件后的回调
                this.$emit('on-delete', deleteItem)
            },
            // 多选事件
            handleCheckChange ({ records, row }) {
                this.checkSelect = records
                // 选中的全部数据/参数为当前选中的数据
                this.$emit('on-select', this.checkSelect, row)
            },
            // 全选事件
            handleCheckAll ({ records }) {
                this.checkSelect = records
                this.$emit('on-select', this.checkSelect)
            },
            // 多选的取消选中
            handleCheckClose (row) {
                for (let i=0; i<this.checkSelect.length; i++) {
                    let item = this.checkSelect[i]
                    if (item[this.rowId] == row[this.rowId]) {
                        this.checkSelect.splice(i, 1)
                        break
                    }
                }
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
