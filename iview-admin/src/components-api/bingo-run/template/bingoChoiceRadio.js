export default `<template>
  <div>
    <bingo-choice types="radio" v-model="radioModel" :datas="datas" :label-in-value="true">
    </bingo-choice>{{radioModel}}
  </div>
</template>
<script>
export default {
  data () {
    return {
        radioModel: 0,
        datas: [
            {
                label: 1,
                value: '男'
            },
            {
                label: 0,
                value: '女',
                disabled: false,
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
