<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Divider>bingo-modal</Divider>
                    <Button type="primary" @click="open('modal1')">默认弹窗</Button>
                    <bingo-modal ref="modal1" v-model="showModel.modal1Show" :title="model.title" @ok="ok" @cancel="cancel">
                        默认最小height:240px
                    </bingo-modal>
                    <Button type="primary" @click="open('modal2')">自定义弹窗</Button>
                    <bingo-modal ref="modal2" v-model="showModel.modal2Show" :title="model.title" :height="100" :okText=okText :cancelText=cancelText>
                        height:100px
                    </bingo-modal>
                    <Button type="primary" @click="open('info')">消息</Button>
                    <bingo-modal ref="modal3" v-model="showModel.infoShow" type="info" title="提示头">
                        提示，我是提示的内容
                    </bingo-modal>
                    <Button type="primary" @click="open('success')">成功</Button>
                    <bingo-modal ref="modal4" v-model="showModel.successShow" type="success" title="提示头">
                        成功，我是提示的内容
                    </bingo-modal>
                    <Button type="primary" @click="open('warning')">警告</Button>
                    <bingo-modal ref="modal5" v-model="showModel.warnShow" :setTimeout="setTimeout" type="warning" title="提示头">
                        警告，我是提示的内容
                    </bingo-modal>
                    <Button type="primary" @click="open('error')">错误</Button>
                    <bingo-modal ref="modal6" v-model="showModel.errorShow" setTimeout type="error" title="错误提示">
                        错误，我是提示的内容
                    </bingo-modal>
                    <Button type="primary" @click="open('errorMessage')">错误详情</Button>
                    <bingo-modal ref="modal7" v-model="showModel.errorMessageShow" type="errorMessage" title="错误提示">
                            <span slot="content">
                                Error: 3f79b5a-yf78-ssa0-79ig-15auif60s9no
                            </span>
                    </bingo-modal>
                    <Button type="primary" @click="open('drawer')">抽屉</Button>
                    <bingo-modal ref="modal8" v-model="showModel.drawerShow" type="drawer" title="提示头">
                        demo
                    </bingo-modal>
                    <Button type="primary" @click="open('confirm')">确认提示</Button>
                    <bingo-modal ref="modal9" title="确认提示" @ok="ok" content="确认提示内容"></bingo-modal>
                    
                    <Divider>bingo-modal-edit</Divider>
                    <Button type="primary" @click="open2">标签切换编辑</Button>
                    <bingo-modal-edit ref="modal" v-model="show1" @on-save="onSave" @on-save-cancel="onSaveCancel">
                        弹窗
                    </bingo-modal-edit>
                    <Button type="primary" @click="open3" style="margin-left: 20px">编辑</Button>
                    <bingo-modal-edit ref="modal1" v-model="show2">
                        <h5>周期反馈</h5>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="实体名称" prop="name" label-for="name">
                                    <Input v-model="data.name" placeholder="请输入实体名称"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="数据源" prop="data" label-for="data">
                                    <Input v-model="data.data" placeholder="请输入数据源"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="基类" label-for="base">
                                    <Input v-model="data.base" placeholder="请输入基类"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="显示名称" label-for="showName">
                                    <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <h5>计划跟踪</h5>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="实体名称" prop="name" label-for="name">
                                    <Input v-model="data.name" placeholder="请输入实体名称"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="数据源" prop="data" label-for="data">
                                    <Input v-model="data.data" placeholder="请输入数据源"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="基类" label-for="base">
                                    <Input v-model="data.base" placeholder="请输入基类"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="显示名称" label-for="showName">
                                    <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <h5>零件信息</h5>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="实体名称" prop="name" label-for="name">
                                    <Input v-model="data.name" placeholder="请输入实体名称"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="数据源" prop="data" label-for="data">
                                    <Input v-model="data.data" placeholder="请输入数据源"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="基类" label-for="base">
                                    <Input v-model="data.base" placeholder="请输入基类"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="显示名称" label-for="showName">
                                    <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <h5>会议纪要</h5>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="实体名称" prop="name" label-for="name">
                                    <Input v-model="data.name" placeholder="请输入实体名称"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="数据源" prop="data" label-for="data">
                                    <Input v-model="data.data" placeholder="请输入数据源"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="基类" label-for="base">
                                    <Input v-model="data.base" placeholder="请输入基类"/>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="显示名称" label-for="showName">
                                    <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                    </bingo-modal-edit>
                    <Button type="primary" @click="open4" style="margin-left: 20px">查询</Button>
                    <bingo-modal-edit ref="modal2" v-model="show3" :footer-hide="false" :showToolbar="false" :width="width">
                        <Tabs type="card">
                            <TabPane label="常规查询">
                                <bingo-form :col="query.col3" :labelWidth="query.labelWidth"
                                            ref="form" :button="query.button">
                                    <bingo-grid-item>
                                        <FormItem label="实体名称" prop="name" label-for="name">
                                            <Input v-model="data.name" placeholder="请输入实体名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="数据源" prop="data" label-for="data">
                                            <Input v-model="data.data" placeholder="请输入数据源"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="基类" label-for="base">
                                            <Input v-model="data.base" placeholder="请输入基类"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="显示名称" label-for="showName">
                                            <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="实体名称" prop="name" label-for="name">
                                            <Input v-model="data.name" placeholder="请输入实体名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="数据源" prop="data" label-for="data">
                                            <Input v-model="data.data" placeholder="请输入数据源"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="基类" label-for="base">
                                            <Input v-model="data.base" placeholder="请输入基类"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="显示名称" label-for="showName">
                                            <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="实体名称" prop="name" label-for="name">
                                            <Input v-model="data.name" placeholder="请输入实体名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="数据源" prop="data" label-for="data">
                                            <Input v-model="data.data" placeholder="请输入数据源"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="基类" label-for="base">
                                            <Input v-model="data.base" placeholder="请输入基类"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                    <bingo-grid-item>
                                        <FormItem label="显示名称" label-for="showName">
                                            <Input v-model="data.showName" placeholder="请输入显示名称"/>
                                        </FormItem>
                                    </bingo-grid-item>
                                </bingo-form>
                            </TabPane>
                            <TabPane label="高级查询">
                            </TabPane>
                        </Tabs>
                        <span slot="footer">
                                <Button type="primary">查询</Button>
                                <Button @click="close">取消</Button>
                            </span>
                    </bingo-modal-edit>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、下拉表格必须传入api和columns，且api接口名称必须叫getList，接口根据分页查询，数据返回格式是data[rows:{}]</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-modal-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                setTimeout: 4000,
                showModel: {
                    modal1Show: false,
                    modal2Show: false,
                    errorShow: false,
                    infoShow: false,
                    warnShow: false,
                    successShow: false,
                    errorMessageShow: false,
                    drawerShow: false,
                    confirmShow: false,
                },
                show1: false,
                show2: false,
                show3: false,
                width: 600,
                okText:'保存',
                cancelText:'取消',
                model: {
                    show: true,
                    title: '编辑 ',
                    closable: true,
                    maskClosable: true,
                    draggable: false
                },
                tabs: ['基础', '属性'],
                query: {
                    col: 3,
                    col3: 2,
                    labelWidth: 90,
                    button: false
                },
                data: {
                    name: '',
                    data: '',
                    base: '',
                    showName: '',
                    remark: ''
                },
                rules: {
                    name: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                }
            }
        },
        computed: {},
        methods: {
            ok () {
                this.$Message.info('Clicked  ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            open (value) {
                if (value === 'modal1') {
                    this.showModel.modal1Show = true;
                } else if (value === 'modal2') {
                    this.showModel.modal2Show = true;
                } else if (value === 'info') {
                    this.showModel.infoShow = true;
                } else if (value === 'success') {
                    this.showModel.successShow = true;
                } else if (value === 'warning') {
                    this.showModel.warnShow = true;
                } else if (value === 'error') {
                    this.showModel.errorShow = true
                } else if (value === 'errorMessage') {
                    this.showModel.errorMessageShow = true
                } else if (value === 'drawer') {
                    this.showModel.drawerShow = true
                } else if (value === 'confirm') {
                    this.$refs.modal9.confirm();
                }
            },
            save () {
                this.$Message.info('Clicked  save');
            },
            close () {
                this.$refs.modal2.show = false;
            },
            open2 () {
                this.show1 = true;
            },
            open3 () {
                this.show2 = true;
            },
            open4 () {
                this.show3 = true;
            },
            onSave () {
                this.$refs.form.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$Message.success('保存成功');
                    } else {
                        this.$Message.success('保存失败');
                    }
                })
            },
            onSaveCancel () {
                this.$Message.success('保存并关闭');
                this.show1 = false;
            }
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
</style>
