<template>
    <div class="ivu-mt-16">
        <Card class="bingo-card ivu-p-8">
            <bingo-form :col="query.col" :labelWidth="query.labelWidth" ref="form" :button="query.button">
                <bingo-grid-item>
                    <FormItem label="选择日期">
                        <bingo-date type="date" placeholder="日期" show-week-numbers></bingo-date>
                    </FormItem>
                </bingo-grid-item>
            </bingo-form>
        </Card>
    </div>
</template>

<script>
    import bingoDate from '@/components-api/bingo-date'
    import bingoDateWeek from '@/components-api/bingo-date/bingo-date-week'
    import bingoForm from '@/components-api/bingo-query/bingo-form'
    import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'

    export default {
        name: 'bingo-date1',
        data() {
            return {
                weekNumber: '',
                weekNumber2: [],
                weekNumber3: [],
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
                }
            }
        },
        components: {
            bingoDateWeek, bingoForm, bingoGridItem, bingoDate
        },
        methods: {
            getData(sss) {
                console.log(11)
            }
        },
        mounted() {
            let date = new Date()
            this.weekNumber = date
            let date1 = new Date('2019-12-13')
            let date2 = new Date('2020-01-13')
            this.weekNumber2[0] = date1
            this.weekNumber2[1] = date2
            this.weekNumber3.push(date1)
            this.weekNumber3.push(date2)
        }
    }
</script>
<style scoped>

</style>
