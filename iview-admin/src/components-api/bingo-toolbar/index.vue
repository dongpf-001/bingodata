<template>
    <div class="toolbar-wrapper">
        <div class="toolbar-wrapper-col" ref="icoll">
                <span v-if="showAllButton">
                    <Button type='primary' :disabled="disabledNew" customIcon='iconfont iconxinjian1' @click="newClick"
                            v-if="showNew">{{$t('page.common.new')}}</Button>
                    <Button type='primary' :disabled="disabledDelete" icon='md-trash' @click="deleteClick"
                            v-if="showDelete">{{$t('page.common.delete')}}</Button>
                    <Button type='primary' :disabled="disabledRefresh" icon='md-refresh' @click="refreshClick"
                            v-if="showRefresh">{{$t('page.common.refresh')}}</Button>
                </span>
            <slot name="toolbar">
            </slot>
        </div>
        <Dropdown class="toolbar-down-button" ref="drop" placement="left-start" trigger="click" v-if="showFlag">
            <Icon type="ios-arrow-down"/>
            <Dropdown-menu slot="list" v-for="(tt, t) in item" :key="t">
                <Dropdown-item :class="tt"></Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <Button type='primary' class="resize-btn" :icon='!fullFlag ? "md-resize" : "icon iconfont iconweibiaoti11"'
                @click="openFullModal" v-if="showOpenButton"></Button>
    </div>
</template>

<script>
    export default {
        name: 'bingo-toolbar',
        data() {
            return {
                widths: 0,
                collapse: false,
                fullModal: false,
                item: [],
                timer: false,
                showFlag: false
            }
        },
        props: {
            showNew: {
                type: Boolean,
                default: true
            },
            showDelete: {
                type: Boolean,
                default: true
            },
            showRefresh: {
                type: Boolean,
                default: true
            },
            disabledNew: {
                type: Boolean,
                default: false
            },
            disabledDelete: {
                type: Boolean,
                default: false
            },
            disabledRefresh: {
                type: Boolean,
                default: false
            },
            showAllButton: {
                type: Boolean,
                default: true
            },
            showOpenButton: {
                type: Boolean,
                default: true
            },
            fullFlag: {
                type: Boolean,
                default: false
            }
        },
        created() {
            window.addEventListener(
                    'resize',
                    () => {
                        if (this.$refs.icoll && this.$refs.icoll.offsetWidth) {
                            this.widths = this.$refs.icoll.offsetWidth
                        }
                    }
            )
        },
        mounted() {
            this.widths = this.$refs.icoll.offsetWidth
        },
        computed: {},
        watch: {
            widths() {
                this.showFlag = false
                if (this.item.length > 0) {
                    this.item.forEach((item, key) => {
                        let sss = this.$refs.drop.$children[1].$children[key].$children[0].$el.children[0]
                        this.$slots.toolbar[0].elm.appendChild(sss)
                    })
                    this.$refs.drop.$children[1].$children = []
                    this.item = []
                }
                if (!this.timer) {
                    if (this.$slots.toolbar && this.$slots.toolbar[0].children) {
                        let buttonList = this.$slots.toolbar[0].children
                        let widthTotal = 20
                        this.timer = true
                        setTimeout(() => {
                            for (let i = 0; i < buttonList.length; i++) {
                                widthTotal += buttonList[i].elm.offsetWidth + 6
                                if (widthTotal >= this.widths) {
                                    for (let j = i; j < buttonList.length; j++) {
                                        this.item.push(j)
                                    }
                                    this.timer = false
                                    this.showFlag = true
                                    return
                                }
                            }
                            this.timer = false
                        }, 400)
                    }
                }
            },
            item() {
                this.$nextTick(() => {
                    this.item.forEach((item, index) => {
                        let str = this.$slots.toolbar[0].children[item].elm
                        this.$refs.drop.$children[1].$children[index].$children[0].$el.appendChild(str)
                        // let num = item - index
                        // let str = document.querySelectorAll('.' + this.classSlot)[0].children[0].children[num]
                        // document.querySelectorAll('.' + this.classDown)[0].children[1].children[index].children[0].appendChild(str)
                    })
                })
            }
        },
        methods: {
            openFullModal() {
                this.$emit('open-full-modal')
            },
            newClick() {
                this.$emit('on-new')
            },
            deleteClick() {
                this.$emit('on-delete')
            },
            refreshClick() {
                this.$emit('on-refresh')
            }
        }
    }
</script>

<style>

</style>
