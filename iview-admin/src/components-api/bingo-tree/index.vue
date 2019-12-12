<template>
    <div>
        <span v-if="showQuery">
            <Input v-model="queryModel" placeholder="请输入" style="width: 150px" size="small"/>
            <Button type="primary" @click="handleQuery" style="margin-left: 10px" size="small">查询</Button>
            <Button class="ivu-ml-8" @click="handleReset" size="small">重置</Button>
        </span>
        <Tree ref="tree" v-bind="$attrs" v-on="$listeners" :render="renderContent"></Tree>
        <Dropdown transfer ref="contentMenu" style="display: none" trigger="click" placement="right-start"
                  v-if="!disabledAll" @on-click="changeClick">
            <DropdownMenu slot="list">
                <DropdownItem name="add" v-if="!disabledAdd"><Icon type="ios-add" style="margin-right: 10px"></Icon>添加</DropdownItem>
                <DropdownItem name="edit" v-if="!disabledEdit"><Icon type="md-create" style="margin-right: 10px"></Icon>编辑</DropdownItem>
                <DropdownItem name="delete" v-if="node.nodeKey != 0 && !disabledDelete">
                    <Icon type="ios-remove" style="margin-right: 10px"></Icon>删除
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
export default {
  data () {
    return {
      timeId: '',
      queryModel: '',
      selectData: [],
      // 输入框要修改的内容
      inputContent: '',
      nodeInfo: [],
      oldData: {},
      root: '',
      node: '',
      // 修改前的TreeNode名称
      oldName: '',
      editState: false,
      disabledEdit: false,
      disabledDelete: false,
      disabledAdd: false
    }
  },
  props: {
    showQuery: {
      type: Boolean,
      default: false
    },
    disabledAll: { // 是否控制所有权限不可使用
      type: Boolean,
      default: false
    },
    maxLength: { // 是否控制所有权限不可使用
      type: Number,
      default: 50
    },
    inputWidth: { // 是否控制所有权限不可使用
      type: Number,
      default: 12
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h('span', {
        class: `${(data.selected || data.checked) && !this.$attrs.showCheckbox ? 'ivu-tree-title ivu-tree-title-selected' : 'ivu-tree-title'}`,
        style: {
          display: 'inline-block',
          lineHeight: '1.1rem',
          cursor: 'pointer'
        },
        on: {
          click: () => {
            let _this = this
            if (!data.disabled) { // 控制节点是否可以选择
              if (_this.timeId) { // 防止双击事件触发单击事件，但是还会概率触发
                window.clearTimeout(_this.timeId)
                _this.timeId = null
              }
              _this.timeId = setTimeout(function () {
                if (_this.$attrs.multiple) {
                  data.selected = !data.selected
                  // data.checked = !data.checked
                  _this.selectData.push(data)
                  _this.onSelectChange(_this.selectData, data)
                } else {
                  _this.selectData.forEach((item) => {
                    if (item.value !== data.value) {
                      item.selected = false
                      // item.checked = false
                    }
                  })
                  data.selected = !data.selected
                  // data.checked = !data.checked
                  _this.selectData = []
                  _this.selectData.push(data)
                  _this.onSelectChange(data, data)
                }
                // data.checked = !data.checked
              }, 200)
            }
          },
          dblclick: () => {
            if (!this.disabledAll && !data.disabledEdit) {
              if (this.timeId) {
                window.clearTimeout(this.timeId)
                this.timeId = null
              }
              this.editTree(data)
            }
          },
          contextmenu: (e) => {
            if (!this.disabledAll) {
              this.disabledEdit = data.disabledEdit
              this.disabledDelete = data.disabledDelete
              this.disabledAdd = data.disabledAdd
              e.preventDefault()
              this.nodeInfo = data
              this.root = root
              this.node = node
              this.$refs.contentMenu.$refs.reference = event.target
              this.$refs.contentMenu.currentVisible = !this.$refs.contentMenu.currentVisible
            }
          }
        }
      }, [
        h('span', [
          h(`${data.editState ? '' : 'span'}`, data.title),
          h(`${data.editState ? 'input' : ''}`, {
            class: 'ivu-input ivu-input-small ivu-input-edit',
            attrs: {
              value: `${data.editState ? data.title : ''}`,
              autofocus: true,
              maxlength: this.maxLength
            },
            style: {
              width: `${this.inputWidth}rem`,
              cursor: 'auto'
            },
            on: {
              change: (event) => {
                this.inputContent = event.target.value
              },
              blur: () => {
                this.editNode(data)
              }
            }
          })
        ])
      ])
    },
    // 双击节点时执行的事件
    editTree (data) {
      event.stopPropagation()
      this.inputContent = data.title
      this.oldName = data.title
      this.oldData = {
        checked: data.checked,
        children: data.children,
        editState: data.editState,
        expand: data.expand,
        loading: data.loading,
        nodeKey: data.nodeKey,
        selected: data.selected,
        title: data.title,
        value: data.value
      }
      this.setStates(data) // 改变状态，显示编辑框
      this.$nextTick(() => { // 编辑框出现后自动聚焦
        this.$refs.tree.$el.getElementsByClassName('ivu-input-edit')[0].focus()
      })
    },
    // 控制Tree当前状态函数
    setStates (data) {
      var editState = data.editState
      if (editState) {
        this.$set(data, 'editState', false)
      } else {
        this.$set(data, 'editState', true)
      }
    },
    // 节点失焦时执行
    editNode (data) {
      if (!this.inputContent) {
        this.$Message.warning('当前输入有误')
      } else {
        if (this.oldName !== this.inputContent) {
          data.title = this.inputContent
          this.setStates(data)
        } else {
          this.setStates(data)
        }
      }
      // 返回的参数  全部数据/修改前的数据/修改后的数据
      this.$emit('edit-node', this.$attrs.data, this.oldData, data)
    },
    changeClick (value) {
      if (value === 'edit') {
        this.editTree(this.nodeInfo)
      } else if (value === 'add') {
        this.addNode()
      } else if (value === 'delete') {
        this.deleteNode()
      }
    },
    // 添加新节点
    addNode () {
      event.stopPropagation()
      const children = this.nodeInfo.children || []
      let data = {
        title: '新建节点',
        expand: true,
        value: '新建节点',
        parentValue: this.nodeInfo.value
      }
      children.push(data)
      this.$set(this.nodeInfo, 'children', children)
      // 返回的参数  全部数据/新加的数据/父节点
      this.$emit('add-node', this.$attrs.data, data, this.nodeInfo)
    },
    // 删除节点
    deleteNode () {
      event.stopPropagation()
      const parentKey = this.root.find(el => el === this.node).parent
      const parent = this.root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(this.nodeInfo)
      let data = parent.children[index]
      parent.children.splice(index, 1)
      // 返回的参数  全部数据/删除的数据
      this.$emit('delete-node', this.$attrs.data, data)
    },
    handleQuery () {
      this.$emit('on-query', this.queryModel)
    },
    handleReset () {
      this.$emit('on-reset')
    },
    onSelectChange (selectData, data) {
      this.$emit('on-select-change', selectData, data)
    }
  }
}
</script>

<style>
</style>
