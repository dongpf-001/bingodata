<template>
    <div class="content-inner">
        <Card>
            <bingo-staff-card :data="datas"></bingo-staff-card>
            <br>
            <br>
            <bingo-table
                    ref="table"
                    @getData="getData"
                    :columns="columns"
                    :data="data"
                    style="height: 300px"
                    :toolbar="modelTable.toolbar"
                    :border="modelTable.border"
                    :page="modelTable.page"
                    :pageSetting="modelTable.pageSetting">

                <span slot="action1" slot-scope="{ row, index }">
                    <bingo-staff-card :data="row" @on-popper-show="popperShow(row)"></bingo-staff-card>
                </span>
            </bingo-table>
            <div>
                <pre v-highlight>
                    <code>{{html1}}</code>
                </pre>
            </div>
        </Card>
        <Divider>详细描述</Divider>
        <h3>props</h3>
        <Table border :columns="columns1" :data="data1"></Table>
        <br/>
        <h3>event</h3>
        <Table border :columns="columns2" :data="data2"></Table>
    </div>
</template>

<script>
    import bingoStaffCard from '@/components-api/bingo-staff-card'
    import bingoTable from '@/components-api/bingo-table'
    import bingoActionDrop from '@/components-api/bingo-action-drop'
    // import * as Api from '@/api/bmsa/demo'
    export default {
        name: 'bingo-state2',
        data() {
            return {
                html1: '<bingo-staff-card :data="row" @on-popper-show="popperShow(row)"></bingo-staff-card>',
                datas: {
                    name: '刘会胜',
                    nachn: 'MR LIU',
                    pernr: '13668',
                    department: 'EPGW',
                    mobile: '',
                    email: 'LiuHuisheng@csvw.com',
                    photo: 'https://dev-file.iviewui.com/avatar_default/avatar'
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
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '公司',
                        key: 'companyName',
                        minWidth: 140
                    },
                    {
                        title: '姓名',
                        sortable: 'custom',
                        slot: 'action1',
                        key: 'name',
                        minWidth: 80
                    }
                ],
                data: [
                    {
                        id: 1,
                        name: '张三',
                        nachn: 'MR LIU',
                        pernr: '13668',
                        department: 'EPGW',
                        mobile: '',
                        email: 'LiuHuisheng@csvw.com',
                        photo: 'https://dev-file.iviewui.com/avatar_default/avatar'
                    },
                    {
                        id: 2,
                        name: '李四',
                        nachn: 'MR LIU',
                        pernr: '13668',
                        department: 'EPGW',
                        mobile: '',
                        email: 'LiuHuisheng@csvw.com',
                        photo: 'https://dev-file.iviewui.com/avatar_default/avatar'
                    },
                    {
                        id: 3,
                        name: '王五',
                        nachn: 'MR LIU',
                        pernr: '13668',
                        department: 'EPGW',
                        mobile: '',
                        email: 'LiuHuisheng@csvw.com',
                        photo: 'https://dev-file.iviewui.com/avatar_default/avatar'
                    },
                    {
                        id: 4,
                        name: '赵六',
                        nachn: 'MR LIU',
                        pernr: '13668',
                        department: 'EPGW',
                        mobile: '',
                        email: 'LiuHuisheng@csvw.com',
                        photo: 'https://dev-file.iviewui.com/avatar_default/avatar'
                    }
                ],
                columns1: [
                    {
                        title: '属性',
                        key: 'props-name',
                        width: 170
                    },
                    {
                        title: '说明',
                        key: 'props-decp',
                        width: 700
                    },
                    {
                        title: '类型',
                        key: 'props-type',
                        width: 170
                    },
                    {
                        title: '默认值',
                        key: 'props-default',
                        width: 170
                    }
                ],
                data1: [
                    {
                        'props-name': 'data',
                        'props-decp': '显示的数据源，例如：datas: {\n' +
                                '                    name: \'刘会胜\',\n' +
                                '                    nachn: \'MR LIU\',\n' +
                                '                    pernr: \'13668\',\n' +
                                '                    department: \'EPGW\',\n' +
                                '                    mobile: \'\',\n' +
                                '                    email: \'LiuHuisheng@csvw.com\',\n' +
                                '                    photo: \'https://dev-file.iviewui.com/avatar_default/avatar\'\n' +
                                '                },',
                        'props-type': 'Object',
                        'props-default': ''
                    }
                ],
                columns2: [
                    {
                        title: '事件名',
                        key: 'event-name',
                        width: 170
                    },
                    {
                        title: '说明',
                        key: 'event-decp',
                        width: 870
                    },
                    {
                        title: '返回值',
                        key: 'return-val',
                        width: 170
                    }
                ],
                data2: [
                    {
                        'event-name': 'bing-staff-card',
                        'event-decp': '提示框显示的时候触发',
                        'return-val': '...'
                    }
                ]
            }
        },
        created() {
        },
        computed: {},
        components: {
            bingoStaffCard,
            // Api,
            bingoTable,
            bingoActionDrop
        },
        mounted() {
            this.getData()
        },
        methods: {
            popperShow(row) {
            },
            getData() {
                // this.$refs.table.setLoading()
                let params = {}
                // params=Object.assign(this.$refs.table.getParams(), this.$refs.query.getParams());
                // Api.getTableData(params).then(res => {
                //   this.$refs.table.setLoading()
                //   this.modelTable.pageSetting.pageTotal = res.data.total
                //   this.data = res.data.rows
                // })
            }
        }
    }
</script>
