<template>
    <div>
        <Calendar v-model="date"
                  v-bind="$attrs"
                  v-on="$listeners">
            <template slot-scope="{ date, data }" slot="month">
                <slot name="month" :data="data" :date="date"></slot>
            </template>
            <template slot-scope="{ data }" slot="year">
                <slot name="year" :data="data"></slot>
            </template>
            <template slot="header">
                <slot name="header"></slot>
            </template>
            <template slot="headerTitle">
                <slot name="headerTitle"></slot>
            </template>
        </Calendar>
    </div>
</template>
<script>
import Calendar from '@/components-api/iview/components/calendar'
export default {
  name: 'bingo-calendar',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: [Date, String, Number],
      default () {
        return ''
      }
    }
  },
  components: {
    Calendar
  },
  computed: {
    date: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
</style>
