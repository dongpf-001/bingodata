<template>
    <Modal
            v-model="show"
            :title="title"
            :closable="closable"
            :mask-closable="maskClosable"
            :fullscreen="fullscreen"
            :draggable="draggable"
            :ok-text="okText"
            :cancel-text="cancelText"
            :width="width"
            @on-ok="onOK"
            @on-cancel="onCancel">
        <bingo-form ref="bingoform" :button="button" :buttonTwo="buttonTwo" :buttonTwoText="buttonTwoText" :buttonOneText="buttonOneText"
                    :col="col" :name="name" :labelWidth="labelWidth" :disabled="disabled" :linkColor="linkColor"
                    :rules="rules" :data="data">
            <slot></slot>
        </bingo-form>
        <div slot="footer">
            <span style="margin-right: 8px" v-if="showDefault">
                <Button type="primary" @click="save" v-if="showSave">保存</Button>
                <Button type="primary" @click="saveClose" v-if="showSaveClose">保存并关闭</Button>
                <Button type="primary" @click="close" v-if="showClose">关闭</Button>
            </span>
            <slot name="footer-button"></slot>
        </div>
    </Modal>
</template>
<script>
import bingoForm from '../bingo-form/index.vue'
import bingoGridItem from '../bingo-grid-item/index.vue'
export default {
  name: 'bingo-modal-form',
  data () {
    return {
      show: false,
      loading: false,
      collapse: false,
      timeId: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    closable: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    col: {
      type: Number,
      default: 1
    },
    labelWidth: {
      type: Number
    },
    button: {
      type: Boolean,
      default: true
    },
    buttonTwo: {
      type: Boolean,
      default: false
    },
    buttonTwoText: {
      type: String,
      default: '提交'
    },
    buttonOneText: {
      type: String,
      default: '保存'
    },
    name: {
      type: String,
      default: 'form'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 开启后，链接颜色为默认的蓝色， 默认关闭为继承效果
    linkColor: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object
    },
    data: {
      type: Object
    },
    showDefault: {
      type: Boolean,
      default: true
    },
    showSave: {
      type: Boolean,
      default: true
    },
    showSaveClose: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  components: {
    bingoForm,
    bingoGridItem
  },
  methods: {
    onOK (selection, row) {
      this.$emit('on-ok')
    },
    onCancel (selection) {
      this.$emit('on-cancel')
    },
    save (selection) {
      if (this.timeId) { // 防止双击事件触发单击事件，但是还会概率触发
        window.clearTimeout(this.timeId)
        this.timeId = null
      }
      this.timeId = setTimeout(() => {
        this.$refs.bingoform.$refs.form.validate((valid) => {
          this.loading = true
          if (valid) {
            let _this = this
            this.$emit('on-save', function () {
              _this.loading = false
            })
          } else {
            this.loading = false
          }
        })
      }, 400)
    },
    saveClose (selection) {
      this.$refs.bingoform.$refs.form.validate((valid) => {
        this.loading = true
        if (valid) {
          this.save()
          this.show = false
        } else {
          this.loading = false
        }
      })
    },
    resetFields () {
      this.$refs.bingoform.$refs.form.resetFields()
      for (let data in this.$refs.bingoform.$refs.form.model) {
        if (this.$refs.bingoform.$refs.form.model[data] && this.$refs.bingoform.$refs.form.model[data] != '') {
          this.$refs.bingoform.$refs.form.model[data] = ''
        }
      }
    },
    close (selection) {
      this.show = false
    }
  },
  mounted () {
    console.log(this.$slots.collapse)
  }
}
</script>
<style lang="less">
</style>
