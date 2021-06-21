<template>
    <div class="content-inner">
        <Card>
            单据页：{{id}}
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-quill-demo2',
        components: {
        },
        data () {
            return {
                id: ''
            }
        },
        computed: {},
        created () {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
            } else if (this.$route.query.id) {
                this.id = this.$route.query.id
            }
        },
        mounted () {
        },
        methods: {
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
