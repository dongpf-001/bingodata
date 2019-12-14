<template>
    <div class="ivu-card index-modular">
        <div class="ivu-card-head">ETMS任务</div>
        <div class="ivu-card-extra"><div class="ivu-dropdown-rel"><i class="ivu-icon ivu-icon-ios-options"></i><span>更多视图</span><i class="ivu-icon ivu-icon-ios-arrow-down"></i></div></div>
        <div class="ivu-card-body" :style="widths>1440?'max-height: 600px;height:'+(topHeight+160) + 'px': ''">
            <div class="index-modular-listbox">
                <ul>
                    <li v-for="(item, key) in etmsTask" :key="key">
                        <div class="index-task-card">
                            <div class="title"><span class="red-lamp"></span><a href="#">{{item.a}}</a></div>
                            <div class="class">{{item.b}}</div>
                            <div class="text">{{item.c}}</div>
                            <div class="bottom-div">
                                <div class="date"><i class="ivu-icon ivu-icon-ios-calendar-outline"></i>{{item.d}}</div>
                                <div class="user"><img src="../../../assets/images/user.jpg"/><span>{{item.e}}</span></div>
                            </div>
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
        components: {
        },
        props: {
            widths: Number,
            topHeight:  {
                type: Number
            },
        },
        data () {
            return {
                etmsTask: [
                    {
                        a: '2019XMHT',
                        b: 'BPM',
                        c: 'ISO-TP通信记录',
                        d: '2019-10-09',
                        e: '张三'
                    },
                    {
                        a: '2019XMHT',
                        b: 'BPM',
                        c: 'ISO-TP通信记录',
                        d: '2019-10-09',
                        e: '李四'
                    },
                    {
                        a: '2019XMHT',
                        b: 'BPM',
                        c: 'ISO-TP通信记录',
                        d: '2019-10-09',
                        e: '王五'
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

<style>
</style>
