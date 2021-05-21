<template>
    <div class="bmsa-drop-grid-wrapper">
        <vxe-pulldown ref="xDown" transfer>
            <template #default>
                <!--显示框区域，可自定义头尾图标-->
                <vxe-input v-model="inputShow" readonly class="bmsa-drop-grid-inpiut" @focus="handleShow">
                    <template #prefix>
                        <slot name="prefix"></slot>
                    </template>
                    <template #suffix>
                        <slot name="suffix"></slot>
                    </template>
                </vxe-input>
            </template>
            <template #dropdown>
                <div class="bmsa-drop-grid-drop">
                    <slot name="header"></slot>
                    <vxe-grid ref="xTable" v-bind="gridOptions" class="bmsa-table">
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
                    columns: this.columns
                },
                page: { // 表格分页
                    currentPage: 1, // 查询页数
                    pageSize: 10, // 查询数量
                    totalResult: 0, // 总数量
                },
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
            }
        },
        watch: {
        },
        methods: {
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
                    // this.$refs.xTable.reloadData(this.gridOptions.data) // 从新加载表格，用于选中回显
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
                this.$refs.xDown.showPanel()
                this.getList() // 获取列表数据
            },
            // 切换页码
            handlePageChange ({ currentPage, pageSize }) {
                this.page.currentPage = currentPage
                this.page.pageSize = pageSize
                this.getList() // 获取列表数据
            },
        },
        computed: {
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
    .bmsa-drop-grid-wrapper {
        .bmsa-drop-grid-inpiut { // 显示选择数据的input框
            width: 260px;
        }
    }
    .bmsa-drop-grid-drop { // 下拉
        width: 600px;
        padding: 12px 12px 0 12px;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    }
</style>
