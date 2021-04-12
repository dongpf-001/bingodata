<template>
    <div class="content-inner">
        <bmsa-table></bmsa-table>
    </div>
</template>
<script>
    import bmsaTable from '@/components/bmsa-table'
    export default {
        name: 'demo-table',
        components: {
            bmsaTable
        },
        data () {
            return {
            }
        },
        computed: {},
        created () {},
        mounted () {},
        methods: {}
    };
</script>
<style lang="less" scoped>
    .demo-table {
        width: 100%;
        height: 100%;
    }
</style>
