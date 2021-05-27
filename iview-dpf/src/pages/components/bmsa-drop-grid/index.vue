<template>
    <Card class="content-inner">
        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                    ref="form" :button="query.button" :rules="rules">
            <bingo-grid-item>
                <bingo-form-item label="单选根据字段回显" prop="defaultRadio1" label-for="defaultRadio1">
                    <bmsa-drop-grid :api="api"
                                    :columns="column1"
                                    rowId="id"
                                    rowName="carVin"
                                    :defaultRadio="data.defaultRadio1"
                                    @on-select="handleRadioSelect">
                    </bmsa-drop-grid>
                    {{data.defaultRadio1}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="多选根据字段回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    ref="xDrop"
                                    :columns="column2"
                                    rowId="id"
                                    rowName="carVin"
                                    :query="queryData"
                                    :multiple="true"
                                    :defaultCheckbox="data.defaultCheckbox1"
                                    @on-select="handleCheckSelect">
                        <template #query>
                            <Input v-model.trim="queryData.carVin" placeholder="VIN:" icon="ios-search" @on-enter="handleQuery" @on-click="handleQuery" style="margin: 12px;width: 230px"/>
                        </template>
                    </bmsa-drop-grid>
                    {{data.defaultCheckbox1}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="单选根据数据集回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column3"
                                    :isDefaultGather="true"
                                    rowId="id"
                                    rowName="carVin"
                                    :defaultRadio="data.defaultRadio2"
                                    @on-select="handleRadioSelect2">
                    </bmsa-drop-grid>
                    {{data.defaultRadio2}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="多选根据数据集回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column4"
                                    :isDefaultGather="true"
                                    rowId="id"
                                    rowName="carVin"
                                    :multiple="true"
                                    :defaultCheckbox="data.defaultCheckbox2"
                                    @on-select="handleCheckSelect2">
                    </bmsa-drop-grid>
                    {{data.defaultCheckbox2}}
                </bingo-form-item>
            </bingo-grid-item>
        </bingo-form>
        <Divider>详细描述</Divider>
        <h3>使用注意事项</h3>
        <p style="margin-top: 12px">1、下拉表格必须传入api和columns，且api接口名称必须叫getList，接口根据分页查询，数据返回格式是data[rows:{}]</p>
        <p style="margin-top: 12px">2、组件必须传入rowId属性，即代表数据唯一的字段(默认是id字段)</p>
        <p style="margin-top: 12px">3、组件必须传入rowName属性，即代表数据显示的字段(默认是name字段)</p>
        <p style="margin-top: 12px">4、选中数据时监听on-select方法获取选中的数据，没有v-model，所有选中、全选、取消全选、删除都会走on-select</p>
        <p style="margin-top: 12px">5、回显时根据isDefaultGather属性来判断是根据rowId绑定的字段进行回显还是自定义数据集回显，默认是根据
            rowId绑定的字段进行回显，例如：多选：[670, 671, 672, 661]，根据数据集回显性能更好，要求数据集中必须有rowId和rowName绑定的字段</p>
        <p style="margin-top: 12px">6、multiple属性为true代表多选、false代表单选，默认是false，单选时回显属性是defaultRadio，
            多选时回显属性是defaultCheckbox</p>
        <p style="margin-top: 12px">7、提供slot='query'插槽进行数据据查询，需要自定义查询区域，传入的查询属性是query，点击查询后执行
            组件里的getData方法</p>
        <Divider>具体使用情况如上面四个例子</Divider>
    </Card>
</template>
<script>
    import Api from '@/api/demo';
    import bmsaDropGrid from '@/components/bmsa-drop-grid'
    export default {
        name: 'bmsa-drop-grid-demo',
        components: {
            bmsaDropGrid
        },
        data () {
            return {
                api: Api,
                data: {
                    defaultRadio1: 661, // radio选中的数据
                    defaultRadio2: { id: 672, carVin: '141DB6437C56'},
                    defaultCheckbox1: [670, 671, 672, 661], // check选中的数据
                    defaultCheckbox2: [
                        {id: 673, carVin: 'A7E5134FAE6B'},
                        {id: 659, carVin: 'A209623A8B0E'}
                    ],
                },
                queryData: {
                    carVin: ''
                },
                column1: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'carVin', title: 'VIN', width: 200 },
                    { field: 'carTypeName', title: '车型', width: 150 },
                    { field: 'configName', title: '配置', width: 100 },
                    { field: 'colorName', title: '颜色', width: 120 },
                    { field: 'colorCode', title: '颜色编码', width: 130 },
                    { field: 'orderNo', title: '订单号', width: 180 },
                    { field: 'orderType', title: '订单类型', width: 120 },
                ],
                column2: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'carVin', title: 'VIN', width: 200 },
                    { field: 'carTypeName', title: '车型', width: 150 },
                    { field: 'configName', title: '配置', width: 100 },
                    { field: 'colorName', title: '颜色', width: 120 },
                    { field: 'colorCode', title: '颜色编码', width: 130 },
                    { field: 'orderNo', title: '订单号', width: 180 },
                    { field: 'orderType', title: '订单类型', width: 120 },
                ],
                column3: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'carVin', title: 'VIN', width: 200 },
                    { field: 'carTypeName', title: '车型', width: 150 },
                    { field: 'configName', title: '配置', width: 100 },
                    { field: 'colorName', title: '颜色', width: 120 },
                    { field: 'colorCode', title: '颜色编码', width: 130 },
                    { field: 'orderNo', title: '订单号', width: 180 },
                    { field: 'orderType', title: '订单类型', width: 120 },
                ],
                column4: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'carVin', title: 'VIN', width: 200 },
                    { field: 'carTypeName', title: '车型', width: 150 },
                    { field: 'configName', title: '配置', width: 100 },
                    { field: 'colorName', title: '颜色', width: 120 },
                    { field: 'colorCode', title: '颜色编码', width: 130 },
                    { field: 'orderNo', title: '订单号', width: 180 },
                    { field: 'orderType', title: '订单类型', width: 120 },
                ],
                query: {
                    col: 2,
                    labelWidth: 160,
                    button: false
                },
                rules: {
                    defaultRadio1: [
                        {required: true, type: 'number', message: $t('page.common.noEmpty'), trigger: 'change'},
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
            },
            // 单选2
            handleRadioSelect2 (row) {
                if (JSON.stringify(row) == '{}') {
                    this.data.defaultRadio2 = {}
                } else {
                    this.data.defaultRadio2 = row
                }
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
            },
            // 多选2
            handleCheckSelect2 (rows) {
                this.data.defaultCheckbox2 = []
                if (rows && rows.length) {
                    this.data.defaultCheckbox2 = rows
                } else {
                    this.data.defaultCheckbox2 = []
                }
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
    /*滚动条整体部分*/
    .bmsa-table ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    /*滚动条的轨道*/
    .bmsa-table ::-webkit-scrollbar-track {
        background-color: #FFFFFF;
    }
    /*滚动条里面的小方块，能向上向下移动*/
    .bmsa-table ::-webkit-scrollbar-thumb {
        background-color: #bfbfbf;
        border-radius: 5px;
        border: 1px solid #F1F1F1;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    .bmsa-table ::-webkit-scrollbar-thumb:hover {
        background-color: #A8A8A8;
    }
    .bmsa-table ::-webkit-scrollbar-thumb:active {
        background-color: #787878;
    }
    /*边角，即两个滚动条的交汇处*/
    .bmsa-table ::-webkit-scrollbar-corner {
        background-color: #FFFFFF;
    }
</style>
