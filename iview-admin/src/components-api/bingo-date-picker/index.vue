<template>
    <div>
        <date-picker :type="type"
                     v-model="dates"
                     :placeholder="placeholder"
                     v-bind="$attrs" v-on="$listeners"
                     style="width: 100%">
        </date-picker>
    </div>
</template>
<script>
    import datePicker from '@/components-api/iview/components/date-picker2'

    export default {
        name: 'bingo-date',
        data() {
            return {
                weekNumber: ''
            }
        },
        components: {
            datePicker
        },
        props: {
            value: {
                type: [Date, String, Array],
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        methods: {},
        computed: {
            dates: {
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
