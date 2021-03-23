export default `<template>
    <div>
        <Row gutter="30" class-name="date-picker-row">
            <Col span="11">
                选择日期：
                <bingo-date-picker type="date" v-model="date" show-week-numbers ref="week1"
                                   :options="options" @on-change="onChanges" class="bingo-date-picker">
                </bingo-date-picker>
            </Col>
            <Col span="11">
                选择区域：
                <bingo-date-picker type="daterange" show-week-numbers class="bingo-date-picker">
                </bingo-date-picker>
            </Col>
        </Row>
        <Row gutter="30" class-name="date-picker-row">
            <Col span="11">
                日期时间：
                <bingo-date-picker type="datetime" show-week-numbers class="bingo-date-picker">
                </bingo-date-picker>
            </Col>
            <Col span="11">
                &nbsp;&nbsp;&nbsp;选择年：
                <bingo-date-picker type="year" class="bingo-date-picker"></bingo-date-picker>
            </Col>
        </Row>
        <Row gutter="30" class-name="date-picker-row">
            <Col span="11">
                &nbsp;&nbsp;&nbsp;选择月：
                <bingo-date-picker type="month" class="bingo-date-picker"></bingo-date-picker>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data () {
    return {
     date: '2020-5-11',
        options: {
            disabledDate (date) {
                return date && date.valueOf() < Date.now();
            }
        },
    }
  },
  methods: {
      onChanges (date, f) {
         console.log(date);
         console.log(f);
      }
  },
  mounted () {

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
