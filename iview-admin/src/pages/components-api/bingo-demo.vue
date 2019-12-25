
<template>
  <div>
    <Tree :data="data5" :render="renderContent" ></Tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data5: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      dragstartNode: '',
      dragstartData: ''
    }
  },
  mounted () {
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        },
        attrs: {
          draggable: 'true'
        },
        on: {
          dragstart: () => this.handleDragStart(root, node, data),
          dragover: () => this.handleDragOver(root, node, data),
          dragend: () => this.handleDragEnd(root, node, data),
          drop: () => this.handleDrop(root, node, data)
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            marginRight: '32px',
            marginLeft: '10px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-create',
              shape: 'circle'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.append(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-remove',
              shape: 'circle'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    append (data) {
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true
      })
      this.$set(data, 'children', children)
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
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
      const event = window.event || arguments[0]
      event.preventDefault()
    },
    handleDrop (root, node, data) {
      debugger
      // root 根
      // node 移动的最终节点
      // data 移动的最终节点的数据
      // target_parent 最终节点的父节点
      // target_children 最终节点的子节点  最终+1
      // source_parent 移动节点的父节点 最终-1
      event.preventDefault()
      if (node === this.dragstartNode) return
      const target_parentKey = root.find(el => el === node).parent
      const target_parent = root.find(el => el.nodeKey === target_parentKey).node
      const target_index = target_parent.children.indexOf(data)
      const target_children = data.children || []
      target_children.push(this.dragstartData)
      this.$set(data, 'children', target_children)
      const source_parentKey = root.find(el => el === this.dragstartNode).parent
      const source_parent = root.find(el => el.nodeKey === source_parentKey).node
      const source_index = source_parent.children.indexOf(this.dragstartData)
      source_parent.children.splice(source_index, 1)
      console.log(this.data5, 'data5')
    }
  }
}
</script>
