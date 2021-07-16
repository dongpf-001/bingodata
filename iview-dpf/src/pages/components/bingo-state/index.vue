<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Divider>下拉选框</Divider>
                    <bingo-state type="select" v-model="states1" :size="22"></bingo-state>
                    {{states1}}
                    <Divider style="margin-top: 70px">鼠标滑入选择</Divider>
                    <bingo-state v-model="states2" :size="22"></bingo-state>
                    {{states2}}
                    <Divider style="margin-top: 70px">纵向选择形式</Divider>
                    <bingo-state type="vertical" v-model="states3" title="SSS" :size="30"></bingo-state>
                    {{states3}}
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、type代表组件类型，不写的话默认是鼠标划入选择形式，为select时是下拉选择形式，为vertical
                    时是纵向选择形式</p>
                    <p style="margin-top: 12px">2、states为状态灯的数据源，默认是红、黄、绿、红黄，可自定义传入</p>
                    <p style="margin-top: 12px">3、size代表灯的大小</p>
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
                states1: 'yellow',
                states2: 'yellow',
                states3: '',
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
