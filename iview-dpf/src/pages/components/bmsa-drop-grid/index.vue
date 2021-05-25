<template>
    <Card class="content-inner">
        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                    ref="form" :button="query.button">
            <bingo-grid-item>
                <bingo-form-item label="单选根据字段回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column1"
                                    rowId="id"
                                    rowName="carVin"
                                    :defaultRadio="defaultRadio1"
                                    @on-select="handleRadioSelect">
                    </bmsa-drop-grid>
                    {{defaultRadio1}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="多选根据字段回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column2"
                                    rowId="id"
                                    rowName="carVin"
                                    :multiple="true"
                                    :defaultCheckbox="defaultCheckbox1"
                                    @on-select="handleCheckSelect">
                    </bmsa-drop-grid>
                    {{defaultCheckbox1}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="单选根据数据集回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column3"
                                    :isDefaultGather="true"
                                    rowId="id"
                                    rowName="carVin"
                                    :defaultRadio="defaultRadio2"
                                    @on-select="handleRadioSelect2">
                    </bmsa-drop-grid>
                    {{defaultRadio2}}
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="多选根据字段回显" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api"
                                    :columns="column4"
                                    :isDefaultGather="true"
                                    rowId="id"
                                    rowName="carVin"
                                    :multiple="true"
                                    :defaultCheckbox="defaultCheckbox2"
                                    @on-select="handleCheckSelect2">
                    </bmsa-drop-grid>
                    {{defaultCheckbox2}}
                </bingo-form-item>
            </bingo-grid-item>
        </bingo-form>
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
                data: {},
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
                    labelWidth: 150,
                    button: false
                },
                defaultRadio1: 661, // radio选中的数据
                defaultRadio2: { id: 672, carVin: '141DB6437C56'},
                defaultCheckbox1: [670, 671, 672, 661], // check选中的数据
                defaultCheckbox2: [
                    {id: 673, carVin: 'A7E5134FAE6B'},
                    {id: 659, carVin: 'A209623A8B0E'}
                ]
            }
        },
        computed: {},
        methods: {
            // 单选
            handleRadioSelect (row) {
                if (JSON.stringify(row) == '{}') {
                    this.defaultRadio1 = null
                } else {
                    this.defaultRadio1 = row.id
                }
            },
            // 单选2
            handleRadioSelect2 (row) {
                if (JSON.stringify(row) == '{}') {
                    this.defaultRadio2 = {}
                } else {
                    this.defaultRadio2 = row
                }
            },
            // 多选
            handleCheckSelect (rows) {
                this.defaultCheckbox1 = []
                if (rows && rows.length) {
                    rows.forEach(item => {
                        this.defaultCheckbox1.push(item.id)
                    })
                } else {
                    this.defaultCheckbox1 = []
                }
            },
            // 多选2
            handleCheckSelect2 (rows) {
                this.defaultCheckbox2 = []
                if (rows && rows.length) {
                    this.defaultCheckbox2 = rows
                } else {
                    this.defaultCheckbox2 = []
                }
            },
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less" scoped>
</style>
