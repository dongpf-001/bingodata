export default `<template>
    <div>
        <bingo-tree :data="data"
                    :showCheckbox="showCheckbox"
                    :maxLength="20"
                    :inputWidth="6"
                    :draggable="true"
                    title="name"
                    keyId="id"
                    parenValue="parenValue"
                    :delete-node-before="deleteNodeBefore"
                    :edit-node-before="editNodeBefore"
                    @edit-node="editNode"
                    :on-drag-before="onDrop"
                    @on-drag="onDrag">
        </bingo-tree>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showCheckbox: true,
      data: [
        {
            name: 'parent 1',
            expand: true,
            id: 0,
            selected: false,
            checked: false,
            children: [
                {
                    name: '不可选中',
                    expand: true,
                    id: 1,
                    parentId: 0,
                    disabled: true,
                    disabledEdit: true,
                    selected: false,
                    checked: false,
                    children: [
                        {
                            name: '不可拖拽1',
                            expand: true,
                            id: 3,
                            selected: false,
                            checked: false,
                            disabledDrag: true,
                            parentId: 1
                        },
                        {
                            name: '拖拽2',
                            expand: true,
                            id: 4,
                            selected: false,
                            checked: false,
                            parentId: 1
                        }
                    ]
                },
                {
                    name: 'parent 1-2',
                    expand: true,
                    id: 2,
                    disabledDelete: true,
                    disabledAdd: true,
                    parentId: 0,
                    selected: false,
                    checked: false,
                    children: [
                        {
                            name: '不可以拖拽到我身上',
                            expand: true,
                            id: 5,
                            selected: false,
                            checked: false,
                            parentId: 2
                        },
                        {
                            name: '拖拽4',
                            expand: true,
                            id: 6,
                            selected: false,
                            checked: false,
                            parentId: 2
                        },
                        {
                            name: '拖拽5',
                            expand: true,
                            id: 7,
                            selected: false,
                            checked: false,
                            parentId: 2
                        },
                        {
                            name: '拖拽6',
                            expand: true,
                            id: 8,
                            selected: false,
                            checked: false,
                            parentId: 2
                        }
                    ]
                }
            ]
        }
      ],
    }
  },
  methods: {
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
    // 编辑前执行的方法，不可以建重名的,参数：父节点，但钱节点和编辑后的名称
    editNodeBefore (parentData, data, editName, callback) {
        let flag = false
        if (parentData.children) {
            parentData.children.forEach(item => {
                if (item.name === editName && item.name !== data.name) {
                    flag = true
                }
            })
        }
        if (flag) {
            this.$Modal.confirm({
                title: '不可以修改同名'
            });
        } else {
            callback()
        }
    },
    deleteNodeBefore (data, deleteData, callback) {
        if (deleteData.node.name === '拖拽4') {
            return
        } else if (deleteData.node.name === '拖拽5') {
            callback()
        } else {
            callback('真的要删除吗？')
        }
    },
    onDrop (root, node, data, callback) {
        if (!(data.value === 5)) {
            callback()
        }
    },
    onDrag (root, dragData, data) {
        console.log(root[0].node, '根')
        console.log(dragData, '拖拽的节点')
        console.log(data, '目标节点')
    },
  },
  mounted () {

  }
}
</script>
<style>
</style>`
