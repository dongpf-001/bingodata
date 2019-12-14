<template>
    <div class="ivu-card index-modular index-task">
        <div class="ivu-card-head">任务列表</div>
        <div class="ivu-card-extra"><div class="ivu-dropdown-rel"><span style="padding-right: 10px;">全部任务 | 我负责的任务</span><i class="ivu-icon ivu-icon-ios-options"></i><span>更多视图</span><i class="ivu-icon ivu-icon-ios-arrow-down"></i></div></div>
        <div class="ivu-card-body">
            <Row :gutter="16">
                <i-col :span="widths>1440 ? 12 : 24" v-for="(item, key) in taskContext2" :key="key" :class="{ 'ivu-card-body-col': widths<=1440 }">
                    <div class="ivu-card index-task-list">
                        <div class="ivu-card-head">
                            {{item.state}}<span class="num"><span class="color-red">1</span> / <span class="color-green">1</span> / <span class="color-yellow">1</span> , 共{{item.number}}项</span>
                            <Progress :percent="45" :stroke-width="7" status="active"></Progress>
                        </div>
                        <div class="ivu-card-body" :style="widths>1440?'max-height: 600px;height:'+(topHeight) + 'px': ''"
                             style="overflow: hidden;overflow-y: auto;">
                            <div class="index-modular-listbox">
                                <ul>
                                    <li v-for="(item2, key) in item.context" :key="key">
                                        <div class="index-task-card">
                                            <div class="title"><span class="red-lamp"></span><a href="#">{{item2.a}}</a></div>
                                            <div class="class" :class="widths>1440? 'class1' : ''">{{item2.b}}</div>
                                            <div class="text">{{item2.c}}</div>
                                            <div class="bottom-div">
                                                <div class="date"><i class="ivu-icon ivu-icon-ios-calendar-outline"></i>{{item2.d}}</div>
                                                <div class="user"><img src="../../../assets/images/user.jpg"/><span>{{item2.e}}</span></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index-card',
        components: {
        },
        props: {
            widths:  {
                type: Number,
                default: 1450
            },
            span: {
                type: [Function, String, Number],
            },
            topHeight:  {
                type: Number
            },
            taskContext: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                taskContext2: [ // 内容
                    {
                        state: '已延期',
                        number: '1',
                        context: [
                            {
                                a: '2019XMHT',
                                b: '整车交付文档',
                                c: 'ISO-TP通信记录',
                                d: '2019-10-09',
                                e: '张三'
                            },
                        ]
                    },
                    {
                        state: '进行中',
                        number: '3',
                        context: [
                            {
                                a: '2019XMHT',
                                b: '整车交付文档',
                                c: 'ISO-TP通信记录',
                                d: '2019-10-09',
                                e: '张三'
                            },
                            {
                                a: '2019XMHT',
                                b: '整车交付文档',
                                c: 'ISO-TP通信记录',
                                d: '2019-10-09',
                                e: '张三'
                            },
                            {
                                a: '2019XMHT',
                                b: '整车交付文档',
                                c: 'ISO-TP通信记录',
                                d: '2019-10-09',
                                e: '张三'
                            },
                        ]
                    },
                ],
            };
        },
        mounted () {
        },
        methods: {
        }
    };
</script>

<style scoped>
</style>
