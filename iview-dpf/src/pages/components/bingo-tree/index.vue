<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-tree :data="data"
                                title="name"
                                keyId="id"
                                parentValue="parentId"
                                draggable
                                :multiple="showMultiple"
                                :showCheckbox="showMultiple"
                                :editNodeBefore="editNodeBefore"
                                @edit-node="editNode"
                                :deleteNodeBefore="deleteNodeBefore"
                                @delete-node="deleteNode"
                                :onDragBefore="onDragBefore"
                                @on-drag="onDrag">
                        <template #topItem="datas">
                            <DropdownItem name="own" @click.native="ownClick" v-if="!datas.nodeInfo.disabledOwn">
                                <Icon type="md-create" style="margin-right: 10px" size="16"></Icon>自定义(上)
                            </DropdownItem>
                        </template>
                        <template #bottomItem="datas">
                            <DropdownItem name="own" @click.native="ownClick" v-if="!datas.nodeInfo.disabledOwn">
                                <Icon type="md-create" style="margin-right: 10px" size="16"></Icon>自定义(下)
                            </DropdownItem>
                        </template>
                    </bingo-tree>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <span>是否多选：</span><Switch v-model="showMultiple" />
                    <p style="margin-top: 12px">1、数据源data为树形结构</p>
                    <p style="margin-top: 12px">2、作用域插槽topItem和bottomItem可定义右键下拉里面的按钮，分别显示在默认按钮的上面和下面</p>
                    <p style="margin-top: 12px">3、开启draggable可实现拖拽功能，拖拽时显示的蓝色线、红色线和蓝色区域分别代表拖拽到对应
                    目标节点的下方、上方、里面</p>
                    <p style="margin-top: 12px">4、editNodeBefore、deleteNodeBefore、onDragBefore分别代表编辑前、删除前、拖拽前的操作
                    参数有对应的callback方法，代表是否允许执行操作，切记callback不可使用在异步请求里</p>
                    <p style="margin-top: 12px">5、开启树节点多选时，参数需要:multiple="true" :showCheckbox="true"这样写，
                    因为组件里拿这两个属性进行判断了</p>
                    <p style="margin-top: 12px">6、tagColor可定义文字颜色</p>
                    <p style="margin-top: 12px">7、其他详细属性参照右侧例子</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-tree-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                showMultiple: false, // 是否多选
                data: [
                    {
                        name: 'parent 1',
                        expand: true,
                        id: 0,
                        selected: true,
                        checked: false,
                        children: [
                            {
                                name: 'parent 1-1',
                                expand: true,
                                id: 1,
                                parentId: 0,
                                selected: false,
                                checked: false,
                                children: [
                                    {
                                        name: '拖拽1-不可拖拽',
                                        expand: true,
                                        id: 3,
                                        selected: false,
                                        checked: false,
                                        disabledDrag: true,
                                        parentId: 1
                                    },
                                    {
                                        name: '拖拽2-不显示右键',
                                        expand: true,
                                        id: 4,
                                        selected: false,
                                        checked: false,
                                        parentId: 1,
                                        disabledAll: true,
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
                                        name: '拖拽3-不可以拖拽到我身上',
                                        expand: true,
                                        id: 5,
                                        selected: false,
                                        checked: false,
                                        parentId: 2
                                    },
                                    {
                                        name: '拖拽4-不显示默认按钮',
                                        expand: true,
                                        id: 6,
                                        selected: false,
                                        checked: false,
                                        parentId: 2,
                                        disabledEdit: true,
                                        disabledDelete: true,
                                        disabledAdd: true,
                                    },
                                    {
                                        name: '拖拽5-已废弃',
                                        expand: true,
                                        id: 7,
                                        selected: false,
                                        checked: false,
                                        parentId: 2,
                                        tagColor: 'red'
                                    },
                                    {
                                        name: '拖拽6-不显示自定义',
                                        expand: true,
                                        id: 8,
                                        selected: false,
                                        checked: false,
                                        parentId: 2,
                                        disabledOwn: true
                                    }
                                ]
                            },
                            {
                                name: 'parent 1-3',
                                expand: true,
                                id: 10,
                                parentId: 0,
                                selected: false,
                                checked: false,
                                children: [
                                    {
                                        name: '拖拽7',
                                        expand: true,
                                        id: 11,
                                        selected: false,
                                        checked: false,
                                        parentId: 10
                                    },
                                    {
                                        name: '拖拽8-不可选中',
                                        expand: true,
                                        id: 12,
                                        disabled: true,
                                        selected: false,
                                        checked: false,
                                        parentId: 10,
                                    },
                                    {
                                        name: '拖拽9-不可删除',
                                        expand: true,
                                        id: 13,
                                        selected: false,
                                        checked: false,
                                        parentId: 10
                                    },
                                    {
                                        name: '拖拽10-不可编辑',
                                        expand: true,
                                        id: 14,
                                        selected: false,
                                        checked: false,
                                        parentId: 10,
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            // 自定义按钮
            ownClick () {
                this.$Message.success('自定义按钮')
            },
            // 编辑前的方法 data1(全部数据) data2(编辑的数据) name(编辑后的内容) callback(确认编辑的回调)
            editNodeBefore (data1, data2, name, callback) {
                if (data2.id == 14) {
                    this.$Message.warning(data2.name)
                } else {
                    callback()
                }
            },
            // 编辑后的方法
            editNode (allData, oldData, newData) {
                this.$Message.success('编辑成功刷新页面！')
            },
            // 删除前的回调 data1(全部数据) data2(删除的数据) callback(确认删除的回调) callback不支持使用在异步请求里
            deleteNodeBefore (data1, data2, callback) {
                if (data2.node.id == 13) {
                    this.$Message.warning(data2.node.name)
                } else {
                    callback()
                }
            },
            // 删除成功后的方法
            deleteNode (allData, delData) {
                this.$Message.success('删除成功刷新页面！')
            },
            // 拖拽前的操作 allData(所有节点) data1(拖拽的节点) data2(拖拽到目标的节点) callback(拖拽成功后的回调)
            onDragBefore (allData, data1, data2, callback) {
                if (data2.id == 5) {
                    this.$Message.warning(data2.name)
                } else {
                    callback()
                }
            },
            // 拖拽成功后的方法
            onDrag (allData, dragData) {
                this.$Message.success('拖拽成功刷新页面！')
            }
        }
    };
</script>
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
</style>
