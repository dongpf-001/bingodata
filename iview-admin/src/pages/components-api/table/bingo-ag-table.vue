<template>
    <div class="content-inner">
      <bingo-ag-table :columnDefs="columnDefs" :rowData="rowData"></bingo-ag-table>
    </div>
</template>

<script>
import bingoAgTable from '@/components-api/bingo-ag-table'

export default {
  name: 'bingo-ag-table1',
  data () {
    return {
      columnDefs: [
        { headerName: '姓名', field: 'name' },
        { headerName: '性别', field: 'gender' },
        { headerName: '年龄', field: 'age' }
      ],
      rowData: [
        { name: '李煜', gender: '男', age: 20 },
        { name: '柳叶', gender: '女', age: 25 },
        { name: '姜宇', gender: '男', age: 18 }
      ]
    }
  },
  components: { bingoAgTable },
  created () {
  },
  mounted () {
  },
  computed: {},
  watch: {},
  methods: {
  }
}
</script>
