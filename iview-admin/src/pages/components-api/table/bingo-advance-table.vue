<template>
    <div class="content-inner">
      <bingo-query ref="query" type="float" :col="query.col" :labelWidth="query.labelWidth" :data="queryData">
        <bingo-grid-item>
          <FormItem label="姓名" prop="name" label-for="page">
            <Input v-model="queryData.name" placeholder="姓名" element-id="name" />
          </FormItem>
        </bingo-grid-item>
        <bingo-grid-item>
          <FormItem label="组名称" prop="groupName" label-for="page">
            <Input v-model="queryData.groupName" placeholder="组名称" element-id="groupName"/>
          </FormItem>
        </bingo-grid-item>
        <bingo-grid-item>
          <FormItem label="公司名称" prop="companyName" label-for="page">
            <Input v-model="queryData.companyName" placeholder="公司名称"/>
          </FormItem>
        </bingo-grid-item>
        <bingo-grid-item>
          <FormItem label="学位" prop="degree">
            <Input v-model="queryData.degree" placeholder="学位"/>
          </FormItem>
        </bingo-grid-item>
        <bingo-grid-item>
          <FormItem label="邮箱" prop="email">
            <Input v-model="queryData.email" placeholder="学位"/>
          </FormItem>
        </bingo-grid-item>
      </bingo-query>
      <bingo-ag-table ref="table"
                      :columnDefs="columnDefs"
                      :rowData="rowData"
                      :enableColResize="true"
                      :enableSorting="true"
                      :enableFilter="true"
                      :pageSetting="model.pageSetting"
                      rowSelection="multiple"
                      @selection-changed="onSelectionChanged"
                      @cellClicked="onCellClicked"
                      @cellContextMenu="cellContextMenu"
       ></bingo-ag-table>

      <Dropdown transfer ref="contentMenu" style="display: none" trigger="click" placement="right-start">
        <DropdownMenu slot="list">
          <DropdownItem name="top"><Icon type="ios-add" style="margin-right: 10px"></Icon>添加</DropdownItem>
          <DropdownItem name="bottom"><Icon type="md-create" style="margin-right: 10px"></Icon>编辑</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
</template>

<script>
import bingoAgTable from '@/components-api/bingo-advance-table'
import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
import bingoQuery from '@/components-api/bingo-query'
import bingoActionDrop from '@/components-api/bingo-action-drop'
export default {
  name: 'bingo-ag-table1',
  data () {
    return {
      columnDefs: [
        { type: 'index', title: '序号', key: 'soft', width: 20 },
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          slot: 'CurrencyComponent2',
          fixed: 'left',
          align: 'center'
        },
        { title: '姓名', key: 'name', editable: true },
        { title: '性别', key: 'gender', editable: true },
        { title: '年龄', key: 'age', width: 80, editable: true },
        { title: '姓名', key: 'name', editable: true },
        { title: '性别', key: 'gender', editable: true },
        { title: '年龄', key: 'age', width: 80, editable: true },
        { title: '姓名', key: 'name', editable: true },
        { title: '性别', key: 'gender', editable: true },
        { title: '年龄', key: 'age', width: 80, editable: true },
        { title: '姓名', key: 'name', editable: true }
      ],
      rowData: [
        { name: '李煜', gender: '男', age: 20, soft: 1 },
        { name: '柳叶', gender: '女', age: 25, soft: 2 },
        { name: '姜宇', gender: '男', age: 18, soft: 3 }
      ],
      model: {
        toolbar: true,
        border: true,
        page: true,
        pageSetting: {
          pageNum: 1,
          pageTotal: 50,
          pageSize: 40,
          showSizer: true,
          pageSizeOpts: [10, 20, 40]
        }
      },
      queryData: {
        name: '',
        groupName: '',
        companyName: '',
        email: '',
        degree: ''
      },
      query: {
        col: 3,
        labelWidth: 90
      }
    }
  },
  components: {
    bingoAgTable,
    bingoGridItem,
    bingoQuery,
    bingoActionDrop,
    'CurrencyComponent2': {
      components: { bingoActionDrop },
      template:
              '                    <bingo-action-drop :ag="true">\n' +
              '                        <a>编辑</a>\n' +
              '                        <span slot="list">\n' +
              '                             <DropdownItem>\n' +
              '                                <span>编辑</span>\n' +
              '                             </DropdownItem>\n' +
              '                             <DropdownItem>\n' +
              '                                <span>删除</span>\n' +
              '                            </DropdownItem>\n' +
              '                         </span>\n' +
              '                    </bingo-action-drop>\n',
      data () {
        return {
          test: '1111111'
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.table.$options.components['CurrencyComponent2'] = this.$options.components['CurrencyComponent2']
    })
  },
  computed: {},
  watch: {},
  methods: {
    onSelectionChanged (value) {
      console.log(value)
    },
    onCellClicked (cell) {
      console.log(cell)
    },
    cellContextMenu (value) {
      debugger
      value.event.preventDefault()
      this.$refs.contentMenu.$refs.reference = value.event.target
      this.$refs.contentMenu.currentVisible = true
    }
  }
}
</script>
