<template>
    <bingo-modal ref="modal" v-bind="$attrs" v-on="$listeners" :title="title" :width="width"
                 :footer-hide="footerHide" style="max-height: 600px">
        <!--toolbar-->
        <bingo-toolbar :showAllButton="false" :showOpenButton="false" v-if="showToolbar">
            <span slot="toolbar">
                <Button type='primary' customIcon='iconfont iconbaocun1'>保存</Button>
                <Button type='primary' customIcon='iconfont iconbaocunbingguanbi'>保存并关闭</Button>
                <Button type='primary' icon='md-close' @click="cancel">关闭</Button>
            </span>
        </bingo-toolbar>
        <slot></slot>
        <div slot="footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </bingo-modal>
</template>
<script>
import bingoModal from '@/components-api/bingo-modal'
import bingoToolbar from '@/components-api/bingo-toolbar'

export default {
  name: 'bingo-modal-select',
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    width: {
      type: Number,
      default: 900
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
      this.$emit('on-ok', this.areaData) // 提供on-ok内置方法，将选中的数据返回
    },
    cancel () {
      this.$refs.modal.show = false
    }
  }
}
</script>
<style lang="less">
</style>
