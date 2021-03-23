export default `<template>
  <div>
    <Row gutter="30">
        <Col span="11">
            单选：
            <bingo-select ref="element" v-model="model.model1" :data="datas"
                          :label-in-value="true" @on-change="onChange" class="bingo-select">
            </bingo-select>
        </Col>
        <Col span="11">
            多选
            <bingo-select ref="element" v-model="model.model2" :data="datas" :multiple="true"
                          :labelInValue="true" @on-change="onChange" :showSelectAll="true" class="bingo-select">
            </bingo-select>
        </Col>
    </Row>
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
            treeValue2: '',
            treeValue3: '',
            autoValue: ''
        },datas: [
            {
                value: 1,
                label: '北京',
                disabledOption: false
            },
            {
                value: 2,
                label: '上海',
                hiddenOption: true
            },
            {
                value: 3,
                label: '广州'
            },
            {
                value: 4,
                label: '天津'
            }
        ],
    }
  },
  methods: {
    onChange (value) {
        if (value) {
            this.$Message.info(JSON.stringify(value));
        }
    },
  },
  mounted () {

  }
}
</script>
<style>

</style>`
