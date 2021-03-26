<template>
    <div class="ivu-card index-modular">
        <div class="ivu-card-head">专业</div>
        <div class="ivu-card-extra">
            <div class="ivu-dropdown-rel"><i class="ivu-icon ivu-icon-ios-options"></i><span>更多视图</span><i
                    class="ivu-icon ivu-icon-ios-arrow-down"></i></div>
        </div>
        <div class="ivu-card-body" :style="widths>1440?'height:'+(topHeight+60) + 'px': ''"
             style="overflow: hidden;overflow-y: auto;">
            <div class="index-modular-listbox">
                <ul>
                    <li v-for="(item, key) in professional" :key="key">
                        <div class="index-major">
                            <div class="car">
                                <img src="../../../assets/images/car1.jpg" style="margin: 0 auto;"/>
                                <div class="class">{{item.car}}</div>
                            </div>
                            <div class="title">
                                <span :class="item.class">
                                    <i class="ivu-icon ivu-icon-md-car"></i>
                                </span>{{item.title}}
                            </div>
                            <div class="date"><i class="ivu-icon ivu-icon-ios-calendar-outline"></i>{{item.date}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index-card',
        components: {},
        props: {
            widths: {
                type: Number,
                default: 1450
            },
            topHeight: {
                type: Number
            }
        },
        data() {
            return {
                professional: [
                    {
                        car: '地盘',
                        title: 'TPB checklist',
                        date: '2019-10-09',
                        class: 'icon bg-green'
                    },
                    {
                        car: '发动机',
                        title: 'EPG试验报告',
                        date: '2019-10-09',
                        class: 'icon bg-red'
                    },
                    {
                        car: '车窗',
                        title: '重量数据管理',
                        date: '2019-10-09',
                        class: 'icon bg-red'
                    },
                    {
                        car: '地盘',
                        title: 'TPB checklist',
                        date: '2019-10-09',
                        class: 'icon bg-red'
                    }
                ]
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>
</style>
