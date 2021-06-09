<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-head-photo :list="list"></bingo-head-photo>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、list为数据源，数组形式，用到的有三个属性：tip、src、gesch。例如：[{tip: '张三',gesch: 1, src: 'http://'}]</p>
                    <p style="margin-top: 12px">2、max为头像最多显示的个数，默认是3</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-head-photo-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                list: [
                    {
                        tip: '张三',
                        gesch: 1
                    },
                    {
                        tip: '李四',
                        gesch: 2
                    },
                    {
                        tip: '王五',
                        gesch: 1,
                        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar'
                    },
                    {
                        tip: '赵六',
                        gesch: 1
                    },
                    {
                        tip: '马七',
                        gesch: 2
                    }
                ]
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
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
</style>
