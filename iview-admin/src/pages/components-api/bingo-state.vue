<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split" style="height: 750px">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <!--                        <bingo-state v-model="states" :states="showStates"></bingo-state>{{states}}-->
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth" ref="form" :button="query.button">
                            <!--                <bingo-grid-item>-->
                            <!--                    <FormItem label="选择状态">-->
                            <!--                        <bingo-state type="drop" v-model="states2"></bingo-state>-->
                            <!--                    </FormItem>-->
                            <!--                </bingo-grid-item>-->
                            <bingo-grid-item>
                                <FormItem label="下拉选择状态">
                                    <bingo-state type="select" v-model="states2" :size="15"></bingo-state>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <br>
                        <br>
                        <bingo-table
                                ref="table"
                                :columns="columns"
                                :data="data"
                                :toolbar="modelTable.toolbar"
                                :border="modelTable.border"
                                :page="modelTable.page"
                                :pageSetting="modelTable.pageSetting"
                                style="height: 330px">

                            <span slot="action" slot-scope="{ row, index }">
                                <bingo-action-drop>
                                    <a>编辑</a>
                                    <span slot="list">
                                         <DropdownItem>
                                            <span>编辑</span>
                                         </DropdownItem>
                                         <DropdownItem>
                                            <span>删除</span>
                                        </DropdownItem>
                                     </span>
                                </bingo-action-drop>
                            </span>
                            
                            <span slot="action1" slot-scope="{ row, index }">
                                <bingo-state v-model="row.state" :disabled="row.disabled" :states="showStatesColor(row)"
                                             @on-change="onChange(row)" @on-click="onClick(row)"></bingo-state>
                            </span>
                        </bingo-table>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        <Button class="btn-copy" @click="handleCopy">copy</Button>
                        <pre v-highlight>
                            <code>{{html1}}</code>
                            <code>{{html2}}</code>
                        </pre>
                    </div>
                </Split>
            </div>
            <Divider>详细描述</Divider>
            <h3>props</h3>
            <Table border :columns="columns1" :data="data1"></Table>
            <br/>
            <h3>event</h3>
            <Table border :columns="columns2" :data="data2"></Table>
        </Card>
    </div>
</template>

<script>
    import bingoState from '@/components-api/bingo-state'
    import bingoTable from '@/components-api/bingo-table'
    import bingoActionDrop from '@/components-api/bingo-action-drop'
    import bingoForm from '@/components-api/bingo-query/bingo-form'
    import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
    // import * as Api from '@/api/bmsa/demo'
    export default {
        name: 'bingo-state2',
        data() {
            return {
                split: 0.6,
                html1: '<!-- 在列表中使用 -->\n' +
                        '<bingo-state v-model="row.state" :disabled="row.disabled" :states="showStatesColor(row)"\n' +
                        '@on-change="onChange(row)" @on-click="onClick(row)"></bingo-state>',
                html2: '<!-- 下拉选择状态 -->\n' +
                        '<bingo-state type="select" v-model="states2" :size="15"></bingo-state>',
                showStates: [
                    {
                        value: 0,
                        color: 'red',
                        msg: '未完成'
                    },
                    {
                        value: 1,
                        color: 'yellow'
                    },
                    {
                        value: 2,
                        color: 'green',
                        msg: '已完成'
                    }
                ],
                states: 'yellow',
                states2: '',
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
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
                        title: '操作',
                        key: 'action',
                        width: 100,
                        slot: 'action',
                        fixed: 'left',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        slot: 'action1',
                        align: 'center',
                        width: 90
                    },
                    {
                        title: '公司名称',
                        key: 'companyName',
                        minWidth: 140
                    }
                ],
                data: [
                    {
                        id: 1,
                        companyName: '公司1',
                        state: 'red',
                        custom: '名称1',
                        disabled: true
                    },
                    {
                        id: 2,
                        companyName: '公司2',
                        state: 'yellow',
                        custom: '名称2',
                        disabled: false
                    },
                    {
                        id: 3,
                        companyName: '公司3',
                        state: '',
                        custom: '名称3'
                    },
                    {
                        id: 4,
                        companyName: '公司4',
                        state: 'red',
                        custom: '名称4'
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
                        'props-name': 'v-model',
                        'props-decp': '绑定的数据',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'type',
                        'props-decp': '使用的类型，默认是在列表中使用，若想使用下拉则 type="select"',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'states',
                        'props-decp': '显示的状态，例如：return [\n' +
                                '                        {\n' +
                                '                            value: 0,\n' +
                                '                            color: \'red\',\n' +
                                '                            msg: \'\'\n' +
                                '                        },\n' +
                                '                    ]',
                        'props-type': 'Array',
                        'props-default': '显示所有状态'
                    },
                    {
                        'props-name': 'disabled',
                        'props-decp': '控制状态是否只读',
                        'props-type': 'Boolean',
                        'props-default': 'false'
                    },
                    {
                        'props-name': 'size',
                        'props-decp': '控制大小',
                        'props-type': 'Number',
                        'props-default': '22'
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
                        'event-name': 'on-change',
                        'event-decp': '在选项状态发生改变时触发,返回当前状态',
                        'return-val': '...'
                    }
                ]
            }
        },
        created() {
        },
        computed: {},
        components: {
            bingoState,
            // Api,
            bingoTable,
            bingoActionDrop,
            bingoForm,
            bingoGridItem
        },
        methods: {
            showStatesColor(row) {
                let showColors = [
                    {
                        value: 0,
                        color: 'red'
                    },
                    {
                        value: 1,
                        color: 'yellow'
                    },
                    {
                        value: 2,
                        color: 'green'
                    },
                    {
                        value: 3,
                        color: 'redYellow'
                    }
                ]
                if (row.id === 4) {
                    showColors = [
                        {
                            value: 0,
                            color: 'red'
                        },
                        {
                            value: 1,
                            color: 'yellow'
                        }
                    ]
                }
                return showColors
            },
            onChange(row) {
                console.log(row)
            },
            onClick(row) {
                this.$Message.success('编辑事件')
            }
        }
    }
</script>
