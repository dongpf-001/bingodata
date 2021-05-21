<template>
    <Card class="content-inner">
        <bmsa-drop-grid :api="api" :columns="column">
        </bmsa-drop-grid>
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
                column: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'carVin', title: 'VIN', width: 200 },
                    { field: 'carTypeName', title: '车型', width: 150 },
                    { field: 'configName', title: '配置', width: 100 },
                    { field: 'colorName', title: '颜色', width: 120 },
                    { field: 'colorCode', title: '颜色编码', width: 130 },
                    { field: 'orderNo', title: '订单号', width: 180 },
                    { field: 'orderType', title: '订单类型', width: 120 },
                ]
            }
        },
        computed: {},
        methods: {
        },
        created () {},
        mounted () {
            debugger
        },
    };
</script>
<style lang="less" scoped>
</style>
