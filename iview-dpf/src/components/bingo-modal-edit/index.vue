<template>
    <bingo-modal ref="modal" v-bind="$attrs" v-on="$listeners" :title="title" :width="width"
               :footer-hide="footerHide" :height="height">
    <!--toolbar-->
        <bingo-toolbar :showAllButton="false" :showOpenButton="false" v-if="showToolbar">
            <span slot="toolbar">
                <slot name="toolbar">
                    <Button type='primary' customIcon='iconfont iconbaocun1' @click="save">{{$t('bmsa.baise.save')}}</Button>
                    <Button type='primary' customIcon='iconfont iconbaocunbingguanbi' @click="saveCancel">{{$t('bmsa.baise.saveClose')}}</Button>
                    <Button type='primary' icon='md-close' @click="cancel">{{$t('bmsa.baise.close')}}</Button>
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
    import bingoModal from '@/components/bingo-modal';
    import bingoToolbar from '@/components/bingo-toolbar';

    export default {
        name: 'bingo-modal-select',
        data () {
            return {
            }
        },
        props: {
            title: {
                type: String,
                default: ()=>{return $t('bmsa.baise.edit')}
            },
            width: {
                type: Number,
                default: 900
            },
            height: {
                type: Number,
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
        created () {
        },
        methods: {
            ok () {
                this.$emit('on-ok');
            },
            cancel () {
                this.$refs.modal.show = false;
                this.$emit('on-cancel');
            },
            save () {
                this.$emit('on-save', this);
            },
            saveCancel () {
                this.$emit('on-save-cancel', this);
            },
        }
    }
</script>
<style>
  /*原样式已转移到styles/style/toolbar  --  modyfy by yuannnan*/
</style>
