<template>
    <div class="shrink-card-wrapper" :class="expend ? '' : 'shrink-card-wrapper-expend'">
        <Card class="ivu-mb-8" dis-hover :class='[fullFlag ? "card-full" : ""]'>
            <!--            <span>收缩展开添加动画</span>-->
            <!--            <Icon type="ios-arrow-down" @click="open=!open"/>-->
            <p slot="title">
                <slot name="icon"></slot>
                {{title}}
                <template>
                    <Button icon="ios-arrow-up" class="shrink-card-icon" v-if="expend" @click="showTab"></Button><!-- 展开 -->
                    <Button icon="ios-arrow-down" class="shrink-card-icon" v-if="!expend" @click="showTab"></Button><!-- 收起 -->
                    <Button icon="md-resize" class="shrink-card-icon1" v-if="!fullFlag && showFullButton" @click="fullOpen"></Button><!-- 全屏 -->
                    <Button icon="icon iconfont iconweibiaoti11" class="shrink-card-icon1" v-if="fullFlag && showFullButton" @click="fullOpen"></Button><!-- 收起 -->
                </template>
            </p>

            <bingo-shrink v-model="expend" :height="height">
                <slot></slot>
            </bingo-shrink>
        </Card>

    </div>
</template>

<script>
    import  bingoShrink  from './shrink';

    export default {
        components: {
            bingoShrink
        },
        props: {
            title: {
                type: String,
                default: '基本信息'
            },
            height: {
                type: String
            },
            showFullButton: {
                type: Boolean,
                default: true
            },
        },
        data () {
            return {
                expend: true,
                fullFlag: false
            }
        },
        methods: {
            showTab () { // 收缩展开
                this.expend = !this.expend
                this.$emit('on-show-tab', this.expend)
            },
            fullOpen () { // 全屏
                this.fullFlag = !this.fullFlag
                this.$emit('on-open', this.fullFlag)
            }
        }
    }
</script>
