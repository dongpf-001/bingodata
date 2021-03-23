export default `<template>
    <Row :gutter="30">
        <Col span="11">
            选择周：
           <bingo-date-week types="date"
                            ref="week"
                            v-model="weekNumber"
                            format="yyyyKWww"
                            placeholder="选择周"
                            @on-change="onChanges"
                            class="bingo-components-wrapper">
            </bingo-date-week>
        </Col>
        <Col span="11">
            选择区域：
            <bingo-date-week types="daterange"
                             v-model="weekNumber2"
                             format="yyyyKWww"
                             placeholder="选择周"
                             @on-change="onChanges"
                             class="bingo-components-wrapper">
            </bingo-date-week>
        </Col>
    </Row>
</template>
<script>
export default {
  data () {
    return {
        weekNumber: '2019-12-13',
        weekNumber2: [],
    }
  },
  methods: {
      onChanges (date, f) {
         console.log(date);
         console.log(f);
        this.$Message.success(date);
      }
  },
  mounted () {
    let date1 = new Date('2019-12-13')
    let date2 = new Date('2020-01-13')
    this.weekNumber2[0] = date1
    this.weekNumber2[1] = date2
  }
}
</script>
<style lang="less" scoped>
    .bingo-date-picker {
        display: inline-block;
        width: 250px;
    }
    .date-picker-row {
        height: 80px;
    }
</style>`
