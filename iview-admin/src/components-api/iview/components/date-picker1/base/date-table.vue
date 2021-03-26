<template>
    <div :class="classes">
        <div :class="[prefixCls + '-header']">
            <span v-for="day in headerDays" :key="day">
                {{day}}
            </span>
        </div>
        <span
                :class="getCellCls(cell)"
                v-for="(cell, i) in cells"
                :key="String(cell.date) + i"
                @click="handleClick(cell, $event)"
                @mouseenter="handleMouseMove(cell)"
        >
            <em>{{ cell.desc }}</em>
        </span>
    </div>
</template>
<script>
    import {clearHours, isInRange} from '../util'
    import {getWeek} from '../../../utils/week'
    import Locale from '../../../mixins/locale'
    import jsCalendar from 'js-calendar'

    import mixin from './mixin'
    import prefixCls from './prefixCls'

    export default {
        mixins: [Locale, mixin],

        props: {
            /* more props in mixin */
            showWeekNumbers: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                prefixCls: prefixCls,
                daysAll: []
            }
        },
        created() {
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-show-week-numbers`]: this.showWeekNumbers
                    }
                ]
            },
            calendar() {
                const weekStartDay = Number(this.t('i.datepicker.weekStartDay'))
                return new jsCalendar.Generator({onlyDays: !this.showWeekNumbers, weekStart: weekStartDay})
            },
            headerDays() {
                const weekStartDay = Number(this.t('i.datepicker.weekStartDay'))
                const translatedDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(item => {
                    return this.t('i.datepicker.weeks.' + item)
                })
                const weekDays = translatedDays.splice(weekStartDay, 7 - weekStartDay).concat(translatedDays.splice(0, weekStartDay))
                return this.showWeekNumbers ? ['KW'].concat(weekDays) : weekDays
            },
            cells() {
                const tableYear = this.tableDate.getFullYear()
                const tableMonth = this.tableDate.getMonth()
                const today = clearHours(new Date()) // timestamp of today
                const selectedDays = this.dates.filter(Boolean).map(clearHours) // timestamp of selected days
                const [minDay, maxDay] = this.dates.map(clearHours)
                const rangeStart = this.rangeState.from && clearHours(this.rangeState.from)
                const rangeEnd = this.rangeState.to && clearHours(this.rangeState.to)
                const isRange = this.selectionMode === 'range'
                const disabledTestFn = typeof this.disabledDate === 'function' && this.disabledDate
                // 计算每个月的周一是第几周，用于显示周
                let days = [] // 每个月周一对应的都是几号
                let indexArr = [10, 18, 26, 34, 42, 50] // 周一对应的index
                let weekIndex = [8, 16, 24, 32, 40, 48] // 显示周位置对应的index
                let cellArr = []
                this.calendar(tableYear, tableMonth, (cell) => {
                    cellArr.push(cell)
                }).cells.slice(this.showWeekNumbers ? 8 : 0)
                for (let i = 0; i < cellArr.length; i++) {
                    for (let j = 0; j < indexArr.length; j++) {
                        if (cellArr[i].index == indexArr[j]) {
                            days.push({
                                day: cellArr[i].desc,
                                type: cellArr[i].type,
                                index: weekIndex[j]
                            })
                        }
                    }
                }
                // console.log('哈哈哈'+days)
                for (let i = 0; i < days.length; i++) {
                    if (days[i].type == 'monthDay') {
                        let date = tableYear + '-' + (tableMonth + 1) + '-' + days[i].day
                        days[i].week = getWeek(date)
                    } else if (days[i].type == 'nextMonth') {
                        if (tableMonth == 11) {
                            let date = (tableYear + 1) + '-' + 1 + '-' + days[i].day
                            days[i].week = getWeek(date)
                        } else {
                            let date = tableYear + '-' + (tableMonth + 2) + '-' + days[i].day
                            days[i].week = getWeek(date)
                        }
                    } else if (days[i].type == 'prevMonth') {
                        if (tableMonth == 0) {
                            let date = (tableYear - 1) + '-' + 12 + '-' + days[i].day
                            days[i].week = getWeek(date)
                        } else {
                            let date = tableYear + '-' + (tableMonth) + '-' + days[i].day
                            days[i].week = getWeek(date)
                        }
                    }
                }
                this.daysAll = days
                // day为数组，里面包括每周周一对应的日期，类型，显示周对应的index 以及对应的周num
                // -------------------
                return this.calendar(tableYear, tableMonth, (cell) => {
                    // normalize date offset from the dates provided by jsCalendar
                    if (cell.date instanceof Date) cell.date.setTime(cell.date.getTime() + cell.date.getTimezoneOffset() * 60000)
                    // --------------修改desc
                    let weekIndex = [8, 16, 24, 32, 40, 48]
                    for (let i = 0; i < weekIndex.length; i++) {
                        if (cell.index == weekIndex[i]) {
                            this.daysAll.forEach((item) => {
                                if (item.index == weekIndex[i]) {
                                    cell.desc = item.week
                                }
                            })
                        }
                    }
                    // -----------
                    const time = cell.date && clearHours(cell.date)
                    const dateIsInCurrentMonth = cell.date && tableMonth === cell.date.getMonth()
                    return {
                        ...cell,
                        type: time === today ? 'today' : cell.type,
                        selected: dateIsInCurrentMonth && selectedDays.includes(time),
                        disabled: (cell.date && disabledTestFn) && disabledTestFn(new Date(time)),
                        range: dateIsInCurrentMonth && isRange && isInRange(time, rangeStart, rangeEnd),
                        start: dateIsInCurrentMonth && isRange && time === minDay,
                        end: dateIsInCurrentMonth && isRange && time === maxDay
                    }
                }).cells.slice(this.showWeekNumbers ? 8 : 0)
            }
        },
        methods: {
            getCellCls(cell) {
                return [
                    `${prefixCls}-cell`,
                    {
                        [`${prefixCls}-cell-selected`]: cell.selected || cell.start || cell.end,
                        [`${prefixCls}-cell-disabled`]: cell.disabled,
                        [`${prefixCls}-cell-today`]: cell.type === 'today',
                        [`${prefixCls}-cell-prev-month`]: cell.type === 'prevMonth',
                        [`${prefixCls}-cell-next-month`]: cell.type === 'nextMonth',
                        [`${prefixCls}-cell-week-label`]: cell.type === 'weekLabel',
                        [`${prefixCls}-cell-range`]: cell.range && !cell.start && !cell.end,
                        [`${prefixCls}-focused`]: clearHours(cell.date) === clearHours(this.focusedDate)

                    }
                ]
            }
        }
    }
</script>
