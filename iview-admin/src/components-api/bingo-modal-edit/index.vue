<template>
    <bingo-modal ref="modal" v-bind="$attrs" v-on="$listeners" :title="title" :width="width"
                 :footer-hide="footerHide" :height="height">
        <!--toolbar-->
        <bingo-toolbar :showAllButton="false" :showOpenButton="false" v-if="showToolbar">
            <span slot="toolbar">
                <slot name="toolbar">
                    <Button type='primary' customIcon='iconfont iconbaocun1' @click="save">保存</Button>
                    <Button type='primary' customIcon='iconfont iconbaocunbingguanbi' @click="saveCancel">保存并关闭</Button>
                    <Button type='primary' icon='md-close' @click="cancel">关闭</Button>
                </slot>
            </span>
        </bingo-toolbar>
        <span class="modal-edit-wrapper">
            <slot></slot>
        </span>
        <div slot="footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </bingo-modal>
</template>
<script>
    import bingoModal from '../bingo-modal'
    import bingoToolbar from '../bingo-toolbar'

    export default {
        name: 'bingo-modal-select',
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: '编辑1'
            },
            width: {
                type: Number,
                default: 900
            },
            height: {
                type: Number,
                default: ''
            },
            footerHide: {
                type: Boolean,
                default: true
            },
            showToolbar: {
                type: Boolean,
                default: true
            }
        },
        components: {
            bingoModal, bingoToolbar
        },
        created() {
        },
        methods: {
            ok() {
                this.$emit('on-ok')
            },
            cancel() {
                this.$refs.modal.show = false
            },
            save() {
                this.$emit('on-save', this)
            },
            saveCancel() {
                this.$emit('on-save-cancel', this)
            }
        }
    }
</script>
<style lang="less">
    /*原样式已转移到styles/style/toolbar  --  modyfy by yuannnan*/
</style>
