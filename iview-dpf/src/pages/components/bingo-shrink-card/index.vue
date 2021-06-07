<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-shrink-card height="300">
                        <span slot="icon">
                            <Icon type="md-close"/>
                        </span>
                        <div style="height: 100%">
                            ------------one
                            <Card class="ivu-mb-8" style="height: calc(100% - 20px)">
                                我想要带动画的显示和隐藏
                            </Card>
                        </div>
                    </bingo-shrink-card>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、title属性代表标题，icon插槽代表title的图标</p>
                    <p style="margin-top: 12px">2、showFullButton属性代表是否显示全屏</p>
                    <p style="margin-top: 12px">2、height属性代表卡片的高度</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-shrink-card-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
            }
        },
        computed: {},
        methods: {
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less">
</style>
