<template>
    <div class="bill-new-component">
        <!--toolbar区域-->
        <bingo-toolbar :showAllButton="showButton.showAllButton" :showOpenButton="showButton.showOpenButton" v-if="showToolbar">
            <span slot="toolbar">
                <slot name="bill-toolbar">
                    <Button type='primary' icon='iconfont iconbaocun1' @click="onSave">保存</Button>
                    <Select v-model="checkboxModel" multiple placeholder="" class="bill-toolbar-select" @on-change="handleSaveTabs" @on-open-change="handleOpenTabs">
                        <Option v-for="item in datasCheck"
                                :value="item.label"
                                :disabled="item.disabled"
                                :key="item.label">{{ item.value }}</Option>
                    </Select>
                </slot>
            </span>
        </bingo-toolbar>
        <!--标题-->
        <h3 class="ivu-text-center" v-if="title">{{title}}</h3>
        <!--单据内容区域-->
        <div class="bill-new-wrapper" :style="billNewStyle"  :class='billClass'>
            <slot name="base"></slot>
            <div :class='billMenuClass' :style="billMenuStyle" v-if="showTabs">
                <Menu ref="bill-new-menu" :active-name="activeName" width="130px"
                      :mode="mode=='left' || mode=='right' ? 'vertical' : 'horizontal'"
                      @on-select="handleScroll" @on-open-change="selectClick()">
                    <div :class='billItemClass' v-for="(tab, key) in tabs" v-if="!tab.parentName && tab.showTabs">
                        <!-- 没有下拉的menu -->
                        <menu-item :name="tab.name" :key="key" v-if="!tab.drop">
                            <div class="bill-new-menu-svg">
                                <svg aria-hidden="true" width="30px" height="30px">
                                    <use xlink:href="#icondanjusvg1" width="100%"></use>
                                </svg>
                            </div>
                            <Icon class="bill-new-menu-icon" :type="tab.icon ? tab.icon : 'md-list-box'"/>
                            <span style="margin-left: 8px">{{tab.title}}</span>
                        </menu-item>
                        <!-- 存在下拉的menu -->
                        <Submenu v-if="tab.drop" :name="tab.name" :key="tab.name">
                            <template slot="title">
                                <Icon :type="tab.icon"/>
                                {{tab.title}}
                            </template>
                            <template  v-for="(tab2, key2) in tabs">
                                <menu-item :name="tab2.name" :key="key2" v-if="tab2.parentName == tab.name">
                                    <Icon :type="tab2.icon"/>
                                    {{tab2.title}}
                                </menu-item>
                            </template>
                        </Submenu>
                    </div>
                </Menu>
            </div>
            <div :class="contentClass" ref="content" v-scroll="loadMore">
                <Card dis-hover :class='[selectName==tab.name && fullFlag ? "card-full" : "",
                        tab.expend||(mode=="top")?"":"expendClass",
                        showTabs ? "content-card": ""]'
                      :ref="tab.name" v-if="tab.show" v-for="(tab, key) in tabs" :key="key">
                    <p slot="title" v-if="(mode=='right' || mode=='left') && !tab.hideTitle"><Icon :type="!tab.hideTitleName ?tab.icon : ''" class="ivu-mr-8"/>{{!tab.hideTitleName ? tab.title : ''}}
                        <template>
                            <!--基本信息布局-->
                            <Select v-model="checkboxModelLay" v-if="tab.showLayout" multiple placeholder=""
                                    class="bill-toolbar-select shrink-card-icon2" @on-change="layoutSaveClick(tab)"
                                    @on-open-change="handleOpen(tab, $event)">
                                <Option v-for="item in datasCheckLay"
                                        :value="item.label"
                                        :disabled="item.disabled"
                                        :key="item.label">{{ item.value }}</Option>
                            </Select>
                            <Button icon="ios-arrow-down" class="shrink-card-icon" v-if="tab.expend && isScroll" @click="showTab(tab)"></Button><!-- 展开 -->
                            <Button icon="ios-arrow-up" class="shrink-card-icon" v-if="!tab.expend && isScroll" @click="showTab(tab)"></Button><!-- 展开 -->

                            <Button icon="md-resize" class="shrink-card-icon1" v-if="!fullFlag && !tab.hideFull" @click="fullOpen(tab.name)"></Button>
                            <Button icon="icon iconfont iconweibiaoti11" class="shrink-card-icon1" v-if="fullFlag && !tab.hideFull" @click="fullOpen(tab.name)"></Button>
                        </template>
                    </p>
                    <!--不使用收缩展开动画效果，影响懒加载和响应式加载-->
                    <!--<bingo-shrink v-model="tab.expend" v-if="mode=='right' || mode=='left'" :height="tab.height">-->
                        <!--<slot :name="tab.name"></slot>-->
                    <!--</bingo-shrink>-->
                    <div v-if="mode=='right' || mode=='left'" class="bill-wrapper-context-body">
                        <slot :name="tab.name" v-if="tab.expend"></slot>
                    </div>
                    <!--<slot :name="tab.name"></slot>-->
                    <slot :name="tab.name" v-if="mode=='top'"></slot>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                horWidth: '100%',
                activeName: 'one', // 右侧定位的name
                selectName: '', // 全屏时选中的name
                tabName: 'one',
                fullFlag: false,
                tabHeight: 0, // 显示的明细总高度
                tabIndex: 0, // 显示的明细最大角标
                forTab: true, // 判断是否继续显示明细
                datasCheck: [], // menu布局
                datasCheckLay: [], // 基本信息布局
                isTabClick: false, // 判断是否走滚动事件
                checkboxModel: [], // menu布局
                checkboxModelLay: [], // 基本信息布局
                showButton: {
                    showOpenButton: false,
                    showAllButton: false
                },
                oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
                scrollTop: 0 // 记录当前的滚动距离
            };
        },
        props: {
            billName: { // 单据的名称，用于区分不同单据，用于缓存单据布局
                type: String,
                default: 'defaultName'
            },
            isScroll: { // 是否滚动
                type: Boolean,
                default: true
            },
            showToolbar: {
                type: Boolean,
                default: true
            },
            title:{
                type: Boolean,
                default: false
            },
            tabs: {
                type: Array,
                default: () => {
                    return []
                }
            },
            showTabs: { // 纵向单据时是否显示tabs
                type: Boolean,
                default: true
            },
            mode: { // 标签所在的位置  top right bottom left
                type: String,
                default: 'right'
            },
            active: {
                type: String,
            }
        },
        watch: {
            tabs: {
                deep: true,
                handler: function (value, oldValue) {
                    if (value.length !== oldValue.length) { // 当tabs长度发生变化（用于动态添加tabs）
                        for (let tab of this.tabs) {
                            this.$set(tab, 'expend', true) // 是否展开
                            this.$set(tab, 'showTabs', true) // 显示tab布局
                        }
                        // 初始化显示布局
                        let localData = JSON.parse(localStorage.getItem(this.billName));
                        if (localData && localData.length > 0) { // 如果有缓存的布局
                            this.tabs.forEach(item2 => {
                                this.$set(item2, 'showTabs', false)
                            })
                            localData.forEach(item => {
                                this.tabs.forEach(item2 => {
                                    if (item2.name == item) {
                                        this.$set(item2, 'showTabs', true)
                                    }
                                })
                            })
                        }
                        this.$nextTick(() => { // 页面初始化后显示part
                            this.initTabs();
                        })
                    }
                }
            },
            tabHeight: { // 监听明细总高度
                deep: true,
                handler: function (value) {
                    if (value > this.$refs.content.offsetHeight) { // 判断明细高度是否超过页面高度
                        this.forTab = false
                    } else {
                        this.tabIndex += 1
                        this.initTabs()
                    }
                }
            },
            scrollTop(newValue, oldValue) {
                setTimeout(() => {
                    if(newValue == this.$refs.content.scrollTop) { // 利用延迟判断是否滚动结束
                        console.log('滚动结束');
                        this.oldScrollTop = newValue; //每次滚动结束后都要给oldScrollTop赋值
                        this.isTabClick = false // 判断是否走滚动事件
                    }
                }, 20); //必须使用延时器，否则每次newValue和this.$refs.content.scrollTop都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
                if(this.oldScrollTop == oldValue) { //每次滚动开始时oldScrollTop与oldValue相等
                    console.log('滚动开始');
                }
            }
        },
        components: {
        },
        created() {
            for (let tab of this.tabs) {
                this.$set(tab, 'expend', true) // 是否展开
                this.$set(tab, 'showTabs', true) // 显示tab布局
                // this.$set(tab, 'show', true) // 是否展开
            }
            // this.$set(this.tabs[0], 'show', true)

            // 初始化显示布局
            let localData = JSON.parse(localStorage.getItem(this.billName));
            if (localData && localData.length > 0) { // 如果有缓存的布局
                this.tabs.forEach(item2 => {
                    this.$set(item2, 'showTabs', false)
                })
                localData.forEach(item => {
                    this.tabs.forEach(item2 => {
                        if (item2.name == item) {
                            this.$set(item2, 'showTabs', true)
                        }
                    })
                })
            }
        },
        mounted() {
            this.activeName=this.active;
            this.$nextTick(() => { // 页面初始化后显示part
                this.initTabs();
            })
            // 初始化
            if (this.mode == 'top' || !this.isScroll) {
                for (let tab of this.tabs) {
                    if (tab.drop) {
                        tab.show = false
                    } else {
                        if (tab.name==this.activeName || tab.parentName==this.activeName) {
                            tab.show = true
                        } else {
                            tab.show = false
                        }
                    }
                }
            }
        },
        computed: {
            billNewStyle() { // 单据内容区域的高度计算
                let style = {};
                style['height'] = `calc(100% - ${this.sHeight}px)`;
                return style
            },
            sHeight(){
                return this.toolbarHeight + this.titelHeiht
            },
            titelHeiht(){ // 标题的高度
                if(this.title){
                    return 32
                }else {
                    return 0
                }
            },
            toolbarHeight(){ // toolbar的高度
                if(this.showToolbar){
                    return 48
                }else {
                    return 0
                }
            },
            billClass() { // 单据内容class
                return [{
                    ['bill-top']: this.mode === 'top',
                    ['bill-right']: this.mode === 'right',
                    ['bill-bottom']: this.mode === 'bottom',
                    ['bill-left']: this.mode === 'left',
                    ['bill-full']: this.fullFlag,
                }];
            },
            billItemClass() { // 标签item的class
                return [{
                    ['bill-item-top']: this.mode === 'top',
                    ['bill-item-right']: this.mode === 'right',
                    ['bill-item-bottom']: this.mode === 'bottom',
                    ['bill-item-left']: this.mode === 'left'
                }];
            },
            billMenuClass() { // 单据标签class
                return [{
                    ['ivu-top']: this.mode === 'top',
                    ['ivu-right']: this.mode === 'right',
                    ['ivu-bottom']: this.mode === 'bottom',
                    ['ivu-left']: this.mode === 'left'
                }];
            },
            billMenuStyle() { // 单据内容区域的宽度计算
                let style = {};
                style['width'] = this.mode === 'top' || this.mode === 'bottom' ? `width: ${this.horWidth}` : ''
                return style
            },
            contentClass() {
                return [{
                    ['hContent']: this.mode === 'top' && !this.$slots.base,
                    ['hContent-hy']: this.mode === 'top' && this.$slots.base && this.$slots.base.length>0,
                    ['content i-scrollbar']: this.mode !== 'top' && this.isScroll, // 带滚动
                    ['content n-scrollbar']: this.mode !== 'top' && !this.isScroll, // 不带滚动
                }];
            },
            cardClass() {
                return [{
                    ['card-full']: this.fullFlag,
                }];
            }
        },
        methods: {
            initTabs() {  //初始化显示几个tab 懒加载，一个一个加载
                if (this.mode == 'top'  || !this.isScroll) {
                    for (let tab of this.tabs) {
                        if (tab.name==this.activeName) {
                            tab.show = true
                            this.$nextTick(() => { // 初始化part布局
                                this.initPart(tab)
                            })
                        } else {
                            tab.show = false
                        }
                    }
                } else {
                    let tab = {}
                    for (let i=this.tabIndex;i<this.tabs.length;i++) { // 判断当前tab是否在缓存中
                        if (this.getTabFlag(this.tabs[i])) {
                            tab = this.tabs[i]
                            this.tabIndex = i
                            break
                        }
                    }
                    if (this.forTab) { // 判断显示明细的高度是否超过页面高度
                        this.$set(this.tabs[this.tabIndex], 'show', true)
                        this.$nextTick(() => {
                            // 监听tabHeight，如果明细高度没有超过页面高度则回调再显示下一个明细
                            this.tabHeight = this.tabHeight + this.$refs[tab.name][0].$el.offsetHeight
                            // 初始化part布局
                            this.initPart(tab)
                        })
                    }
                    this.handleScroll(this.activeName, true)
                }
            },
            handleScroll(ref, isInit) {
                if (!isInit) { // 如果不是初始化，只有点击tab时才将isTabClick改为true
                    this.isTabClick = true
                }
                this.oldScrollTop = 0
                this.scrollTop = 0
                this.tabName = ref
                this.activeName = ref
                if (this.mode == 'top' || !this.isScroll) {
                    for (let tab of this.tabs) {
                        if (tab.name == ref) {
                            tab.show = true
                            this.$nextTick(() => { // 初始化part布局
                                this.initPart(tab)
                            })
                        } else {
                            tab.show = false
                        }
                    }
                } else {
                    for (let tab of this.tabs) {
                        let tabFlag = this.getTabFlag(tab) // 判断当前tab是否在缓存中
                        if (tab.name == ref && tabFlag) {
                            this.$set(tab, 'show', true)
                        }
                    }
                    this.$nextTick(() => {
                        this.$ScrollTop(this.$refs.content, {
                            // to: this.$refs[ref][0].$el.offsetTop,
                            to: this.$refs[ref][0].$el.offsetTop - 10, // @liuhzhbj 目的：垂直回滚tab标签，使其定位到原点
                            time: 600
                        })
                    });
                }
                this.$emit('handle-scroll', ref);
            },
            loadMore(el) { // 滚动触发的事件
                this.scrollTop = this.$refs.content && this.$refs.content.scrollTop;
                if (!this.isTabClick) {
                    //判断滚动到最下方
                    if((this.mode == 'right' || this.mode=='left') && this.isScroll){
                        if (el.clientHeight + el.scrollTop >= el.scrollHeight-10) {
                            for (let tab of this.tabs) {
                                let tabFlag = this.getTabFlag(tab) // 判断当前tab是否在缓存中
                                if (!tab.show && tabFlag) {
                                    this.$set(tab, 'show', true)
                                    return
                                }
                                setTimeout(() => {
                                    if (this.tabs[this.tabs.length - 1].name == tab.name) {
                                        this.activeName = tab.name
                                        this.tabName = tab.name;
                                    }
                                }, 120)
                            }
                        }
                    }
                    // 滚动位置判断显示到哪个tab
                    for (let tab of this.tabs) {
                        if (this.$refs[tab.name] && this.$refs[tab.name][0] && this.$refs[tab.name][0].$el && (this.$refs[tab.name][0].$el.getBoundingClientRect().top < 200)) {
                            setTimeout(() => {
                                this.$nextTick(() => {
                                    this.activeName = tab.name
                                    this.tabName = tab.name;
                                });
                            }, 120)
                        }
                    }
                }
            },
            fullOpen (name) { // 全屏
                this.selectName = name;
                this.fullFlag = !this.fullFlag;
                this.$emit('fullOpen', this.fullFlag, name);
                this.handleScroll(name)
            },
            showTab (tab) {
                tab.expend = !tab.expend
            },
            onSave () {
                this.$emit('on-save');
            },
            selectClick () {
                console.log('123')
            },
            handleOpen (tab, event) { // part布局
                if (event) { // 如果是展开的话
                    this.datasCheckLay = []
                    this.checkboxModelLay = []
                    let layData = this.$slots[tab.name] && this.$slots[tab.name][0].context.layData
                    for (let i in layData) {
                        this.datasCheckLay.push({ // tab布局的数据
                            label: layData[i].label,
                            value: layData[i].label,
                            disabled: layData[i].required || layData[i].isLink // 定位的tab不可以隐藏
                        })
                        if (layData[i].show) {
                            this.checkboxModelLay.push(layData[i].label)
                        }
                    }
                }
            },
            layoutSaveClick (tab) { // part布局
                localStorage.setItem(this.billName + '-' + tab.name, JSON.stringify(this.checkboxModelLay));
                let localLayData = JSON.parse(localStorage.getItem(this.billName + '-' + tab.name));
                let layData = this.$slots[tab.name] && this.$slots[tab.name][0].context.layData
                if (localLayData.length > 0) {
                    for (let i in layData) {
                        layData[i].show = false
                    }
                    localLayData.forEach(item => {
                        for (let i in layData) {
                            if (layData[i].label ==  item) {
                                this.$set(layData[i], 'show', true)
                            }
                        }
                    })
                }
            },
            handleOpenTabs (flag) { // tab布局
                if (flag) { // 如果是展开的话
                    this.datasCheck = []
                    this.checkboxModel = []
                    this.tabs.forEach(item => {
                        this.datasCheck.push({ // tab布局的数据
                            label: item.name,
                            value: item.title,
                            disabled: item.name == this.active // 定位的tab不可以隐藏
                        })
                        if (item.showTabs) {
                            this.checkboxModel.push(item.name)
                        }
                    })
                    console.log(this.checkboxModel)
                }
            },
            handleSaveTabs () { // tab布局保存后
                localStorage.setItem(this.billName, JSON.stringify(this.checkboxModel));
                let localData = JSON.parse(localStorage.getItem(this.billName));
                if (localData && localData.length > 0) { // 如果有缓存的布局
                    this.tabs.forEach(item2 => {
                        this.$set(item2, 'showTabs', false)
                        this.$set(item2, 'show', false)
                    })
                    localData.forEach(item => {
                        this.tabs.forEach(item2 => {
                            if (item2.name == item) {
                                this.$set(item2, 'showTabs', true)
                                if (!this.isScroll) { // 如果没有滚动的话
                                    if (item2.name == this.activeName) { // 只有当前tab页面的明细才会显示
                                        this.$set(item2, 'show', true)
                                    }
                                } else {
                                    this.$set(item2, 'show', true)
                                }
                            }
                        })
                    })
                    this.handleScroll(this.active)
                }
            },
            getTabFlag (tab) { // 判断当前tab是否在缓存中
                let localData = JSON.parse(localStorage.getItem(this.billName));
                let tabFlag = true
                if (localData && localData.length > 0) {
                    tabFlag = false
                    localData.forEach(item => {
                        if (item == tab.name) {
                            tabFlag = true
                        }
                    })
                }
                return tabFlag
            },
            initPart (tab) { // 初始化明细布局
                if (tab.showLayout) {
                    let localLayData = JSON.parse(localStorage.getItem(this.billName + '-' + tab.name));
                    let layData = this.$slots[tab.name] && this.$slots[tab.name][0].context.layData
                    if (localLayData.length > 0) {
                        for (let i in layData) {
                            layData[i].show = false
                        }
                        localLayData.forEach(item => {
                            for (let i in layData) {
                                if (layData[i].label ==  item) {
                                    this.$set(layData[i], 'show', true)
                                }
                            }
                        })
                    }
                }
            }
        }
    };
</script>
<style lang="less">
    .expendClass .ivu-card-body{
        padding: 0px !important;
    }
    .bill-full .fullScreen{
        height: calc(100% - 156px)!important;
        position: fixed!important;
        top: 56px!important;
        background-color: #fff;
    }
    .bill-toolbar-select {
        width: 30px;
        color: #fff;
        .ivu-select-item:after {
            right: 0!important;
        }
        .ivu-select-selection {
            background-color: #0086e2;
        }
        .ivu-select-selection:hover {
            background-color: #0071be;
        }
        .ivu-tag-checked {
            display: none;
        }
        .ivu-icon {
            color: #fff
        }
        .ivu-icon:before {
            content: "\f337"!important;
        }
    }
</style>
