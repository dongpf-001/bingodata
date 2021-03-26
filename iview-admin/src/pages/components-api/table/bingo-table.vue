<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split" style="height: 850px">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <bingoTable
                                ref="table"
                                @getData="getData"
                                :columns="columns"
                                :data="data"
                                :toolbar="model.toolbar"
                                :border="model.border"
                                :page="model.page"
                                height="200px"
                                :pageSetting="model.pageSetting"
                                :size="model.size"
                                @on-select="onSelect"
                                @on-select-all="onSelectAll"
                                @on-selection-change="onSelectionChange">
                                <span slot="toolbar">
                                        <Button type="primary" icon="md-add" @click="add">新建</Button>
                                        <Button type="primary" icon="md-cloud-download" class="ivu-ml-8">导出</Button>
                                </span>
                            <span slot="age" slot-scope="{ row, index }">
                                    <Input v-model="row.age" @on-change="inputChange(row,index)"/>
                                </span>
                            <span slot="name" slot-scope="{ row, index }"></span>
                        </bingoTable>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        <Tabs style="margin-top: 0px">
                            <TabPane label="代码">
                                <Button class="btn-copy" @click="handleCopy">copy</Button>
                                <pre v-highlight>
                                    <code>{{html}}</code>
                                </pre>
                            </TabPane>
                        </Tabs>
                    </div>
                </Split>
            </div>
            <Divider>详细描述</Divider>
            <Form :model="model" :label-width="140">
                <FormItem label="是否显示操作栏">
                    <Switch v-model="model.toolbar"/>
                    toolbar属性 true or false
                </FormItem>
                <FormItem label="操作栏显示内容">
                    在 slot="toolbar" 标签下写
                </FormItem>
                <FormItem label="是否显示边框">
                    <Switch v-model="model.border"/>
                    border属性 true or false
                </FormItem>
                <FormItem label="高度设置">
                    height属性 设置高度，如果无设置，默认响应式计算
                </FormItem>
                <FormItem label="setCustomHeight">
                    setCustomHeight 组件区域 有自定义内容 ，除去自定义内容的高度的方法，以达到自定义相应计算，详见例子
                </FormItem>
                
                <FormItem label="控制表格大小">
                    <Select v-model="model.size" placeholder="请选择负责人">
                        <Option value="small">small</Option>
                        <Option value="large">large</Option>
                        <Option value="default">default</Option>
                    </Select>
                    size属性为“small”或“large”，默认为“default”或者不填
                </FormItem>
                <FormItem label="自定义列显示内容">
                    在 slot="自定义列slot值的标签下写" 例 { title: 'Name', key: 'name', slot: 'name', } 在 slot="name" 标签下写
                </FormItem>
                <FormItem label="是否开启分页">
                    <Switch v-model="model.page"/>
                    page属性 true or false
                </FormItem>
                <FormItem label="分页配置数据">
                    pageSetting对象下 {pageNum：当前页面， pageTotal：数据总数， pageSize：页显示最多行数， showSizer：是否显示每页条数配置，
                    pageSizeOpts：每页条数配置}
                </FormItem>
                <FormItem label="表格复选框">
                    通过给 columns 数据设置一项，指定 type: 'selection'，即可自动开启多选功能。<br>
                    给 data 项设置特殊 key _checked: true 可以默认选中当前项。<br>
                    给 data 项设置特殊 key _disabled: true 可以禁止选择当前项。<br>
                </FormItem>
                <FormItem label="表格复选框绑定方法">
                    @on-select，选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。<br>
                    @on-select-all，点击全选时触发，返回值为 selection，已选项。<br>
                    @on-selection-change，只要选中项发生变化时就会触发，返回值为 selection，已选项。<br>
                </FormItem>
                <FormItem label="表格排序">
                    通过给 columns 数据的项，设置 sortable: true，即可对该列数据进行排序。
                </FormItem>
                <FormItem label="表格固定列">
                    通过给 columns 数据的项，设置 fixed: left or right，即可
                </FormItem>
                <FormItem label="筛选">
                    通过给 columns 数据的项，设置 filters，可进行筛选，filters 接收一个数组，详见 Demo 和 API。
                    
                    必须指定一个筛选函数 filterMethod 才可以进行筛选，filterMethod 传入两个参数 value 和 row，详见 Demo 和 API。
                    
                    如果指定 filterMultiple: false，则使用单选，默认为多选。
                </FormItem>
                <FormItem label="单选">
                    通过设置属性 highlight-row，可以选中某一行。
                    
                    当选择时，触发事件 @on-current-change，可以自定义操作，事件返回两个值 currentRow 和 oldCurrentRow，分别为当前行的数据和上一次选择的数据。
                    
                    通过给 columns 数据设置一项，指定 type: 'index'，可以自动显示一个从 1 开始的索引列。使用 indexMethod 可以自定义序号。
                    
                    给 data 项设置特殊 key _highlight: true 可以默认选中当前项。
                    
                    调用 clearCurrentRow 方法可以手动清除选中项。
                </FormItem>
                <FormItem label="拖拽调整该列的宽度">
                    通过给 columns 数据的项，设置 resizable 为 true，可以拖拽调整该列的宽度，需开启 border 属性，且该列设置了 width 属性。
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import bingoTable from '@/components-api/bingo-table'
    import {getTableData} from '@/api/mock.js'

    export default {
        name: 'bingo-table',
        data() {
            return {
                columns: [
                    {
                        title: 'Date',
                        key: 'date',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        resizable: true,
                        filters: [
                            {
                                label: '大于 18',
                                value: 1
                            },
                            {
                                label: '小于 18',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            if (value === 1) {
                                return row.age > 18
                            } else if (value === 2) {
                                return row.age < 18
                            }
                        },
                        width: 180
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        filters: [
                            {
                                label: 'New York',
                                value: 'New York'
                            }
                        ],
                        filterMethod(value, row) {
                            return row.address.indexOf(value) > -1
                        }
                    }
                ],
                data: [],
                model: {
                    toolbar: true,
                    border: true,
                    page: false,
                    size: 'small',
                    pageSetting: {
                        pageNum: 1,
                        pageTotal: 30,
                        pageSize: 10,
                        showSizer: true,
                        pageSizeOpts: [10, 15, 30]
                    }
                },
                html: '                  <bingoTable\n' +
                        '                                ref="table"\n' +
                        '                                @getData="getData"\n' +
                        '                                :columns="columns"\n' +
                        '                                :data="data"\n' +
                        '                                :toolbar="model.toolbar"\n' +
                        '                                :border="model.border"\n' +
                        '                                :page="model.page"\n' +
                        '                                height="200px"\n' +
                        '                                :pageSetting="model.pageSetting"\n' +
                        '                                :size="model.size"\n' +
                        '                                @on-select="onSelect"\n' +
                        '                                @on-select-all="onSelectAll"\n' +
                        '                                @on-selection-change="onSelectionChange">\n' +
                        '                                <span slot="toolbar">\n' +
                        '                                        <Button type="primary" icon="md-add" @click="add">新建</Button>\n' +
                        '                                        <Button type="primary" icon="md-cloud-download" class="ivu-ml-8">导出</Button>\n' +
                        '                                </span>\n' +
                        '                                <span slot="age" slot-scope="{ row, index }">\n' +
                        '                                    <Input v-model="row.age" @on-change="inputChange(row,index)"/>\n' +
                        '                                </span>\n' +
                        '                                <span slot="name" slot-scope="{ row, index }"></span>\n' +
                        '                        </bingoTable>'
            }
        },
        components: {bingoTable},
        created() {
            this.getTableDatas()
        },
        mounted() {
            this.data = [
                {
                    name: 'John Brown1John Brown1John Brown1John Brown1John Brown1John Brown1John Brown1',
                    age: 2,
                    _checked: true,
                    address: 'New York',
                    date: '2016-10-03',
                    action: '12'
                },
                {
                    name: 'John Brown2',
                    age: 18,
                    _checked: true,
                    address: '1 Lake Park2',
                    date: '2016-10-03',
                    action: '123'
                },
                {
                    name: 'John Brown2',
                    age: 24,
                    _checked: true,
                    address: ' Park2',
                    date: '2016-10-03',
                    action: '123'
                }
            ]
        },
        computed: {},
        watch: {},
        methods: {
            getData() {
                if (this.model.pageSetting.pageNum === 2) {
                    this.data = [
                        {
                            name: 'John Brown2',
                            age: 18,
                            address: 'New York No. 1 Lake Park',
                            date: '2016-10-03',
                            action: '自定义'
                        },
                        {
                            name: 'Jim Green2',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01',
                            action: '自定义'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            action: '自定义',
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            action: '自定义',
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        }
                    ]
                } else if (this.model.pageSetting.pageNum === 2) {
                    this.data = [
                        {
                            name: 'John Brown3',
                            age: 18,
                            address: 'New York No. 1 Lake Park',
                            date: '2016-10-03',
                            action: '自定义'
                        },
                        {
                            name: 'Jim Green333',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01',
                            action: '自定义'
                        },
                        {
                            name: 'Joe Black333',
                            age: 30,
                            action: '自定义',
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            action: '自定义',
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        }
                    ]
                } else {
                    this.data = [
                        {
                            name: 'John Brown',
                            age: 18,
                            address: 'New York No. 1 Lake Park',
                            date: '2016-10-03',
                            action: '自定义'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01',
                            action: '自定义'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            action: '自定义',
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            action: '自定义',
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        }
                    ]
                }
            },
            getTableDatas() {
                debugger
                getTableData().then(res => {
                    debugger
                    console.log(res)
                })
            },
            onSelect(selection, row) {
                console.log(selection, row)
            },
            onSelectAll(selection) {
                console.log(selection, '--onSelectAll')
            },
            onSelectionChange(selection) {
                console.log(selection, '--onSelectionChange')
            },
            add() {
            },
            inputChange(row, index) {
                this.data.splice(index, 1, row)
            },
            handleCopy(html) {
                let that = this
                this.$Copy({
                    text: that.html
                })
            }
        }
    }
</script>
