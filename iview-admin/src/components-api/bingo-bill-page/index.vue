<template>
    <div class="bill-component">
        <bingo-toolbar :showAllButton="showButton.showAllButton" :showOpenButton="showButton.showOpenButton"
                       v-if="showToolbar">
            <span slot="toolbar">
                <slot name="bill-toolbar">
                    <Button type='primary' icon='iconfont iconbaocun1' @click="onSave">保存</Button>
                </slot>
            </span>
        </bingo-toolbar>
        <h3 class="ivu-text-center" v-if="title">{{title}}</h3>
        <div class="bill" :style="'height:'+ 'calc(100% - '+sHeight+'px)' " :class='billClass'>
            <slot name="base"></slot>
            <div :class='[mode=="horizontal" ? "ivu-hor" : "ivu-fr"]'>
                <Menu ref="billMenu" :active-name="activeName" width="130px" :mode="mode" @on-select="handleScroll"
                      @on-open-change="selectClick()">
                    <div :class='[mode=="vertical" ? "bill-menu-item" : "bill-menu-hor"]'
                         v-for="(tab, key) in tabs" v-if="!tab.parentName">
                        <!-- 没有下拉的menu -->
                        <menu-item :name="tab.name" :key="key" v-if="!tab.drop">
                            <Icon :type="tab.icon"/>
                            {{tab.title}}
                        </menu-item>
                        <!-- 存在下拉的menu -->
                        <Submenu v-if="tab.drop" :name="tab.name" :key="tab.name">
                            <template slot="title">
                                <Icon :type="tab.icon"/>
                                {{tab.title}}
                            </template>
                            <template v-for="(tab2, key2) in tabs">
                                <menu-item :name="tab2.name" :key="key2" v-if="tab2.parentName == tab.name">
                                    <Icon :type="tab2.icon"/>
                                    {{tab2.title}}
                                </menu-item>
                            </template>
                        </Submenu>
                        
                        <div :class='[tabName==tab.name || tabName==tab.parentName ? "bill-menu-back1" : "bill-menu-back"]'>
                        </div> <!-- 背景三角形 -->
                    </div>
                    <div class="bill-hor-line"></div>
                </Menu>
            </div>
            <div :class="contentClass" ref="content" v-scroll="loadMore">
                <Card class="content-card"
                      :class='[selectName==tab.name && fullFlag ? "card-full" : "",tab.expend||(mode=="horizontal")?"":"expendClass"]'
                      :ref="tab.name" v-if="tab.show" v-for="(tab, key) in tabs" :key="key">
                    <p slot="title" v-if="mode=='vertical'">
                        <Icon :type="tab.icon" class="ivu-mr-8"/>
                        {{tab.title}}
                        <template>
                            <Button icon="ios-arrow-down" class="shrink-card-icon" v-if="tab.expend"
                                    @click="showTab(tab)"></Button><!-- 展开 -->
                            <Button icon="ios-arrow-up" class="shrink-card-icon" v-if="!tab.expend"
                                    @click="showTab(tab)"></Button><!-- 展开 -->
                            
                            <Button icon="md-resize" class="shrink-card-icon1" v-if="!fullFlag"
                                    @click="fullOpen(tab.name)"></Button>
                            <Button icon="icon iconfont iconweibiaoti11" class="shrink-card-icon1" v-if="fullFlag"
                                    @click="fullOpen(tab.name)"></Button>
                        </template>
                    </p>
                    <bingo-shrink v-model="tab.expend" v-if="mode=='vertical'" :height="tab.height">
                        <slot :name="tab.name"></slot>
                    </bingo-shrink>
                    <!--<slot :name="tab.name"></slot>-->
                    <slot :name="tab.name" v-if="mode=='horizontal'"></slot>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import bingoShrink from '../bingo-shrink'
    import bingoToolbar from '../bingo-toolbar'

    export default {
        data() {
            return {
                activeName: 'one', // 右侧定位的name
                selectName: '', // 全屏时选中的name
                tabName: 'one',
                fullFlag: false,
                showButton: {
                    showOpenButton: false,
                    showAllButton: false
                }
            }
        },
        props: {
            showToolbar: {
                type: Boolean,
                default: true
            },
            title: {
                type: Boolean,
                default: false
            },
            tabs: {
                type: Array,
                default: []
            },
            mode: {
                type: String,
                default: 'vertical'
            },
            active: {
                type: String
            }
        },
        components: {bingoShrink, bingoToolbar},
        created() {
            for (let tab of this.tabs) {
                this.$set(tab, 'expend', true)
            }
            this.$set(this.tabs[0], 'show', true)
        },
        mounted() {
            this.activeName = this.active
            // this.initTabs();
            // 初始化
            if (this.mode == 'horizontal') {
                for (let tab of this.tabs) {
                    if (tab.drop) {
                        tab.show = false
                    } else {
                        if (tab.name == this.activeName || tab.parentName == this.activeName) {
                            tab.show = true
                        } else {
                            tab.show = false
                        }
                    }
                }
            }
        },
        computed: {
            sHeight() {
                /* if(this.showToolbar){
                              return 93-this.titelHeiht
                          }else {
                              return 56-this.titelHeiht
                          } */
                return this.toolbarHeight + this.titelHeiht
            },
            titelHeiht() {
                if (this.title) {
                    return 32
                } else {
                    return 0
                }
            },
            toolbarHeight() {
                if (this.showToolbar) {
                    return 48
                } else {
                    return 0
                }
            },
            billClass() {
                return [{
                    'bill-vertical': this.mode === 'vertical',
                    'bill-horizontal': this.mode === 'horizontal',
                    'bill-full': this.fullFlag
                }]
            },
            contentClass() {
                return [{
                    'hContent': this.mode === 'horizontal' && !this.$slots.base,
                    'hContent-hy': this.mode === 'horizontal' && this.$slots.base && this.$slots.base.length > 0,
                    'content i-scrollbar': this.mode !== 'horizontal'
                }]
            },
            cardClass() {
                return [{
                    'card-full': this.fullFlag
                }]
            }
        },
        watch: {},
        methods: {
            initTabs() { // 初始化显示几个tab
                let tabHeight = 0, flag = true
                if (this.mode == 'horizontal') {
                    for (let tab of this.tabs) {
                        if (tab.name == this.activeName) {
                            tab.show = true
                        } else {
                            tab.show = false
                        }
                    }
                } else {
                    for (let tab of this.tabs) {
                        if (flag) {
                            this.$set(tab, 'show', true)
                            tabHeight = tabHeight + this.$refs[tab.name][0].$el.offsetHeight
                            if (tabHeight > this.$refs.content.offsetHeight) {
                                flag = false
                            }
                        } else {
                            tab.show = false
                        }
                    }
                    this.handleScroll(this.activeName)
                }
            },
            handleScroll(ref) {
                this.tabName = ref
                if (this.mode == 'horizontal') {
                    for (let tab of this.tabs) {
                        if (tab.name == ref) {
                            tab.show = true
                        } else {
                            tab.show = false
                        }
                    }
                } else {
                    for (let tab of this.tabs) {
                        if (tab.name == ref) {
                            this.$set(tab, 'show', true)
                        }
                    }
                    this.$nextTick(() => {
                        this.$ScrollTop(this.$refs.content, {
                            to: this.$refs[ref][0].$el.offsetTop,
                            time: 600
                        })
                    })
                }
                this.$emit('handle-scroll', ref)
            },
            loadMore(el) {
                // 判断滚动到最下方
                if (this.mode == 'vertical') {
                    if (el.clientHeight + el.scrollTop >= el.scrollHeight - 10) {
                        for (let tab of this.tabs) {
                            if (!tab.show) {
                                this.$set(tab, 'show', true)
                                return
                            }
                            setTimeout(() => {
                                if (this.tabs[this.tabs.length - 1].name == tab.name) {
                                    this.activeName = tab.name
                                    this.tabName = tab.name
                                }
                            }, 100)
                        }
                    }
                }
                // 滚动位置判断显示到哪个tab
                for (let tab of this.tabs) {
                    if (this.$refs[tab.name] && this.$refs[tab.name][0] && this.$refs[tab.name][0].$el && (this.$refs[tab.name][0].$el.getBoundingClientRect().top < 200)) {
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.activeName = tab.name
                                this.tabName = tab.name
                            })
                        }, 120)
                    }
                }
            },
            fullOpen(name) { // 全屏
                this.selectName = name
                this.fullFlag = !this.fullFlag
                this.$emit('fullOpen', this.fullFlag, name)
                this.handleScroll(name)
            },
            showTab(tab) {
                tab.expend = !tab.expend
            },
            onSave() {
                this.$emit('on-save')
            },
            selectClick() {
            }
        }
    }
</script>
<style>
    .expendClass .ivu-card-body {
        padding: 0px !important;
    }
    
    .bill-full .fullScreen {
        height: calc(100% - 156px) !important;
        position: fixed !important;
        top: 56px !important;
        background-color: #fff;
    }
</style>
