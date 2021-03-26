<template>
    <div>
        <date-picker :type="types"
                     v-model="weekNumber"
                     v-bind="$attrs"
                     :format="format"
                     show-week-numbers
                     :clearable='true'
                     @on-change="onChange"
                     @on-open-change="onOpenChange"
                     @on-ok="onOk"
                     @on-clear="onClear"
                     @on-clickoutside="onClickoutside">
        </date-picker>
    </div>
</template>
<script>
    import datePicker from '@/components-api/iview/components/date-picker1'
    import {TYPE_VALUE_RESOLVER_MAP} from '@/components-api/iview/components/date-picker1/util'

    export default {
        name: 'bingo-date-week',
        data() {
            return {}
        },
        components: {
            datePicker
        },
        props: {
            value: {
                type: [Date, String, Array],
                default: ''
            },
            types: {
                type: String,
                default: 'date'
            },
            format: {
                type: String,
                default: 'yyyyKWww'
            }
        },
        methods: {
            onChange() {
                let returnVlaue = ''
                if (this.multiple) {
                    const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter
                    returnVlaue = formatter([this.weekNumber], this.format, this.separator)
                } else {
                    const {formatter} = (
                            TYPE_VALUE_RESOLVER_MAP[this.types] ||
                            TYPE_VALUE_RESOLVER_MAP['default']
                    )
                    if (this.weekNumber.length > 0) {
                        returnVlaue = formatter(this.weekNumber, this.format, this.separator)
                    } else {
                        returnVlaue = formatter([this.weekNumber], this.format, this.separator)
                    }
                }
                this.$emit('on-change', returnVlaue, this.types)
            },
            onOpenChange(value) {
                this.$emit('on-open-change', value)
            },
            onOk() {
                this.$emit('on-ok')
            },
            onClear() {
                // this.$emit('on-clear')
            },
            onClickoutside(event) {
                this.$emit('on-clickoutside', event)
            }
        },
        computed: {
            weekNumber: {
                get: function () {
                    return this.value
                },
                set: function (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>
<style lang="less">
</style>
