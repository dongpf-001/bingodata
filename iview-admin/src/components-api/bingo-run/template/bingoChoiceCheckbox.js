export default `<template>
  <div>
    <bingo-choice v-model="checkboxModel" :datas="datasCheck" :label-in-value="false" @on-change="onChange">
    </bingo-choice>{{checkboxModel}}
  </div>
</template>
<script>
export default {
  data () {
    return {
        checkboxModel: [2],
        datasCheck: [
            {
                label: 1,
                value: '北京'
            },
            {
                label: 2,
                value: '上海',
                disabled: false,
                border: false
            },
            {
                label: 3,
                value: '广州',
                border: false
            }
        ],
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style>

</style>`
