<template>
    <Card dis-hover class="splitTemplate-wrapper">
        <div class="demo-split" :style="'height:' + bodyHeight + 'px'">
            <Split v-model="split">
                <div slot="left" class="demo-split-pane">
                    <!-- 组件 -->
                    <slot name="components"></slot>
                    <Divider orientation="left" style="margin-top: 50px">属性介绍</Divider>
                    <slot name="describe"></slot>
                </div>
                <div slot="right" class="demo-split-pane split-pane-div">
                    <Tooltip content="复制" class="split-pane-tip">
                        <Icon type="md-copy" @click="handleCopy" size="22"/>
                    </Tooltip>
                    <Tooltip content="在线编辑" class="split-pane-tip2">
                        <span>
                            <Icon type="md-code-working" @click="goRun" size="22"/>
                        </span>
                    </Tooltip>
                    <pre v-highlight class="split-templte-pre">
                        <code>{{html}}</code>
                    </pre>
                </div>
            </Split>
        </div>
    </Card>
</template>
<script>
    export default {
        name: 'splitTemplate',
        props: {
            split: { // 控制所占的区域比例
                type: Number,
                default: 0.5
            },
            html: { // copy的html
                type: String,
                default: ''
            },
            codeTemplate: { // 在线编辑时的代码模板
                type: String,
                default: ''
            },
            bodyHeight: { // 内容区域高度
                type: Number,
                default: 180
            }
        },
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            handleCopy () { // 复制方法
                const copyHtml = this.html
                this.$Copy({
                    text: copyHtml
                })
            },
            goRun () { // 打开在线编辑功能
                const { href } = this.$router.resolve({
                    path: '/bingo-run',
                    query: {
                        templateName: this.codeTemplate
                    }
                });
                window.open(href, '_blank');
            }
        },
        mounted () {
        }
    }
</script>
<style lang="less">
    .splitTemplate-wrapper {
        margin-bottom: 16px
    }
    .split-pane-div {
        width: 100%;
        position: relative;
    }
    .split-pane-tip {
        position: absolute;
        right: 0;
    }
    .split-pane-tip2 {
        position: absolute;
        right: 30px;
    }
    .split-templte-pre {
        margin: 0!important;
        margin-left: 16px!important;
    }
</style>
