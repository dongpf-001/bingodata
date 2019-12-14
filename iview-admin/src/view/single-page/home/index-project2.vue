<template>
    <div class="ivu-card index-modular index-margin">
        <div class="ivu-card-head">参与的项目</div>
        <div class="ivu-card-extra"><div class="ivu-dropdown-rel"><i class="ivu-icon ivu-icon-ios-options"></i><span>更多视图</span><i class="ivu-icon ivu-icon-ios-arrow-down"></i></div></div>
        <div class="ivu-card-body">
            <div class="index-modular-listbox">
                <ul>
                    <li v-for="(item, key) in projectInfo2" :key="key">
                        <div class="index-project">
                            <div class="information">
                                <div class="logo"><img src="../../../assets/images/audi.png" style="margin: 0 auto;"/></div>
                                <div class="information-right">
                                    <div class="title" :class="widths>1440? '' : 'title2'">
                                        <span class="red-lamp"></span>{{item.title}}
                                    </div>
                                    <div class="text" :class="widths>1440? '' : 'text2'">{{item.text}}</div>
                                    <div class="bar"><Progress :percent="item.percent" :stroke-width="7" status="active"></Progress></div>
                                </div>
                            </div>
                            <div class="state" :class="widths>1440? '' : 'state2'">
                                <div :class="widths>1020? 'state-circle' : 'state-circle1'">
                                    <i class="ivu-icon ivu-icon-ios-checkmark-circle" style="font-size: 24px; float: left;"></i>
                                    <span style="line-height: 25px;">{{item.plan}}</span>
                                </div>
                                <div :class="widths>1020? 'state-milepost' : 'state-milepost1'">
                                    <div class="milepost"><span>LF</span></div>
                                    <span>{{item.lf}}</span>
                                </div>
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
            widths:  {
                type: Number,
                default: 1450
            },
        },
        data () {
            return {
                projectInfo2: [ // 项目区域
                    {
                        title: 'SVW361',
                        text: 'NCS',
                        percent: 42,
                        plan: '项目主计划',
                        lf: '里程碑'
                    },
                    {
                        title: 'Ab571/1',
                        text: 'AudiX 20年第二次年型',
                        percent: 49,
                        plan: '项目主计划',
                        lf: '里程碑'
                    }
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
    .title2 {
        height: 25px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .state2 {
        height: 28px!important;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .text2 {
        height: 20px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .state-circle {
        float: right; position: relative; top: -2px;
    }
    .state-circle1 {
        position: relative; top: -2px;
    }
    .state-milepost {
        float: right;
    }
    .state-milepost1 span {
        margin-right: 0!important;
    }
</style>
