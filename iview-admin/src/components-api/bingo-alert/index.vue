<template>
    <div>
        <Modal ref="alert" v-model="confirmModalAuto" width="460" class="bingo-alert">
            <div class="bingo-alert-content">
                <h3>{{modalMsg.title}}</h3>
                <div class="bingo-alert-icon bingo-alert-warning">?</div>
                {{modalMsg.content}}

            </div>
            <div slot="footer">
                <Button long class="cannel" @click="onCanel">取消删除</Button>
                <Button type="warning" :loading="loading" v-if="confirmModalAuto" @click="onOk">（<CountDown :target="targetTime" :format="format" v-if="isShowCount" @on-end="handleEnd" />s后）立即删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  name: 'bing-alert',
  props: {
    modalMsg: {
      type: Object,
      default: function () {
        return {
          title: '删除确认',
          content: '',
          loading: true,
          duration: 5
        }
      }
    },
    other: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      confirmModalAuto: false,
      percent: 0,
      loading: false,
      isShowCount: false, // 显示计数器
      targetTime: new Date().getTime() + 3000
    }
  },
  components: {
  },
  created () {
    // this.targetTime = new Date().getTime() + this.modalMsg.duration*1000
  },
  mounted () {
    // this.complateTime()
  },
  computed: {

  },
  methods: {
    format (time) {
      let ss = Math.floor(time / 1000 % 60)
      return ss
    },
    confirm () {
      this.$Modal.confirm({
        title: this.modalMsg.title,
        content: this.modalMsg.content,
        loading: this.modalMsg.loading,
        onOk: () => {
          this.onOk()
        },
        onCancel: () => {
          this.onCancel()
        }
      })
    },
    confirmAuto () {
      this.loading = false
      this.confirmModalAuto = true
      this.isShowCount = true
      this.targetTime = new Date().getTime() + 3000
    },
    delete () {
      this.loading = false
      this.confirmModalAuto = true
      this.isShowCount = true
      this.targetTime = new Date().getTime() + 3000
    },
    warning (msg) {
      this.$Message.warning({
        content: msg,
        duration: 5,
        closable: true,
        onOk: () => {
          this.$parent.ok()
        }
      })
    },
    error (msg) {
      this.$Message.error({
        content: msg,
        duration: 5,
        closable: true,
        onOk: () => {
          this.onOk()
        }
      })
    },
    handleEnd () {
      this.onOk()
    },
    onOk () {
      this.isShowCount = false
      this.loading = true
      this.$parent.ok()
    },
    onCanel () {
      this.confirmModalAuto = false
    },
    onCloseModal () {
      this.$Modal.remove()
    }
  }
}
</script>
<style lang="less">
</style>
