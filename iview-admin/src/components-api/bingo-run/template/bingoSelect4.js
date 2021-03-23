export default `<template>
  <div>
    自定义智能感知：
    <bingo-select type="selectAuto" v-model="model.autoValue1" @on-search="handleSearch2" class="bingo-select">
        <Option v-for="item in autoData1" :value="item" :key="item">{{ item }}</Option>
    </bingo-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
        model: {
            model1: 2,
            model2: [1, 2],
            model3: '',
            treeValue1: '',
            treeValue2: ['1', '1-1'],
            treeValue3: '',
            autoValue: '',
            autoValue1: ''
        },
        autoData1: [],
        autoData2: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
    }
  },
  methods: {
     filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
     },
     handleSearch2 (value) {
        this.autoData1 = !value || value.indexOf('@') >= 0 ? [] : [
            value + '@qq.com',
            value + '@sina.com',
            value + '@163.com'
        ];
     },
  },
  mounted () {

  }
}
</script>
<style>
.bingo-select {
    display: inline-block;
    width: 300px;
}
</style>`
