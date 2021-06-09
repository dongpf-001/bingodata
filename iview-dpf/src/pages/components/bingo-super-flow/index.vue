<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    <bingo-super-flow ref="superFlow"
                                      :node-list="nodeList"
                                      :lineDrop="false"
                                      :draggable="false"
                                      :link-list="linkList">
                        <template v-slot:node="{meta}">
                            <div :class="`flow-node flow-node-${meta.typeCode}`" :style="meta.isImportant ? 'background: lightgreen' : ''">
                                <div class="div-center">
                                    <p>{{meta.type}}</p>
                                    <p>{{meta.desc}}</p>
                                </div>
                            </div>
                        </template>
                    </bingo-super-flow>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、必备属性nodeList（节点），和linkList（连线）</p>
                    <p style="margin-top: 12px">2、nodeList中必备属性width，height，coordinate（节点坐标）</p>
                    <p style="margin-top: 12px">2、linkList中必备属性startId（开始节点），endId（结束节点），startAt（连线开始位置），endAt（连线结束位置）</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    // 节点位置 固定数据
    const nodeIndex = [
        [-548, -379], [-333, -379], [-137, -379], [66, -379], [283, -379], [283, -163], [66, -163], [-134, -163], [-333, -163], [-548, -163]
    ]
    // 连线位置 固定数据
    const linkIndex = [
        {startAt: [160, 40], endAt: [0, 40]},
        {startAt: [160, 40], endAt: [0, 40]},
        {startAt: [160, 40], endAt: [0, 40]},
        {startAt: [160, 40], endAt: [0, 40]},
        {startAt: [80, 80], endAt: [80, 0]},
        {startAt: [0, 40], endAt: [160, 40]},
        {startAt: [0, 40], endAt: [160, 40]},
        {startAt: [0, 40], endAt: [160, 40]},
        {startAt: [0, 40], endAt: [160, 40]},
        {startAt: [0, 40], endAt: [160, 40]}
    ]
    export default {
        name: 'bingo-super-flow-demo',
        components: {
        },
        data () {
            return {
                split1: 0.6,
                nodeList: [
                    {
                        id: 1,
                        meta: {
                            type: '开始',
                            typeCode: 'step1',
                            desc: ''
                        }
                    },
                    {
                        id: 2,
                        meta: {
                            type: '请假申请',
                            typeCode: 'step2',
                            desc: '请填好申请信息！'
                        }
                    },
                    {
                        id: 3,
                        meta: {
                            type: '发起申请',
                            typeCode: 'step3',
                            desc: ''
                        }
                    },
                    {
                        id: 4,
                        meta: {
                            type: '组长审批',
                            typeCode: 'step4',
                            desc: ''
                        }
                    },
                    {
                        id: 5,
                        meta: {
                            type: '科长审批',
                            typeCode: 'step5',
                            desc: '科长不怎么同意'
                        }
                    },
                    {
                        id: 6,
                        meta: {
                            type: '部长审批',
                            typeCode: 'step6',
                            desc: '',
                            isImportant: true
                        }
                    },
                    {
                        id: 7,
                        meta: {
                            type: '申请记录',
                            typeCode: 'step7',
                            desc: '记录申请信息'
                        }
                    },
                    {
                        id: 8,
                        meta: {
                            type: '申请反馈',
                            typeCode: 'step8',
                            desc: ''
                        }
                    },
                    {
                        id: 9,
                        meta: {
                            type: '已批准',
                            typeCode: 'step9',
                            desc: ''
                        }
                    },
                    {
                        id: 10,
                        meta: {
                            type: '结束',
                            typeCode: 'step10',
                            desc: ''
                        }
                    },
                ], // 节点数据集合
                linkList: [], // 线数据集合
            }
        },
        computed: {},
        methods: {
        },
        created () {},
        mounted () {
            for (let i=0; i<this.nodeList.length; i++) {
                this.nodeList[i].coordinate = nodeIndex[i] // 节点坐标位置
                this.nodeList[i].width = 130 // 节点奎安渡
                this.nodeList[i].height = 70 // 节点高度
                if (i+1 < this.nodeList.length) { // 构造线
                    this.linkList.push({
                        id: i + 1,
                        startId: this.nodeList[i].id,
                        endId: this.nodeList[i+1].id,
                        startAt: linkIndex[i].startAt,
                        endAt: linkIndex[i].endAt,
                        meta: null
                    })
                }
            }
        },
    };
</script>
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
    .div-center { // 水平垂直居中
        height: 100%;
        width: 100%;
        text-align: center;
        p {
            padding-top: 8px;
        }
    }
    .flow-node {
        height: 100%;
    }
    .flow-node-step5 {
        .div-center {
            color: red;
        }
    }
</style>
