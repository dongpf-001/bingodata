<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-state>
                    
                    </bingo-state>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、showSelectAll代表是否全选，多选的时候可开启此功能</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-state-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
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
