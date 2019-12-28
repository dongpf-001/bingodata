<template>
    <div class="content-inner">
        <Card>
            <Card>
                <bingo-tree :data="selectTreeData"
                            :load-data="loadData"
                            show-query
                            :disabledAll="true"
                            @on-query="onQuery"
                            @on-reset="onReset"
                            :multiple="false"
                            :showCheckbox="false"
                            @edit-node="editNode"
                            @add-node="addNode"
                            @delete-node="deleteNode"
                            @on-select-change="onSelectChange">
                </bingo-tree>
            </Card>
            <Card>
                <bingo-tree ref="tree"
                            :draggable="true"
                            :data="data"
                            :showCheckbox="true"
                            :maxLength="20"
                            :inputWidth="6"
                            :delete-node-before="deleteNodeBefore"
                            @on-select-change="onSelectChange"
                            :on-drag-before="onDrop"
                            @on-drag="onDrag"
                            @delete-node="deleteNode"
                ></bingo-tree>
            </Card>
            <div>
                <pre v-highlight>
                    <code >{{html1}}</code>
                    <code >{{html2}}</code>
                </pre>
            </div>
            <Divider>详细描述</Divider>
            <h3>Tree props</h3>
            <Table border :columns="columns1" :data="data1"></Table>
            <br />
            <h3>Tree events</h3>
            <Table border :columns="columns2" :data="data2"></Table>
            <h3>children</h3>
            <Table border :columns="columns3" :data="data3"></Table>
        </Card>
    </div>
</template>

<script>
import bingoTree from '@/components-api/bingo-tree'
// import * as Api from '@/api/bmsa/demo'

export default {
  name: 'bingo-modal2',
  data () {
    return {
      model: {
        show: true,
        title: '编辑 ',
        closable: true,
        maskClosable: true,
        draggable: false
      },
      nextValue: 0,
      setValue: 0,
      setItem: {},
      data: [
        {
          title: 'parent 1',
          expand: true,
          value: 0,
          selected: false,
          checked: false,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              value: 1,
              parentValue: 0,
              disabled: true,
              disabledEdit: true,
              selected: false,
              checked: false,
              children: [
                {
                  title: '不可拖拽1',
                  expand: true,
                  value: 3,
                  selected: true,
                  checked: true,
                  disabledDrag: true,
                  parentValue: 1
                },
                {
                  title: '拖拽2',
                  expand: true,
                  value: 4,
                  selected: false,
                  checked: false,
                  parentValue: 1
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              value: 2,
              disabledDelete: true,
              disabledAdd: true,
              parentValue: 0,
              selected: false,
              checked: false,
              children: [
                {
                  title: '不可以拖拽到我身上',
                  expand: true,
                  value: 5,
                  selected: false,
                  checked: false,
                  parentValue: 2
                },
                {
                  title: '拖拽4',
                  expand: true,
                  value: 6,
                  selected: false,
                  checked: false,
                  parentValue: 2
                },
                {
                  title: '拖拽5',
                  expand: true,
                  value: 7,
                  selected: false,
                  checked: false,
                  parentValue: 2
                },
                {
                  title: '拖拽6',
                  expand: true,
                  value: 8,
                  selected: false,
                  checked: false,
                  parentValue: 2
                }
              ]
            }
          ]
        }
      ],
      selectTreeData: [],
      split: 0.7,
      html1: '<!-- 异步加载组织机构 -->\n' +
                    '<bingo-tree :data="selectTreeData"\n' +
                    '            :load-data="loadData"\n' +
                    '            :multiple="false"\n' +
                    '            @edit-node="editNode"\n' +
                    '            @add-node="addNode"\n' +
                    '            @delete-node="deleteNode"\n' +
                    '></bingo-tree>',
      html2: '<!-- 正常的树结构 -->\n' +
                    '<bingo-tree :data="data"\n' +
                    '            :showCheckbox="true"\n' +
                    '            :maxLength="20"\n' +
                    '            :inputWidth="6">\n' +
                    '</bingo-tree>',
      columns1: [
        {
          title: '属性',
          key: 'props-name',
          width: 170
        },
        {
          title: '说明',
          key: 'props-decp',
          width: 700
        },
        {
          title: '类型',
          key: 'props-type',
          width: 170
        },
        {
          title: '默认值',
          key: 'props-default',
          width: 170
        }
      ],
      data1: [
        {
          'props-name': 'data',
          'props-decp': '可嵌套的节点属性的数组，生成 tree 的数据',
          'props-type': 'Array',
          'props-default': '[]'
        },
        {
          'props-name': 'disabledAll',
          'props-decp': '是否控制所有增删改的权限',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'maxLength',
          'props-decp': '编辑时限制输入的最大字符',
          'props-type': 'Number',
          'props-default': '50'
        },
        {
          'props-name': 'inputWidth',
          'props-decp': '控制input框的宽度',
          'props-type': 'Number',
          'props-default': '12'
        },
        {
          'props-name': 'show-query',
          'props-decp': '是否显示查询区域',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'multiple',
          'props-decp': '是否支持多选',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'show-checkbox',
          'props-decp': '是否显示多选框',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'empty-text',
          'props-decp': '没有数据时的提示',
          'props-type': 'String',
          'props-default': '暂无数据'
        },
        {
          'props-name': 'load-data',
          'props-decp': '异步加载数据的方法',
          'props-type': 'Function',
          'props-default': '-'
        }
      ],
      columns2: [
        {
          title: '事件名',
          key: 'event-name',
          width: 170
        },
        {
          title: '说明',
          key: 'event-decp',
          width: 870
        },
        {
          title: '返回值',
          key: 'return-val',
          width: 170
        }
      ],
      data2: [
        {
          'event-name': 'on-select-change',
          'event-decp': '点击树节点时触发',
          'return-val': '当前已选中的节点数组、当前项'
        },
        {
          'event-name': 'on-check-change',
          'event-decp': '点击复选框时触发',
          'return-val': '当前已勾选节点的数组、当前项'
        },
        {
          'event-name': 'on-toggle-expand',
          'event-decp': '展开和收起子列表时触发',
          'return-val': '当前节点的数据'
        },
        {
          'event-name': 'edit-node',
          'event-decp': '*编辑树节点触发的方法',
          'return-val': '全部数据/修改前的数据/修改后的数据'
        },
        {
          'event-name': 'add-node',
          'event-decp': '*添加树节点触发的方法',
          'return-val': '全部数据/新加的数据'
        },
        {
          'event-name': 'delete-node',
          'event-decp': '*删除树节点触发的方法',
          'return-val': '全部数据/删除的数据'
        },
        {
          'event-name': 'on-query',
          'event-decp': '*查询的方法',
          'return-val': '输入的数据'
        },
        {
          'event-name': 'on-reset',
          'event-decp': '*重置方法',
          'return-val': '-'
        }
      ],
      columns3: [
        {
          title: '属性',
          key: 'props-name',
          width: 170
        },
        {
          title: '说明',
          key: 'props-decp',
          width: 700
        },
        {
          title: '类型',
          key: 'props-type',
          width: 170
        },
        {
          title: '默认值',
          key: 'props-default',
          width: 170
        }
      ],
      data3: [
        {
          'props-name': 'title',
          'props-decp': '标题',
          'props-type': 'String',
          'props-default': ''
        },
        {
          'props-name': 'value',
          'props-decp': '绑定的健',
          'props-type': 'String | Number',
          'props-default': ''
        },
        {
          'props-name': 'parentValue',
          'props-decp': '*父节点的绑定的value',
          'props-type': 'String | Number',
          'props-default': ''
        },
        {
          'props-name': 'expand',
          'props-decp': '是否展开子节点',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabled',
          'props-decp': '禁掉响应',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledEdit',
          'props-decp': '*控制是否可以编辑',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledDelete',
          'props-decp': '*控制是否可以删除',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledAdd',
          'props-decp': '*控制是否可以添加',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disableCheckbox',
          'props-decp': '禁掉 checkbox',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'selected',
          'props-decp': '是否选中子节点',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'render',
          'props-decp': '自定义渲染内容',
          'props-type': 'Function',
          'props-default': '-'
        },
        {
          'props-name': 'checked',
          'props-decp': '是否勾选(如果勾选，子节点也会全部勾选)',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'children',
          'props-decp': '子节点属性数组',
          'props-type': 'Array',
          'props-default': '[]'
        }
      ]
    }
  },
  components: {
    bingoTree
    // Api
  },
  created () {
    this.getOragnization()
  },
  methods: {
    onDrop (root, node, data, callback) {
      debugger
      if (!(data.value === 5)) {
        callback()
      }
    },
    onDrag (root, dragData, data) {
      console.log(root[0].node, '根')
      console.log(dragData, '拖拽的节点')
      console.log(data, '目标节点')
    },
    onQuery (model) {
      // Api.getOrganizationByName(model).then(res => {
      //   this.selectTreeData = []
      //   res.data.forEach((item) => {
      //     this.selectTreeData.push({
      //       title: item.description,
      //       value: item.orgId,
      //       expand: false,
      //       loading: false,
      //       selected: false,
      //       checked: false,
      //       children: []
      //     })
      //   })
      // })
    },
    onReset () {
      this.nextValue = 0
      this.selectTreeData = []
      this.getOragnization()
    },
    ok () {
      this.$Message.info('Clicked  ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    open () {
      this.$refs.modal.show = true
    },
    open1 () {
      this.$refs.modal1.show = true
    },
    save () {
      this.$Message.info('Clicked  save')
    },
    close () {
      this.$refs.modal1.show = false
    },
    handleCopy () {
      let that = this
      this.$Copy({
        text: that.html1
      })
    },
    getOragnization (item, value) {
      this.setValue = value
      this.setItem = item
      // Api.getOragnizationData({ parentId: value }).then(res => {
      //   if (res.success) {
      //     if (this.nextValue === 0) {
      //       res.data.forEach((item) => {
      //         this.selectTreeData.push({
      //           title: item.description,
      //           value: item.orgId,
      //           expand: false,
      //           loading: false,
      //           selected: false,
      //           checked: false,
      //           children: []
      //         })
      //       })
      //       this.nextValue = 1
      //     } else {
      //       if (res.data.length > 0) {
      //         res.data.forEach((item) => {
      //           this.setItem.children.push({
      //             title: item.description,
      //             value: item.orgId,
      //             expand: false,
      //             loading: false,
      //             selected: false,
      //             checked: false,
      //             children: []
      //           })
      //         })
      //         this.setItem.expand = true
      //         this.setItem.loading = false
      //       } else {
      //         this.setItem.loading = false
      //         delete this.setItem.loading
      //       }
      //     }
      //   }
      // })
    },
    loadData (item, callback) {
      let value = item.value
      this.getOragnization(item, value)
    },
    editNode (data, oldData, newData) {
      console.log(data)
      console.log(oldData)
      console.log(newData)
    },
    addNode (data, addData) {
      console.log(data)
      console.log(addData)
    },
    deleteNode (data, deleteData) {
      console.log(data)
      console.log(deleteData)
    },
    deleteNodeBefore (data, deleteData, callback) {
      debugger
      if (deleteData.node.title === '拖拽4') {
        return
      }
      callback()
    },
    onSelectChange (data, item) {
      debugger
      console.log(data)
      console.log(item)
      this.$Message.success('on-select-change')
    }
  }
}
</script>
