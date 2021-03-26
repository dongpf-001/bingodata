<template>
    <div>
        <date-picker :type="types"
                     v-model="weekNumber"
                     v-bind="$attrs"
                     v-on="$listeners"
                     show-week-numbers
                     :format="format">
        </date-picker>
    </div>
</template>
<script>
    import datePicker from '@/components-api/iview/components/date-picker1'

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
        methods: {},
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
