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
                
                </div>
                <div class="bmsa-drop-grid-tag" v-else-if="!multiple && JSON.stringify(defaultRadio)!='{}'">
                    <Tag closable @on-close="handleRadioClose">{{defaultRadio[rowName]}}</Tag>
                </div>
            </div>
            <template #dropdown>
                <div class="bmsa-drop-grid-drop">
                    <slot name="header"></slot>
                    <vxe-grid ref="xTable" v-bind="gridOptions" class="bmsa-table"
                              :row-id="rowId"
                              :radio-config="{checkRowKey: defaultRadio[rowId]}"
                              @radio-change="handleRadioChange">
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
            multiple: { // 是否支持多选
                type: Boolean,
                default: false
            },
            defaultRadio: { // 单选时默认回显的数据
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
            maxTagCount: { // input框最多显示的个数
                type: Number,
                default: 1
            }
        },
        watch: {
        },
        methods: {
            // 构造表格列
            setColumns () {
                if (this.columns && this.columns.length) {
                    if (this.multiple) { // 多选

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
                this.api.getList(page).then(res=>{
                    this.gridOptions.data = res.rows
                    this.page.totalResult = res.total
                    this.gridOptions.loading = false
                    this.$refs.xTable.reloadData(this.gridOptions.data) // 从新加载表格，用于选中回显
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
                this.radioSelect = this.defaultRadio
                this.$refs.xDown.showPanel()
                this.showDrop = true
                this.getList() // 获取列表数据
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
            // 删除input中标签
            handleRadioClose () {
                this.$emit('on-select', {}) // 选完查询条件后的回调
                this.$emit('on-delete', this.radioSelect)
            }
        },
        computed: {
        },
        mounted () {
            this.setColumns()
        }
    }
</script>
<style lang="less" scoped>
    .bmsa-drop-grid-wrapper {
        .bmsa-drop-grid-input { // 显示选择数据的input框
            width: 260px;
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
            top: 5px;
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
