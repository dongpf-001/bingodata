<template>
    <div>
    </div>
</template>
<script>
export default {
  name: 'bing-message',
  props: {
    content: {
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
      targetTime: ''
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
    success (msg) {
      this.$Message.success({
        content: msg,
        duration: 5,
        closable: true,
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
