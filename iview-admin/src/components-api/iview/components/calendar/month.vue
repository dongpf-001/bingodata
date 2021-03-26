<template>
    <table class="ivu-calendar-table" cellspacing="0" cellpadding="0">
        <thead>
        <th class="title-th" v-for="item in finalWeekDays" :key="item">{{ item }}</th>
        </thead>
        <tbody>
        <tr v-for="(item, index) in chunkDays" :key="index">
            <td v-for="date in item" :key="date.text">
                <div
                        class="ivu-calendar-table-day"
                        :class="{ 'ivu-calendar-table-day-other': date.type !== 'current', 'ivu-calendar-table-day-current': date.text === currentDate }"
                        :style="dayStyles"
                        @click="handleClickDate(date.text)"
                >
                    <div class="ivu-calendar-table-day-title">{{ date.date }}</div>
                    <div class="ivu-calendar-table-day-slot">
                        <slot :date="new Date(date.date)"
                              :data="{ type: date.type + '-month', day: date.text, selected: date.text === currentDate }"
                              name="month"></slot>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import dayjs from 'dayjs'
    import chunk from 'lodash.chunk'
    import {getWeek} from '../../utils/week'

    export default {
        name: 'CalendarMonth',
        inject: ['CalendarInstance'],
        props: {
            date: Object
        },
        data() {
            return {
                firstDayOfWeek: this.CalendarInstance.firstDayOfWeek,
                weekDays: this.CalendarInstance.locale.weekDays
            }
        },
        computed: {
            finalWeekDays() {
                let weekArr = this.weekDays.slice(this.firstDayOfWeek).concat(this.weekDays.slice(0, this.firstDayOfWeek))
                weekArr.splice(0, 0, 'KW')
                return weekArr
            },
            days() {
                let days = []
                const firstDate = dayjs(this.date.format('YYYY-MM-01'))
                const firstDay = firstDate.day()
                const firstDayOfWeek = this.firstDayOfWeek
                const prevMonthDaysCount = firstDayOfWeek <= firstDay ? firstDay - firstDayOfWeek : 7 - (firstDayOfWeek - firstDay)

                for (let i = 0; i < prevMonthDaysCount; i++) {
                    const day = firstDate.subtract(prevMonthDaysCount - i, 'day')
                    const date = {
                        text: day.format('YYYY-MM-DD'),
                        date: day.format('D'),
                        type: 'prev'
                    }
                    days.push(date)
                }

                const daysInMonth = firstDate.daysInMonth()
                for (let i = 0; i < daysInMonth; i++) {
                    const day = firstDate.add(i, 'day')
                    const date = {
                        text: day.format('YYYY-MM-DD'),
                        date: day.format('D'),
                        type: 'current'
                    }
                    days.push(date)
                }

                const nextMonthDaysCount = 42 - days.length
                const nextMonthFirstDay = firstDate.add(1, 'month')
                for (let i = 0; i < nextMonthDaysCount; i++) {
                    const day = nextMonthFirstDay.add(i, 'day')
                    const date = {
                        text: day.format('YYYY-MM-DD'),
                        date: day.format('D'),
                        type: 'next'
                    }
                    days.push(date)
                }

                return days
            },
            chunkDays() {
                let chunkArr = chunk(this.days, 7)
                for (let i = 0; i < chunkArr.length; i++) {
                    let week = getWeek(chunkArr[i][0].text)
                    chunkArr[i].splice(0, 0, {date: week})
                }
                return chunkArr
            },
            dayStyles() {
                let style = {}

                if (this.CalendarInstance.cellHeight !== 100) {
                    style.height = `${this.CalendarInstance.cellHeight}px`
                }

                return style
            },
            currentDate() {
                return this.date.format('YYYY-MM-DD')
            }
        },
        methods: {
            handleClickDate(date) {
                this.CalendarInstance.handleChangeDate(dayjs(date))
            }
        }
    }
</script>
<style>
    /*.title-th th:first-child {*/
    /*    width: 30px;*/
    /*}*/
</style>
