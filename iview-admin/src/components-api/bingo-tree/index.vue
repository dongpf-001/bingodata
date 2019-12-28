<template>
    <div class="tree-wrapper">
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
      dragstartData: '', // 拖拽的节点数据
      dropPosition: '', // 节点的位置
      dragOverClass: '', // 0：目标节点内  -1：目标节点上   1：目标节点下
      overNodeKey: '', // 拖拽经过的节点
      nodeIndex: '' // 目标节点的角标，
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
    },
    deleteNodeBefore: { // 删除前的方法，回调
      type: Function,
      default: (data1, data2, callback) => {
        callback()
      }
    },
    onDragBefore: { // 拖拽前的方法，回调
      type: Function,
      default: (data1, data2, data3, callback) => {
        callback()
      }
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h('span', {
        class: {
          'ivu-tree-title ivu-tree-title-selected': (data.selected || data.checked) && !this.$attrs.showCheckbox,
          'ivu-tree-title': !((data.selected || data.checked) && !this.$attrs.showCheckbox),
          'tree-drag-over': this.overNodeKey === data.value && this.dragOverClass === 0,
          'tree-drag-over-top': this.overNodeKey === data.value && this.dragOverClass === -1 && this.nodeIndex === 0,
          'tree-drag-over-bottom': this.overNodeKey === data.value && this.dragOverClass === 1
        },
        style: {
          display: 'inline-block',
          lineHeight: '1.1rem',
          cursor: 'pointer',
          border: '1px solid transparent'
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
          dragenter: () => this.handleDragEnter(root, node, data),
          dragover: () => this.handleDragOver(root, node, data),
          dragleave: () => this.handleLeave(root, node, data),
          dragend: () => this.handleDragEnd(root, node, data),
          drop: () => this.handleDrop(root, node, data)
        }
      }, [
        h('div', {
          class: 'tree-span'
        }, [
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
      let _this = this
      // 回调删除
      if (this.deleteNodeBefore && (typeof this.deleteNodeBefore === 'function')) {
        _this.deleteNodeBefore.apply(this, [this.$attrs.data, this.node, function () {
          const parentKey = _this.root.find(el => el === _this.node).parent
          const parent = _this.root.find(el => el.nodeKey === parentKey).node
          const index = parent.children.indexOf(_this.nodeInfo)
          let data = parent.children[index]
          parent.children.splice(index, 1)
          // 返回的参数  全部数据/删除的数据
          _this.$emit('delete-node', _this.$attrs.data, data)
        }])
      }
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
    handleDragEnter (root, node, data) {
      const event = window.event || arguments[0]
      this.overNodeKey = data.value
    },
    handleDragOver (root, node, data) {
      const event = window.event || arguments[0]
      event.preventDefault()
      // 获取目标节点对应的角标
      if (!(node.nodeKey === 0)) {
        const source_parentKey = root.find(el => el === node).parent
        const source_parent = root.find(el => el.nodeKey === source_parentKey).node
        this.nodeIndex = source_parent.children.indexOf(data)
      } else {
        this.nodeIndex = ''
      }
      if (this.overNodeKey === data.value) {
        this.dropPosition = this.calDropPosition(event) // 放置标识0，-1,1
        this.dragOverClass = this.setDragOverClass(data)
      }
    },
    handleLeave (root, node, data) {
      const event = window.event || arguments[0]
      this.dragOverClass = ''
    },
    // 计算拖拽节点的放置方式0（作为目标节点的子节点），-1（放置在目标节点的前面）,1（放置在目标节点的后面）
    calDropPosition (e) {
      var offsetTop = this.getOffset(e.target).top
      var offsetHeight = e.target.offsetHeight
      var pageY = e.pageY
      var gapHeight = 0.2 * offsetHeight
      if (pageY > offsetTop + offsetHeight - gapHeight) {
        // 放在目标节点后面-同级
        return 1
      }
      if (pageY < offsetTop + gapHeight) {
        // 放在目标节点前面-同级
        return -1
      }
      // 放在目标节点里面-作为子节点
      return 0
    },
    // 获取元素到文档顶部和左边的距离
    getOffset (ele) {
      if (!ele.getClientRects().length) {
        return { top: 0, left: 0 }
      }
      var rect = ele.getBoundingClientRect()
      if (rect.width || rect.height) {
        var doc = ele.ownerDocument
        var win = doc.defaultView
        var docElem = doc.documentElement
        return {
          // 元素距离视窗顶部距离，滚动高度，元素边框厚度
          top: rect.top + win.pageYOffset - docElem.clientTop,
          left: rect.left + win.pageXOffset - docElem.clientLeft
        }
      }
      return rect
    },
    setDragOverClass (data) {
      var pos = this.dropPosition
      if (this.overNodeKey !== data.value) {
        return
      }
      if (pos === 0) {
        return 0
      } else if (pos === -1) {
        return -1
      } else if (pos === 1) {
        return 1
      }
      return ''
    },
    handleDragEnd (root, node, data) {
      const event = window.event || arguments[0]
      event.preventDefault()
      this.dragOverClass = ''
    },
    handleDrop (root, node, data) {
      // root 根
      // node 移动的最终节点
      // data 移动的最终节点的数据
      // target_children 最终节点的子节点  最终+1
      // source_parent 移动节点的父节点 最终-1
      event.preventDefault()
      // this.dragOverClass = ''
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
      if (this.onDragBefore && (typeof this.onDragBefore === 'function')) {
        _this.onDragBefore.apply(this, [root, _this.dragstartData, data, function () {
          if (_this.dragOverClass === 0) { // 拖拽到节点上。
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
            _this.$emit('on-drag', root, _this.dragstartData, data)
          } else if (_this.dragOverClass === 1 || _this.dragOverClass === -1) { // 拖拽到目标节点下面或上面
            // 拖拽到同级兄弟节点
            const source_parentKey = root.find(el => el === _this.dragstartNode).parent // 拖拽节点的父节点
            const source_parent = root.find(el => el.nodeKey === source_parentKey).node.children
            const index = source_parent.indexOf(_this.dragstartData)
            source_parent.splice(index, 1)
            let target_parent = []
            if (node.nodeKey === 0) { // 判断目标节点是否是根节点
              target_parent = data.children
              _this.dragstartNode.node.parentValue = 0 // 改变拖拽节点父节点的值
            } else {
              const target_parentKey = root.find(el => el === node).parent // 目标节点的父节点
              target_parent = root.find(el => el.nodeKey === target_parentKey).node.children
              // 改变拖拽节点父节点的值
              _this.dragstartNode.node.parentValue = root.find(el => el.nodeKey === target_parentKey).node.value
            }
            const data_index = target_parent.indexOf(data)
            if (_this.dragOverClass === 1) {
              target_parent.splice(data_index + 1, 0, _this.dragstartData) // 第0个位置添加
            } else if (_this.dragOverClass === -1) {
              target_parent.splice(0, 0, _this.dragstartData) // 第0个位置添加
            }
            _this.$emit('on-drag', root, _this.dragstartData, data)
          }
        }])
      }
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

<style lang="less">
  .tree-wrapper .ivu-tree ul li {
    margin: 0!important;
  }
  .tree-span {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .tree-wrapper .ivu-checkbox-wrapper {
    margin-top: 4px;
  }
  .tree-drag-over {
    background-color: #5295E7;
    color: white;
    /*border: 2px #5295E7 solid;*/
  }
  .tree-drag-over-top {
    border-top: 1px red solid!important;
    border-radius: 0!important;
  }
  .tree-drag-over-bottom {
    border-bottom: 1px #5295E7 solid!important;
    border-radius: 0!important;
  }
</style>
