<template>
  <ag-grid-vue v-bind="$attrs"
              v-on="$listeners"
              class="table ag-theme-balham"
              :columnDefs="columnDefs"
              :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
// 引入ag-grid-vue
import { AgGridVue } from 'ag-grid-vue'
export default {
  name: 'bingo-ag-table',
  data () {
    return {
    }
  },
  props: {
    columnDefs: {
      type: Array,
      default: () => { return [] }
    },
    rowData: {
      type: Array,
      default: () => { return [] }
    }
  },
  components: {
    AgGridVue
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="less">
  .table{
    width: 100%;
    height: 100%;
  }
</style>
