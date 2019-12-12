<template>
    <span :type="type">
        <Modal  class="modal-wrapper"
                ref="modal"
                v-if="type=='modal'"
                v-model="show"
                :title="title"
                v-bind="$attrs"
                @on-visible-change="visibleChange"
                v-on="$listeners">
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
        <Modal v-model="show"
               v-if="type=='errorMessage'"
               footer-hide>
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
                    <button type="button" class="ivu-btn" @click="ok">关闭</button>
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
      className: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    type: {
      type: String,
      default: 'modal'
    },
    setTimeout: {
      type: [Boolean, Number],
      default: false
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
      this.show = false
      this.$emit('on-ok')
    },
    showClick () {
      this.showError = !this.showError
    },
    visibleChange (value) {
      if (value) {
        this.$nextTick(() => {
          const headHeight = this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].offsetTop
          const topHeight = this.$refs.modal.$el.getElementsByClassName('ivu-modal')[0].offsetTop
          this.$refs.modal.$el.getElementsByClassName('ivu-modal-body')[0].style.maxHeight =
                            (document.body.clientHeight - topHeight * 2 - headHeight) + 'px'
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
