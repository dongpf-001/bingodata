export default `<template>
  <bingo-calendar v-model="day" @on-change="onChange"
                 @on-type-change="onTypeChange" :cell-height="80">
     <template slot="month" slot-scope="{ date, data }">
        <div v-if="data.day === '2019-12-11'" style="background-color: yellow">今天有重要的事</div>
     </template>
  </bingo-calendar>
</template>
<script>
export default {
    data () {
        return {
            day: '2019-12-03',
            month: '2019-10',
            locale: {
                today: 'today',
                type: {
                    month: '月',
                    year: '年'
                },
                weekDays: ['日', '一', '二', '三', '四', '五', '六'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        }
    },
    methods: {
        onChange (date) {
            this.$Message.success(date.toString());
        },
        onTypeChange (type) {
            this.$Message.success(type);
        }
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
