<template>
    <div>
    
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'bing-chat',
        data() {
            return {}
        },
        props: {
            newData: {
                type: Object
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.getIssue()
        },
        computed: {
            ...mapState('admin/layout', [
                'issueShow',
                'issueWidth'
            ]),
            $user() { // 获取当前登陆人信息
                return this.$store.state.admin.user.info.data
            }
        },
        methods: {}
    }
</script>
<style lang="less">
</style>
