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
      disabledAdd: false,
      dragstartNode: '', // 拖拽的节点
      dragstartData: '' // 拖拽的节点数据
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
    },
    draggable: { // 控制是否可以拖拽
      type: Boolean,
      default: false
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
        attrs: {
          draggable: this.draggable && !(node.nodeKey === 0) && !data.disabled && !data.disabledDrag
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
          },
          // 拖拽
          dragstart: () => this.handleDragStart(root, node, data),
          dragover: () => this.handleDragOver(root, node, data),
          dragend: () => this.handleDragEnd(root, node, data),
          drop: () => this.handleDrop(root, node, data)
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
    },
    // 拖拽
    handleDragStart (root, node, data) {
      const event = window.event || arguments[0]
      this.dragstartNode = node
      this.dragstartData = data
    },
    handleDragOver (root, node, data) {
      const event = window.event || arguments[0]
      event.preventDefault()
    },
    handleDragEnd (root, node, data) {
      debugger
      const event = window.event || arguments[0]
      event.preventDefault()
    },
    handleDrop (root, node, data) {
      // root 根
      // node 移动的最终节点
      // data 移动的最终节点的数据
      // target_children 最终节点的子节点  最终+1
      // source_parent 移动节点的父节点 最终-1
      event.preventDefault()
      if (node === this.dragstartNode) return
      // 判断是否拖拽到子节点上了
      const parentNodes = this.findAllParent(data, [root[0].node], [], 0)
      if (parentNodes && parentNodes.length > 0) {
        for (let i = 0; i < parentNodes.length; i++) {
          if (parentNodes[i].value === this.dragstartNode.node.value) {
            return
          }
        }
      }
      let _this = this
      // 拖拽前的操作
      this.$emit('on-drag-before', root, node, data, function () {
        // 拖拽后修改被拖拽节点的parentValue
        _this.dragstartNode.node.parentValue = data.value
        const target_children = data.children || []
        target_children.push(_this.dragstartData)
        _this.$set(data, 'children', target_children)
        const source_parentKey = root.find(el => el === _this.dragstartNode).parent
        const source_parent = root.find(el => el.nodeKey === source_parentKey).node
        const source_index = source_parent.children.indexOf(_this.dragstartData)
        source_parent.children.splice(source_index, 1)
        // console.log(root[0].node, 'data')
        // console.log(_this.dragstartNode.node, '拖拽的节点')
        // console.log(data, '目标节点')
      })

      this.$emit('on-drag', root, this.dragstartNode, data)
    },
    // 获取目标节点的所有父节点
    findAllParent (node, tree, parentNodes = [], index = 0) {
      if (!node || node.nodeKey === 0) {
        return
      }
      this.findParent(node, parentNodes, tree)
      let parentNode = parentNodes[index]
      this.findAllParent(parentNode, tree, parentNodes, ++index)
      return parentNodes
    },
    // 获取目标节点的所有父节点
    findParent (node, parentNodes, tree) {
      for (let i = 0; i < tree.length; i++) {
        let item = tree[i]
        if (item.value === node.parentValue) {
          parentNodes.push(item)
          return
        }
        if (item.children && item.children.length > 0) {
          this.findParent(node, parentNodes, item.children)
        }
      }
    }
  }
}
</script>

<style>
</style>
