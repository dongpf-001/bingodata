<template>
    <div class="content-inner">
        <Card>
            <bingo-query ref="query" type="float" :col="query.col" :labelWidth="query.labelWidth" @on-submit="handleGetData"
                         @on-reset="handleReset" :data="queryData" >
                <bingo-grid-item>
                    <bingo-form-item label="菜单名称" label-for="name">
                        <Input v-model.trim="queryData.name" />
                    </bingo-form-item>
                </bingo-grid-item>
            </bingo-query>
            <bmsa-table-tool class="bmsa-query-height">
                <template #left-buttons>
                    <Button type="primary" customIcon="iconfont iconxinjian" @click="onNewMenu">{{ $t('page.common.new') }}</Button>
                    <Button type="primary" customIcon="iconfont iconshanchu" @click="onNewMenu">批量操作</Button>
                </template>
                <template #other-buttons>
                    <Input  shape="circle" suffix="ios-search" style="width: auto" />
                </template>
                <template #right-buttons>
                    <Tooltip transfer content="自定义">
                        <span>
                            <i class="icon iconfont iconshanchu"></i>
                        </span>
                    </Tooltip>
                </template>
                <vxe-table ref="xTable1"
                           slot="table"
                           :align="allAlign"
                           :data="tableData"
                           size="small"
                           :cell-style="cellStyle"
                           height="auto"
                           auto-resize
                           resizable
                           border
                           keep-source
                           show-header-overflow
                           show-overflow
                           highlight-hover-row
                           @radio-change="radioChangeEvent"
                           :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true}"
                           class="bmsa-table">
                    <vxe-table-column type="checkbox" width="60" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column type="seq" :title="$t('page.common.index')" width="60" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="nameCn" :title="$t('system.page.user.UserName')" :edit-render="{name: 'input'}" width="120"></vxe-table-column>
                    <vxe-table-column field="account" :title="$t('system.page.user.accountNumber')" :edit-render="{name: 'input'}" :title-help="{message: '用户账号，用于登录，确保唯一。'}" width="120"></vxe-table-column>
                    <vxe-table-column field="sexValue" :title="$t('system.page.user.Gender')" :filters="[{label: '男', value: '男'}, {label: '女', value: '女'}]" width="120"></vxe-table-column>
                    <vxe-table-column field="mobile" :title="$t('system.page.user.cellPhoneNumber')" width="120"></vxe-table-column>
                    <vxe-table-column field="email" :title="$t('system.page.user.mailbox')" width="120"></vxe-table-column>
                    <vxe-table-column field="deptValue" :title="$t('system.page.user.Department')" width="140"></vxe-table-column>
                    <vxe-table-column field="creator" :title="$t('system.page.common.Founder')" width="150"></vxe-table-column>
                    <vxe-table-column field="createTime" :title="$t('system.page.common.CreationTime')" width="180"></vxe-table-column>
                    <vxe-table-column field="modifier" :title="$t('system.page.common.ModifiedBy')" width="150"></vxe-table-column>
                    <vxe-table-column field="modifyTime" :title="$t('system.page.common.ModificationTime')" width="180"></vxe-table-column>
                    <vxe-table-column field="action" :title="$t('page.common.action')" fixed="right" align="center" width="190">
                        <template slot="default" slot-scope="{ row }">
                            <div class="bmsa-table-action">
                                <Button type="primary" size="small" @click="onEditMenu(row)">
                                    <i class="icon iconfont iconbianji" />
                                    <span>{{$t('page.common.edit')}}</span>
                                </Button>
                                <Button type="error" size="small" @click="onDeleteBtn(row)">
                                    <i class="icon iconfont iconshanchu" />
                                    <span>{{$t('page.common.delete')}}</span>
                                </Button>
                                <Dropdown transfer-class-name="bmsa-table-dropdown" trigger="click" transfer>
                                    <Button size="small" class="bmsa-table-dropdown-btn" type="default">{{ $t('page.common.more') }}<Icon type="md-arrow-dropdown" /></Button>
                                    <Dropdown-menu slot="list">
                                        <Button size="small">
                                            <Icon type="ios-lock-outline" />
                                            <span class="font">{{$t('system.page.common.PasswordReset')}}</span>
                                        </Button>
                                    </Dropdown-menu>
                                    <Dropdown-menu slot="list">
                                        <Button size="small">
                                            <i class="icon iconfont iconqunzuguanli" />
                                            <span class="font">{{$t('system.page.common.AssignmentGroup')}}</span>
                                        </Button>
                                    </Dropdown-menu>
                                    <Dropdown-menu slot="list">
                                        <Button size="small">
                                            <i class="icon iconfont iconjiaoseguanli" />
                                            <span class="font">{{$t('system.page.common.AssignRoles')}}</span>
                                        </Button>
                                    </Dropdown-menu>
                                </Dropdown>
                            </div>
                        </template>
                    </vxe-table-column>
                </vxe-table>
            </bmsa-table-tool>
        </Card>
    </div>
</template>
<script>
    import Api from '@/api/bmsa/user'
    import bmsaTableTool from '@/components/bmsa-table-tool'
    export default {
        name: 'bmsa-table',
        components: {
            bmsaTableTool
        },
        data () {
            return {
                allAlign: null,
                tableData: [],
                selectRow: null, // 单选
                query: { // 过滤区域
                    col: 3, // 显示几列
                    labelWidth: 100 // label宽度
                },
                queryData: {
                    name: ''
                },
            }
        },
        computed: {},
        created () {},
        mounted () {
            // 获取表格数据
            this.handleGetData()
        },
        methods: {
            // 格式化姓名
            formatterNum ({ cellValue, row, column }) {
                return cellValue + '自定义'
            },
            // 自定义单元格样式
            cellStyle ({ row, rowIndex, column }) {
                if (column.property === 'sex') {
                    if (row.sex === 'Women') {
                        return {
                            backgroundColor: '#187',
                            color: '#ffffff'
                        }
                    } else if (row.age === 28) {
                        return {
                            backgroundColor: '#2db7f5',
                            color: '#000'
                        }
                    }
                }
            },
            // 单选
            radioChangeEvent ({ row }) {
                this.selectRow = row
                console.log('单选事件')
            },
            // 单选
            clearRadioRowEevnt () {
                this.selectRow = null
                this.$refs.xTable1.$refs.vxeTable.clearRadioRow()
            },
            // 筛选年龄
            filterAgeMethod ({ option, row }) {
                return row.age === Number(option.data)
            },
            // 查询
            handleGetData () {
                let params = {}
                Api.tableList(params).then((res) => {
                    this.tableData = res.rows
                    this.tableData.forEach(item => {
                        item.sexCode = item.sex.code
                        item.sexValue = item.sex.value
                        item.deptCode = item.deptId.code
                        item.deptValue = item.deptId.value
                    })
                })
            },
            // 重置
            handleReset () {

            },
            // 编辑
            onEditMenu (row) {

            },
            // 删除
            onDeleteBtn (row) {

            }
        }
    };
</script>
<style lang="less" scoped>
    .demo-table {
        width: 100%;
        height: 100%;
    }
    .menu-vxe-left {
        margin-left: 8px;
    }
</style>
