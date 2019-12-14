<template>
    <div class="ivu-card index-modular index-margin">
        <div class="ivu-card-head">推荐</div>
        <div class="ivu-card-extra"><div class="ivu-dropdown-rel"><Icon type="md-refresh" /></div></div>
        <div class="ivu-card-body ivu-card-body-hei">
            <div class="index-modular-list-border">
                <ul>
                    <li v-for="(item, key) in recommend" :key="key">
                        <div class="index-recommend">
                            <div class="icon"><i class="iconfont iconexcel1"></i></div>
                            <div class="right">
                                <div class="title" v-html="item.attachName"></div>
                                <div class="text" v-html="item.attachURL"><i class="iconfont iconlingxing"></i></div>
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
        },
        data () {
            return {
                recommend: [ // 推荐区域
                    {
                        attachName: '未来<span style="color: #cb333b;">X车</span>型项目-项目周报',
                        attachURL: '<span style="color: #cb333b;">X车</span>型项目6周项目月报'
                    },
                    {
                        attachName: '未来<span style="color: #cb333b;">X车</span>型项目-项目月报',
                        attachURL: '<i class="iconfont iconlingxing"></i><span style="color: #cb333b;">X车</span>型项目6月项目月报'
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
    .ivu-card-body-hei {
        max-height: 220px;
        overflow: auto;
    }
</style>
