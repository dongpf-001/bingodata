<template>
    <span :type="type">
        <Modal class="modal-wrapper"
               ref="modal"
               v-if="type=='modal'"
               v-model="show"
               :title="title"
               :okText = "okText"
               :cancelText = "cancelText"
               :loading="loading1"
               v-bind="$attrs"
               @on-visible-change="visibleChange"
               @on-ok="ok"
               @on-cancel="cancel">
            <template ref="body">
                <slot v-if="show"></slot>
            </template>
            <div slot="footer" v-if="show && $slots.footer">
                <slot name="footer"></slot>
            </div>
        </Modal>
        <Modal v-model="show"
               v-if="type=='info' || type=='success' || type=='warning' || type=='error'"
               footer-hide>
            <div class="ivu-modal-confirm">
                <div class="ivu-modal-confirm-head">
                    <div :class="showTitleClass">
                        <i :class="showClass"></i>
                    </div>
                    <div class="ivu-modal-confirm-head-title">{{title}}</div>
                </div>
                <div class="ivu-modal-confirm-body">
                    <div>
                        <slot v-if="show"></slot>
                    </div>
                </div>
                <div class="ivu-modal-confirm-footer">
                    <button type="button" class="ivu-btn ivu-btn-primary" @click="ok">确定</button>
                </div>
            </div>
        </Modal>
        <Modal v-model="show" v-if="type=='errorMessage'" footer-hide>
            <div class="ivu-modal-confirm">
                <div class="modal-error">
                    <div class="modal-error-img">
                        <img src="@/assets/images/no.png" alt="no">
                    </div>
                    <div class="modal-error-content">
                        <slot name="title">
                            <span>抱歉，系统出现异常，请联系技术人员！</span>
                        </slot>
                    </div>
                </div>
                <div class="ivu-modal-confirm-footer">
                    <button type="button" class="ivu-btn ivu-btn-primary" @click="showClick">详情</button>
                    <button type="button" class="ivu-btn" @click="cancel">关闭</button>
                    <div class="modal-error-input" style="margin-top: 10px;text-align: left" v-if="showError">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </Modal>
        <Drawer v-if="type=='drawer'" ref="drawer" :title="title" v-model="show" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </Drawer>
    </span>
</template>
<script>
export default {
  name: 'bingo-modal',
  data () {
    return {
      // show: false,
      model: true,
      showError: false,
      className: '',
      timeId: '',
      loading1: true
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
    },
    title: {
      type: String,
      default: '提示信息'
    },
    content: {
      type: String
    },
    returnSMsg: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'modal'
    },
    setTimeout: {
      type: [Boolean, Number],
      default: false
    },
    /* ok:{
                type: Function
            },
            cancel:{
                type: Function
            }, */
    loading: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    modalMsg: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    show: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    showClass () {
      let className = ''
      if (this.type === 'info') {
        className = 'ivu-icon ivu-icon-ios-information-circle'
      } else if (this.type === 'success') {
        className = 'ivu-icon ivu-icon-ios-checkmark-circle'
      } else if (this.type === 'warning') {
        className = 'ivu-icon ivu-icon-ios-alert'
      } else if (this.type === 'error') {
        className = 'ivu-icon ivu-icon-ios-close-circle'
      }
      return className
    },
    showTitleClass () {
      let className = ''
      if (this.type === 'info') {
        className = 'ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info'
      } else if (this.type === 'success') {
        className = 'ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-success'
      } else if (this.type === 'warning') {
        className = 'ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-warning'
      } else if (this.type === 'error') {
        className = 'ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-error'
      }
      return className
    }
  },
  watch: {
    show (newValue) {
      let time = 2000
      if (newValue && this.setTimeout) { // 设置弹窗显示时间
        if (typeof this.setTimeout === 'number') {
          time = this.setTimeout
        }
        setTimeout(() => {
          this.show = false
        }, time)
      }
    }
  },
  created () {
  },
  methods: {
    ok () {
      this.modal = true
      setTimeout(() => { // 防止双击事件触发单击事件，但是还会概率触发
        this.show = false
      }, 300)
      this.$emit('on-ok')
      // if (this.timeId) { // 防止双击事件触发单击事件，但是还会概率触发
      //     window.clearTimeout(this.timeId)
      //     this.timeId = null
      // }
      // this.timeId = setTimeout(() => {
      //     this.show = false
      //     this.$emit('on-ok');
      // }, 400)
    },
    cancel () {
      /* this.$emit('on-cancel'); */
      this.show = false
      this.onCancel()
    },
    showClick () {
      this.showError = !this.showError
    },
    info () {
      this.$Modal.info({
        title: this.title,
        content: this.content,
        duration: 5,
        closable: true,
        onOk: () => {
          this.onOk()
        }
      })
    },
    success (msg) {
      this.$Message.success({
        content: msg,
        onOk: () => {
          this.onOk()
        }
      })
    },
    warning (msg) {
      this.$Message.warning({
        content: msg,
        duration: 5,
        closable: true,
        onOk: () => {
          this.onOk()
        }
      })
    },
    error () {
      this.$Modal.error({
        title: this.title,
        content: this.content,
        onOk: () => {
          this.onOk()
        }
      })
    },
    confirm () {
      this.$Modal.confirm({
        title: this.title,
        content: this.content,
        loading: this.loading,
        onOk: () => {
          this.onOk()
        },
        onCancel: () => {
          this.onCancel()
        }
      })
    },
    confirmAuto () {
      this.$Modal.confirm({
        title: this.title,
        content: this.content,
        loading: this.loading,
        onOk: () => {
          this.onOk()
        },
        onCancel: () => {
          this.onCancel()
        }
      })
    },
    onOk () {
      let that = this
      if (that.timeId) { // 防止双击事件触发单击事件，但是还会概率触发
        window.clearTimeout(that.timeId)
        that.timeId = null
      }
      that.timeId = setTimeout(() => {
        if (this.returnSMsg != null) {
          this.$Modal.remove()
          that.$Message.success({
            content: that.returnSMsg
          })
        } else {
          that.$emit('ok')
        }
      }, 300)
    },
    onCancel () {
      debugger
      if (this.timeId) { // 防止双击事件触发单击事件，但是还会概率触发
        window.clearTimeout(this.timeId)
        this.timeId = null
      }
      this.timeId = setTimeout(() => {
        this.$emit('on-cancel')
      }, 300)
    },
    onCloseModal () {
      this.$Modal.remove()
    },
    visibleChange (value) {
      if (value) {
        this.$nextTick(() => {
          const headHeight = this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].offsetTop
          const topHeight = this.$refs.modal.$el.getElementsByClassName('ivu-modal')[0].offsetTop
          if (this.height) {
            this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].style.height =
                                this.height + 'px'
          } else {
            // 设置最小高度
            this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].style.minHeight = '240px'
            // 设置最大高度
            this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].style.maxHeight =
                                (document.body.clientHeight - topHeight * 2 - headHeight) + 'px'
          }
          this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].style.overflowY =
                            'auto'
        })
      }
      this.$emit('on-visible-change', value)
    }
  }
}
</script>
<style lang="less">
    .modal-error {
        text-align: center;
    }
    .modal-error .modal-error-img {
        display: inline-block;
        vertical-align: middle;
        width: 30%
    }
    .modal-error .modal-error-img img {
        width: 80px;
        height: 80px
    }
    .modal-error .modal-error-content {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        text-align: left
    }
    .modal-error-input {
        width: 100%;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
    }
    .modal-error-input:hover {
        border-color: #57a3f3;
    }
    /*.vertical-center-modal{*/
    /*    .ivu-modal-body {*/
    /*        max-height: 440px;*/
    /*        overflow-y: auto;*/
    /*    }*/
    /*}*/
    /*.modal-wrapper .ivu-modal-body {*/
    /*    max-height: 440px;*/
    /*    overflow-y: auto;*/
    /*}*/
</style>
