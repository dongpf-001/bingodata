<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                                ref="form" :button="query.button" :rules="rules">
                        <bingo-grid-item>
                            <bingo-form-item label="单选根据字段回显" prop="defaultRadio1" label-for="defaultRadio1">
                                <bmsa-drop-grid :apiList="api.getList"
                                                :columns="column1"
                                                rowId="id"
                                                rowName="userName"
                                                :defaultRadio="data.defaultRadio1"
                                                @on-select="handleRadioSelect">
                                </bmsa-drop-grid>
                                {{data.defaultRadio1}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="多选根据字段回显" prop="defaultCheckbox1" label-for="defaultCheckbox1">
                                <bmsa-drop-grid :apiList="api.getList"
                                                ref="xDrop"
                                                :columns="column2"
                                                rowId="id"
                                                rowName="userName"
                                                :query="queryData"
                                                :multiple="true"
                                                :defaultCheckbox="data.defaultCheckbox1"
                                                @on-select="handleCheckSelect">
                                    <template #query>
                                        <Input v-model.trim="queryData.userName" placeholder="姓名:" icon="ios-search" @on-enter="handleQuery" @on-click="handleQuery" style="margin: 12px;width: 230px"/>
                                    </template>
                                </bmsa-drop-grid>
                                {{data.defaultCheckbox1}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="单选根据数据集回显" prop="defaultRadio2" label-for="defaultRadio2">
                                <bmsa-drop-grid :apiList="api.getList"
                                                :columns="column3"
                                                :isDefaultGather="true"
                                                rowId="id"
                                                rowName="userName"
                                                :defaultRadio="data.defaultRadio2"
                                                @on-select="handleRadioSelect2">
                                </bmsa-drop-grid>
                                {{data.defaultRadio2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="多选根据数据集回显" prop="defaultCheckbox2" label-for="defaultCheckbox2">
                                <bmsa-drop-grid :apiList="api.getList"
                                                :columns="column4"
                                                :isDefaultGather="true"
                                                rowId="id"
                                                rowName="userName"
                                                :multiple="true"
                                                :defaultCheckbox="data.defaultCheckbox2"
                                                @on-select="handleCheckSelect2">
                                </bmsa-drop-grid>
                                {{data.defaultCheckbox2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-form>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、下拉表格必须传入api方法接口和columns，接口根据分页查询，数据返回格式是data[rows:{}]</p>
                    <p style="margin-top: 12px">2、组件必须传入rowId属性，即代表数据唯一的字段(默认是id字段)</p>
                    <p style="margin-top: 12px">3、组件必须传入rowName属性，即代表数据显示的字段(默认是name字段)</p>
                    <p style="margin-top: 12px">4、选中数据时监听on-select方法获取选中的数据，没有v-model，所有选中、全选、取消全选、删除都会走on-select</p>
                    <p style="margin-top: 12px">5、回显时根据isDefaultGather属性来判断是根据rowId绑定的字段进行回显还是自定义数据集回显，默认是根据
                        rowId绑定的字段进行回显，例如：多选：[670, 671, 672, 661]，根据数据集回显性能更好，要求数据集中必须有rowId和rowName绑定的字段</p>
                    <p style="margin-top: 12px">6、multiple属性为true代表多选、false代表单选，默认是false，单选时回显属性是defaultRadio，
                        多选时回显属性是defaultCheckbox</p>
                    <p style="margin-top: 12px">7、提供slot='query'插槽进行数据据查询，需要自定义查询区域，传入的查询属性是query，点击查询后执行
                        组件里的getData方法</p>
                    <p style="margin-top: 12px">8、校验时，在on-select方法执行后，自行触发下组件校验，this.$refs.form.$refs.form.validateField('defaultRadio1')</p>
                    <Divider>具体使用情况如上面四个例子</Divider>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    import Api from '@/api/demo';
    export default {
        name: 'bmsa-drop-grid-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                api: Api,
                data: {
                    defaultRadio1: 2, // radio选中的数据
                    defaultRadio2: { id: 2, userName: '王五'},
                    defaultCheckbox1: [ 1, 3, 4, 11 ], // check选中的数据
                    defaultCheckbox2: [
                        {id: 2, userName: '王五'},
                        {id: 11, userName: 'Test11 '}
                    ],
                },
                queryData: {
                    userName: ''
                },
                column1: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column2: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column3: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column4: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                query: {
                    col: 1,
                    labelWidth: 160,
                    button: false
                },
                rules: {
                    defaultRadio1: [
                        {required: true, type: 'number', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultRadio2: [
                        {required: true, type: 'object', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultCheckbox1: [
                        {required: true, type: 'array', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultCheckbox2: [
                        {required: true, type: 'array', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                }
            }
        },
        computed: {},
        methods: {
            // 单选
            handleRadioSelect (row) {
                if (JSON.stringify(row) == '{}') {
                    this.data.defaultRadio1 = null
                } else {
                    this.data.defaultRadio1 = row.id
                }
                this.$refs.form.$refs.form.validateField('defaultRadio1')
            },
            // 单选2
            handleRadioSelect2 (row) {
                if (JSON.stringify(row) == '{}') {
                    this.data.defaultRadio2 = null
                } else {
                    this.data.defaultRadio2 = row
                }
                this.$refs.form.$refs.form.validateField('defaultRadio2')
            },
            // 多选
            handleCheckSelect (rows) {
                this.data.defaultCheckbox1 = []
                if (rows && rows.length) {
                    rows.forEach(item => {
                        this.data.defaultCheckbox1.push(item.id)
                    })
                } else {
                    this.data.defaultCheckbox1 = []
                }
                this.$refs.form.$refs.form.validateField('defaultCheckbox1')
            },
            // 多选2
            handleCheckSelect2 (rows) {
                this.data.defaultCheckbox2 = []
                if (rows && rows.length) {
                    this.data.defaultCheckbox2 = rows
                } else {
                    this.data.defaultCheckbox2 = []
                }
                this.$refs.form.$refs.form.validateField('defaultCheckbox2')
            },
            // 查询
            handleQuery () {
                this.$refs.xDrop.getData()
            }
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less">
</style>
