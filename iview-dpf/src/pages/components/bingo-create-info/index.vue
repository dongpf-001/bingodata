<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Button type="primary" @click="open">编辑</Button>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、bingo-create-info组件内已包含bingo-grid-item和bingo-form-item，用的时候直接放在表单最下方即可。</p>
                </div>
            </Split>
        </Card>
    
        <bingo-modal-edit ref="modal" v-model="show">
            <bingo-form :col="query.col" :labelWidth="query.labelWidth" ref="form" :button="query.button">
                <bingo-grid-item>
                    <bingo-form-item label="流程编号：" prop="name" label-for="name">
                        <Input v-model="data.name"  placeholder="请输入流程编号" element-id="name"
                               @keydown.enter.native="searchEnterFun"/>
                    </bingo-form-item>
                </bingo-grid-item>
                <bingo-grid-item>
                    <bingo-form-item label="开始时间：" prop="time">
                        <DatePicker v-model="data.time" type="datetime" placeholder="请选择开始时间" v-width="'100%'"/>
                    </bingo-form-item>
                </bingo-grid-item>
                <bingo-grid-item>
                    <bingo-form-item label="负责人：" prop="owner">
                        <Select v-model="data.owner" placeholder="请选择负责人">
                            <Option value="Aresn">Aresn</Option>
                            <Option value="中小鱼">中小鱼</Option>
                            <Option value="Echo">Echo</Option>
                            <Option value="唐不苦">唐不苦</Option>
                            <Option value="甜筒">甜筒</Option>
                        </Select>
                    </bingo-form-item>
                </bingo-grid-item>
                <bingo-grid-item :colspan="query.col">
                    <bingo-form-item label="任务描述：" prop="desc">
                        <Input v-model="data.desc" type="textarea" placeholder="请输入任务描述"/>
                    </bingo-form-item>
                </bingo-grid-item>
                <bingo-create-info :data="createData"></bingo-create-info>
            </bingo-form>
        </bingo-modal-edit>
    </div>
</template>
<script>
    export default {
        name: 'bingo-select-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                createData: {
                    creator: '刘会胜',
                    createTime: '2019-03-18',
                    modifier: '周杰',
                    modifyTime: '2019-04-22'
                },
                query: {
                    col: 2,
                    labelWidth: 90,
                    button: false
                },
                show: false,
                data: {
                    name: '',
                    status1: '',
                    count: null,
                    date: '',
                    status2: '',
                    status3: '',
                    time: '',
                    owner: '',
                    desc: ''
                },
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            open () {
                this.show = true;
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
