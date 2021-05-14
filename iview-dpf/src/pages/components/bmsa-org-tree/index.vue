<template>
    <div class="content-inner">
        <bmsa-org-tree :data="data"></bmsa-org-tree>
    </div>
</template>
<script>
    import bmsaOrgTree from '@/components/bmsa-org-tree'
    export default {
        name: 'bmsa-org-tree-demo',
        components: {
            bmsaOrgTree
        },
        data () {
            return {
                data: {
                    id: 0,
                    label: 'XXX科技有限公司',
                    name: '张三',
                    children: [
                        {
                            id: 2,
                            label: '产品研发部',
                            name: '李四',
                            children: [
                                {
                                    id: 5,
                                    label: '研发-前端'
                                }, {
                                    id: 6,
                                    label: '研发-后端'
                                }, {
                                    id: 9,
                                    label: 'UI设计'
                                }, {
                                    id: 10,
                                    label: '产品经理'
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: '销售部',
                            children: [
                                {
                                    id: 7,
                                    label: '销售一部'
                                }, {
                                    id: 8,
                                    label: '销售二部'
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: '财务部'
                        }, {
                            id: 11,
                            label: 'HR人事'
                        }
                    ]
                },
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
</style>
