<template>
    <div>
        <date-picker :type="type"
                    placeholder="Select date"
                    v-bind="$attrs" v-on="$listeners">
        </date-picker>
    </div>
</template>
<script>
import datePicker from '@/components-api/iview/components/date-picker2'
export default {
  name: 'bingo-date',
  data () {
    return {
      weekNumber: ''
    }
  },
  components: {
    datePicker
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>
<style lang="less">
</style>
