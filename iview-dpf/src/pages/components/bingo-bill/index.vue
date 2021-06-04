<template>
    <div class="content-bill">
        <bingo-bill billName="project" :tabs="tabs" :mode="mode" active="two" @on-save="save" :isScroll="isScroll">
            <div slot="bill-title">
                我是一个标题
            </div>
            <div slot="one" ref="one" style="height:100%" :layData="layData">
                <bingo-form :col="query.col" :labelWidth="query.labelWidth" :rules="rules" :data="data"
                            @on-button-one="save" :button="query.button">
                    <bingo-grid-item v-if="layData.status1.show">
                        <FormItem :label="layData.status1.label" prop="status1" label-for="status1">
                            <Input v-model="data.status1"/>
                        </FormItem>
                    </bingo-grid-item>
                    <bingo-grid-item v-if="layData.status2.show">
                        <FormItem :label="layData.status2.label" prop="status2" label-for="status2">
                            <Input v-model="data.status2"/>
                        </FormItem>
                    </bingo-grid-item>
                    <bingo-grid-item v-if="layData.status3.show">
                        <FormItem :label="layData.status3.label" label-for="status3">
                            <Input v-model="data.status3"/>
                        </FormItem>
                    </bingo-grid-item>
                    <bingo-grid-item v-if="layData.status4.show">
                        <FormItem :label="layData.status4.label" label-for="status4">
                            <Input v-model="data.status4"/>
                        </FormItem>
                    </bingo-grid-item>
                    <bingo-grid-item v-if="layData.status5.show">
                        <FormItem :label="layData.status5.label" label-for="status5">
                            <Input v-model="data.status5"/>
                        </FormItem>
                    </bingo-grid-item>
                </bingo-form>
            </div>
            <div slot="one1" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                <Divider>详细描述</Divider>
                <h3>props</h3>
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <div slot="one2" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                <Divider>详细描述aaa</Divider>
                <h3>props</h3>
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <div slot="two" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                <bingo-tabs value="name1">
                    <TabPane label="标签一" name="name1">标签一的内容</TabPane>
                    <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                    <TabPane label="标签三" name="name3">标签三的内容</TabPane>
                    <TabPane label="标签四" name="name4">标签四的内容</TabPane>
                    <TabPane label="标签五" name="name5">标签五的内容</TabPane>
                    <TabPane label="标签六" name="name6">标签六的内容</TabPane>
                    <TabPane label="标签七" name="name7">标签七的内容</TabPane>
                </bingo-tabs>
            </div>
            <div slot="three" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ three
            </div>
            <div slot="four" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                <svg aria-hidden="true" width="41px" height="41px" style="margin-top: -7px;margin-left: -3px;">
                    <use xlink:href="#icondanjusvg3" width="100%"></use>
                </svg>
            </div>
            <div slot="five" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ five
            </div>
            <div slot="liu" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 六
            </div>
            <div slot="qi" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 七
            </div>
            <div slot="ba" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 八
            </div>
            <div slot="jiu" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 九
            </div>
            <div slot="shi" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 十
            </div>
            <div slot="shiyi" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 十一
            </div>
            <div slot="shier" :style="isScroll ? 'height: 500px' : 'height: 100%'">
                ------------ 十二
            </div>
        </bingo-bill>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isScroll: false, // 是否有滚动
                tabs: [
                    {name: 'one', title: '基本信息', showLayout: true},
                    {name: 'two', title: '单据第二', icon: 'ios-people', hideTitleName: true},
                    {name: 'three', title: '单据第三个数字超长号三个数字超长号', icon: 'ios-stats', hideTitle: true},
                    {name: 'four', title: '单据第四', icon: 'ios-construct'},
                    {name: 'five', title: '单据第五', icon: 'ios-construct'},
                    {name: 'liu', title: '单据第六', icon: 'ios-construct'},
                    // {name: 'qi', title: '单据第七', icon: 'ios-construct'},
                    // {name: 'ba', title: '单据第八', icon: 'ios-construct'},
                    // {name: 'jiu', title: '单据第九', icon: 'ios-construct'},
                    // {name: 'shi', title: '单据第十', icon: 'ios-construct'},
                    // {name: 'shiyi', title: '单据第十一', icon: 'ios-construct'},
                    // {name: 'shier', title: '单据第十二', icon: 'ios-construct'},
                ],
                tabs1: [
                    {name: 'one', title: '单据第一', show: false, drop: true},
                    {name: 'one1', title: '单据11', show: true, parentName: 'one'},
                    {name: 'one2', title: '单据22', show: false, parentName: 'one'},
                    {name: 'one3', title: '单据33', show: false, parentName: 'one'},
                    {name: 'two', title: '单据第二个数字超长号哈哈', icon: 'ios-people'},
                    {name: 'three', title: '单据第三', icon: 'ios-stats'},
                    {name: 'four', title: '单据第四', icon: 'ios-construct'},
                ],
                mode: 'left',
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
                },
                data: {
                    status1: '',
                    status2: '',
                    status3: '',
                    status4: '',
                    status5: ''
                },
                layData: {
                    status1: { show: true, label: '姓名', required: true, isLink: false },
                    status2: { show: true, label: '我的年龄', required: true, isLink: false },
                    status3: { show: true, label: '公司', required: false, isLink: false },
                    status4: { show: true, label: '职位', required: false, isLink: false },
                    status5: { show: true, label: '性别', required: false, isLink: false },
                },
                rules: {
                    status1: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    status2: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        title: '属性',
                        key: 'props-name',
                        width: 170
                    },
                    {
                        title: '说明',
                        key: 'props-decp',
                        width: 700
                    },
                    {
                        title: '类型',
                        key: 'props-type',
                        width: 170
                    },
                    {
                        title: '默认值',
                        key: 'props-default',
                        width: 170
                    }
                ],
                data1: [
                    {
                        'props-name': 'mode',
                        'props-decp': '单据页展现的形式 ， vertical 为竖向  horizontal为水平',
                        'props-type': '数组',
                        'props-default': 'vertical'
                    },
                    {
                        'props-name': 'tabs',
                        'props-decp': '每个单据的配置',
                        'props-type': '数组',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > name',
                        'props-decp': '每个模块的标识 ,需唯一',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > title',
                        'props-decp': '每个模块显示的标题名称',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > icon',
                        'props-decp': '每个模块显示图标',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > show',
                        'props-decp': '每个模块是否默认显示',
                        'props-type': 'Boolean',
                        'props-default': '默认第一个模块显示'
                    },
                    {
                        'props-name': 'tabs > expend',
                        'props-decp': '每个模块是否展开',
                        'props-type': 'Boolean',
                        'props-default': '默认全部展开'
                    }
                ],
            };
        },
        components: {},
        created() {
        },
        mounted() {

        },
        computed: {},
        watch: {},
        methods: {
            save() {
                this.$refs.form.setValidate(function () {

                });
            }
        }
    };
</script>
<style>

</style>
