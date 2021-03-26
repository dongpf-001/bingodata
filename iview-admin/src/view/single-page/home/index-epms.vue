<template>
    <Card class="index-card" :class="[ widths>1440 ? 'index-card-col' : 'index-card-col3']" style="height: 140px">
        <div class="index-card-body" :class="[ widths>1440 ? 'index-card-body1' : 'index-card-body3']">
            <div class="card-title2">
                <p class="big-title">{{toDo.bigTitle}}</p>
                {{toDo.title}}
            </div>
            <div class="chart2" style="text-align: center">
                <p>
                    <span class="num"><span class="red">{{toDo.number}}</span>个</span>
                    <span class="link" :class="{ 'chart2-card3': widths>1440 }"><a href="#">{{toDo.url}}</a></span>
                </p>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: 'index-card',
        components: {},
        props: {
            widths: Number
        },
        data() {
            return {
                // 科长
                toDo: { // 待办任务数量
                    bigTitle: 'EPMS',
                    title: '待办任务数量',
                    url: '点击查询详情',
                    number: '33'
                }
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>
    .chart2-card3 {
        height: 35px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
