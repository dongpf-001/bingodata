<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <h3>自定义render示例</h3>
                    <bmsa-org-tree :data="data1" :isRender="true"></bmsa-org-tree>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、需要构造树形结构数据，isRender默认是false，代表组件内部给渲染节点，显示数据中label和name字段</p>
                    <p style="margin-top: 12px">2、将isRender树形设置成true，可根据自己的业务自定义render来渲染每个节点</p>
                    <p style="margin-top: 12px">3、isRender默认为false时，组件自带双击节点、右键节点功能，目前处于开发中。</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    import bmsaOrgTree from '@/components/bmsa-org-tree'
    export default {
        name: 'bmsa-org-tree-demo',
        components: {
            bmsaOrgTree
        },
        data () {
            return {
                split1: 0.7,
                data1: {},
                data: [
                    {id: 1, parentId: 0, label: 'ET部门名称', level: 1},
                    {id: 2, parentId: 1, label: 'ETA部门名称', level: 2},
                    {id: 3, parentId: 1, label: 'ETP部门名称', level: 2},
                    {id: 4, parentId: 2, label: 'ETA K3', level: 3},
                    {id: 5, parentId: 3, label: 'ETP K3', level: 3},
                    {id: 6, parentId: 3, label: 'ETP K5', level: 3},
                    {id: 7, parentId: 4, label: '莫可可', level: 4, phone: '123456'},
                    {id: 8, parentId: 5, label: '宋小林', level: 4, phone: '22222'},
                    {id: 9, parentId: 6, label: '马大鹏', level: 4, phone: '33333'},
                    {id: 10, parentId: 6, label: '马小鹏', level: 4, phone: '44444'}
                ],
            }
        },
        computed: {},
        created () {},
        mounted () {
            this.data = this.arrayToJson(this.data)
            this.data1 = this.data[0] // 组件数据源是{id: 0, children: []} 这样的，所以直接取this.data[0]
        },
        methods: {
            // 把数据构造成树形结构数据
            arrayToJson(treeArray) {
                // 先给所以的节点添加上render，render就是每个节点显示的内容
                // node-div就是每个卡片，可自定义高度和宽度
                // (h, m) h用于构造render， m就是每条数据，可获取到相应的字段
                treeArray.forEach(item => {
                    item.render = (h, m) => {
                        return h('div', {
                            class: m.level==1 ? 'node-div' : m.level==2 ? 'node-div huise' : m.level==3 ? 'node-div huangse' : m.level==4 ? 'node-div lvse' : 'node-div'
                        }, [
                            h('p', { // label字段
                                class: 'node-label'
                            }, m.label),
                            h('p', { // phone字段，有这个字段的话才显示
                                class: 'node-phone',
                            }, m.phone)
                        ])
                    }
                })
                
                // 构造树形结构数据
                var r = [];
                var tmpMap = {};
                for (var i = 0, l = treeArray.length; i < l; i++) {
                    // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
                    tmpMap[treeArray[i]['id']] = treeArray[i];
                }
                for (i = 0, l = treeArray.length; i < l; i++) {
                    var key = tmpMap[treeArray[i]['parentId']];
                    //循环每一条数据的 fid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
                    //如果这一项数据属于哪个数据的子级
                    if (key) {
                        // 如果这个数据没有children
                        if (!key['children']) {
                            key['children'] = [];
                            key['children'].push(treeArray[i]);
                            // 如果这个数据有children
                        } else {
                            key['children'].push(treeArray[i]);
                        }
                    } else {
                        //如果没有这个Key值，就代表找不到属于哪个数据，那就代表没有父级,直接放在最外层
                        r.push(treeArray[i]);
                    }
                }
                return r;
            }
        }
    };
</script>
<style lang="less" scoped>
    /deep/ .node-div {
        width: 100px;
        height: 60px;
    }
    /deep/ .huise {
        background: #ccc;
    }
    /deep/ .huangse {
        background: lightgoldenrodyellow;
    }
    /deep/ .lvse {
        background: lightgreen;
    }
    /deep/ .node-label { // label字段
        padding-top: 8px;
    }
    /deep/ .node-phone { // phone字段
        margin-top: 8px;
    }
</style>
