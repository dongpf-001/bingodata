<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                   <bingo-select-icon :showValue="showValue"></bingo-select-icon>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、showValue属性为组件选中的内容，model代表选中的类型，type代表选中的icon、icon-font图标，before和after
                    代表选中的svg图标</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-select-icon-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                showValue: {
                    model: 'icon',
                }
            }
        },
        computed: {},
        created () {},
        mounted () {},
        methods: {
        }
    };
</script>
<style lang="less" scoped>
</style>
