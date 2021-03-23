<template>
    <bingo-run :code="code"></bingo-run>
</template>

<script>
import bingoRun from '@/components-api/bingo-run'
export default {
  name: 'bingo-run-demo',
  data () {
    return {
      code: ''
    }
  },
  components: {
    bingoRun
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.getTemplate()
    })
  },
  methods: {
    getTemplate () {
      const name = this.$route.query.templateName
      Promise.all([
                    import('@/components-api/bingo-run/template/' + name + '.js')
      ]).then(([
        codeTemplate
      ]) => {
        this.code = codeTemplate.default
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
