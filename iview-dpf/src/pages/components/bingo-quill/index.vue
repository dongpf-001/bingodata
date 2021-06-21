<template>
    <div class="content-inner">
        <Card>
            <Button style="margin-right: 15px" @click="edit(1)">编辑</Button>
            <Button style="margin-right: 15px" @click="edit(2, true)">新窗口</Button>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-quill-demo',
        components: {
        },
        data () {
            return {
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            edit (id, type) {
                let params={
                    id: id
                }
                let query = {}
                if(type){  //新标签页打开
                    query = {
                        id: id
                    }
                }
                this.$router.push({ name: 'billPage', params: params, query: query })
            }
        }
    };
</script>
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
</style>
