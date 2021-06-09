<!--
    iview原生头像组件不好扩展
    从新开发
-->
<template>
    <div>
        <span class="head-photo-wrapper" v-for="(item, key) in list" :key="key" v-if="key<=max">
            <Tooltip :content="item.tip" transfer v-if="key<max" :max-width="100">
                <Avatar :src="item.src" v-if="item.src && item.src!=''"></Avatar>
                <Avatar v-else-if="item.gesch == '1' || item.gesch == '男'">
                    <svg aria-hidden="true" width="41px" height="41px" style="margin-top: -7px;margin-left: -3px;">
                        <use xlink:href="#iconuser-boy-copy" width="100%"></use>
                    </svg>
                </Avatar>
                <Avatar v-else>
                    <svg aria-hidden="true" width="41px" height="41px" style="margin-top: -7px;margin-left: -3px;">
                        <use xlink:href="#iconuser-girl-copy" width="100%"></use>
                    </svg>
                </Avatar>
            </Tooltip>
            <Tooltip :content="label" transfer v-else :max-width="100">
                <Avatar>+{{list.length-max}}</Avatar>
            </Tooltip>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'bingo-head-photo',
        data () {
            return {
                label: ''
            }
        },
        components: {
        },
        props: {
            list: { // 数据源
                type: Array,
                default: () => {
                    return []
                }
            },
            max: { // 头像最多显示的个数，超出的话最后会显示 +几
                type: Number,
                default: 3
            }
        },
        computed: {
        },
        created () {
        },
        mounted () {
            // 头像超出显示的个数时，最后tooltip的显示
            if (this.list.length > this.max) {
                let arr = []
                this.list.forEach((item, key) => {
                    if (key > this.max-1) {
                        arr.push(item.tip)
                    }
                })
                this.label = arr.join('，')
            }
        },
        watch: {
            // 监听数据源的变化
            list: {
                deep: true,
                handler: function (value) {
                    if (value.length > this.max) {
                        let arr = []
                        value.forEach((item, key) => {
                            if (key > this.max-1) {
                                arr.push(item.tip)
                            }
                        })
                        this.label = arr.join('，')
                    }
                }
            }
        },
        methods: {
        }
    }
</script>
<style lang="less">
</style>
