<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    <bingo-toolbar :showDelete="false">
                        <template slot="toolbar">
                            <Button type='primary' icon='md-trash' style="margin-left: 6px">自定义</Button>
                        </template>
                    </bingo-toolbar>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、默认显示新建、删除、刷新按钮</p>
                    <p style="margin-top: 12px">2、showAllButton属性代表是否显示隐藏所有默认按钮</p>
                    <p style="margin-top: 12px">3、disabledNew、disabledDelete、disabledRefresh分别代表设置新建、删除、刷新不可用</p>
                    <p style="margin-top: 12px">4、showNew、showDelete、showRefresh、showOpenButton分别代表设置新建、删除、刷新、全屏显示隐藏</p>
                    <p style="margin-top: 12px">5、插槽toolbar可自定义按钮</p>
                    <p style="margin-top: 12px">6、open-full-modal自定义全屏事件</p>
                </div>
            </Split>
        </Card>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                split1: 0.2,
            };
        },
        components: {},
        created() {
        },
        mounted() {

        },
        computed: {},
        watch: {},
        methods: {
        }
    };
</script>
<style>

</style>
