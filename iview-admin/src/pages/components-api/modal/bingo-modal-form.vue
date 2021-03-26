<template>
    <div class="ivu-mt-16">
        <Card class="bingo-card ivu-p-8">
            <bingo-modal-form ref="modal" :title="model.title" :col="query.col" :labelWidth="query.labelWidth"
                              :rules="rules" :data="data" :button="false" @on-save="ok">
                <bingo-grid-item>
                    <FormItem label="流程编号：" prop="name" label-for="name">
                        <Input v-model="data.name" placeholder="请输入流程编号" element-id="name"
                               @keydown.enter.native="searchEnterFun"/>
                    </FormItem>
                </bingo-grid-item>
                <bingo-grid-item>
                    <FormItem label="开始时间：" prop="time">
                        <DatePicker v-model="data.time" type="datetime" placeholder="请选择开始时间" v-width="'100%'"/>
                    </FormItem>
                </bingo-grid-item>
                <bingo-grid-item>
                    <FormItem label="负责人：" prop="owner">
                        <Select v-model="data.owner" placeholder="请选择负责人">
                            <Option value="Aresn">Aresn</Option>
                            <Option value="中小鱼">中小鱼</Option>
                            <Option value="Echo">Echo</Option>
                            <Option value="唐不苦">唐不苦</Option>
                            <Option value="甜筒">甜筒</Option>
                        </Select>
                    </FormItem>
                </bingo-grid-item>
                <bingo-grid-item :colspan="query.col">
                    <FormItem label="任务描述：" prop="desc">
                        <Input v-model="data.desc" type="textarea" placeholder="请输入任务描述"/>
                    </FormItem>
                </bingo-grid-item>
            </bingo-modal-form>
        </Card>
        <Card class="ivu-mt-16">
            <Form :model="model" :label-width="120">
                <FormItem label="是否显示弹窗表单">
                    <Button type="primary" @click="open">打开弹窗表单</Button>
                    $refs.modal.show=true;
                </FormItem>
                <FormItem label="一排显示列数">
                    <InputNumber v-model="query.col" style="width: 100%"></InputNumber>
                </FormItem>
                <FormItem label="文本框长度">
                    <Input v-model="query.labelWidth"></Input>
                </FormItem>
                <FormItem label="合并列">
                    例 bingo-grid-item :colspan="2" 合并两列
                </FormItem>
                <FormItem label="title">
                    title 标题显示的内容
                </FormItem>
                <FormItem label="成功回调方法">
                    on-ok 点击确定的回调
                </FormItem>
                <FormItem label="取消回调方法">
                    on-cancel 点击取消的回调
                </FormItem>
                <FormItem label="closable">
                    <Switch v-model="model.closable"/>
                    是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭
                </FormItem>
                <FormItem label="mask-closable">
                    <Switch v-model="model.maskClosable"/>
                    是否允许点击遮罩层关闭
                </FormItem>
                <FormItem label="fullscreen">
                    <Switch v-model="model.fullscreen"/>
                    是否全屏显示
                </FormItem>
                <FormItem label="draggable">
                    <Switch v-model="model.draggable"/>
                    是否可以拖拽移动
                </FormItem>
                <FormItem label="ok-text">
                    确定按钮文字
                </FormItem>
                <FormItem label="cancel-text">
                    取消按钮文字
                </FormItem>
                <FormItem label="width">
                    对话框宽度，对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto。当其值不大于 100 时以百分比显示，大于 100 时为像素
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import bingoForm from '@/components-api/bingo-query/bingo-form'
    import bingoModalForm from '@/components-api/bingo-modal-form'
    import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'

    export default {
        name: 'bingo-modal-form2',
        data() {
            return {
                model: {
                    show: true,
                    title: '这是一个弹窗 ',
                    closable: true,
                    maskClosable: true,
                    draggable: false
                },
                query: {
                    col: 1,
                    labelWidth: 90,
                    button: true
                },
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
                rules: {
                    name: [
                        {required: true, message: '请输入编号', trigger: 'blur'}
                    ]
                }
            }
        },
        components: {
            bingoForm,
            bingoModalForm,
            bingoGridItem
        },
        methods: {
            ok(callback) {
                setTimeout(() => {
                    this.$Message.info('保存成功')
                    callback()
                }, 1000)
            },
            open() {
                this.$refs.modal.show = true
            }
        }
    }
</script>
