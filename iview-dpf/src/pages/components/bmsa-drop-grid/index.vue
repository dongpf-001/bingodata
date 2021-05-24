<template>
    <Card class="content-inner">
        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                    ref="form" :button="query.button">
            <bingo-grid-item>
                <bingo-form-item label="单选" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api" :columns="column"
                                    rowName="carVin"
                                    :defaultRadioId="defaultRadio"
                                    @on-select="handleRadioSelect">
                    </bmsa-drop-grid>
                </bingo-form-item>
            </bingo-grid-item>
            <bingo-grid-item>
                <bingo-form-item label="多选" prop="type" label-for="type">
                    <bmsa-drop-grid :api="api" :columns="column2"
                                    rowName="carVin"
                                    :multiple="true"
                                    :defaultCheckbox="defaultCheckbox"
                                    @on-select="handleCheckSelect">
                    </bmsa-drop-grid>
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
                column: [
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
                query: {
                    col: 2,
                    labelWidth: 90,
                    button: false
                },
                defaultRadio: 671, // radio选中的数据
                defaultCheckbox: [671, 672], // check选中的数据
            }
        },
        computed: {},
        methods: {
            // 单选
            handleRadioSelect (row) {
                if (JSON.stringify(row) == '{}') {
                    this.defaultRadio = null
                } else {
                    this.defaultRadio = row.id
                }
            },
            // 多选
            handleCheckSelect (rows) {
                this.defaultCheckbox = []
                if (rows && rows.length) {
                    rows.forEach(item => {
                        this.defaultCheckbox.push(item.id)
                    })
                } else {
                    this.defaultCheckbox = []
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
