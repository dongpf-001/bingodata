<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth" :rules="rules"
                                ref="form" :button="query.button">
                        <bingo-grid-item>
                            <FormItem label="下拉单选" prop="model1" label-for="model1">
                                <bingo-select ref="element" v-model="model.model1" :data="datas" :clearable="true"
                                              :filterable="filterable" :label-in-value="labelInValue"
                                              @on-change="onChange" :showSelectAll="true">
                                </bingo-select>
                            </FormItem>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <FormItem label="下拉多选" prop="model2" label-for="model2">
                                <bingo-select ref="element" v-model="model.model2" :data="datas" :maxTagCount="maxTagCount"
                                              :multiple="multiple" :filterable="filterable" :showSelectAll="true"
                                              :labelInValue="labelInValue" @on-change="onChange">
                                </bingo-select>
                            </FormItem>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <FormItem label="远程查询" label-for="model3">
                                <bingo-select ref="element" v-model="model.model3" :data="datas1" :multiple="multiple"
                                              :filterable="filterable" :labelInValue="labelInValue" :remote="remote"
                                              :max-tag-count="2" :showSelectAll="showSelectAll" @on-query-change="queryChange"
                                              :remoteMethod="remoteMethod" :loading="loading" placeholder="请选择">
                                </bingo-select>{{model.model3}}
                            </FormItem>
                        </bingo-grid-item>
                    </bingo-form>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、showSelectAll代表是否全选，多选的时候可开启此功能</p>
                    <p style="margin-top: 12px">2、数据中添加hiddenOption属性代表该数据已被删除，如示例1，数据'上海'已被删除，显示框中可以
                    正常回显，但是下拉选项中已经没有'上海'选项了。</p>
                </div>
            </Split>
        </Card>
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
                query: {
                    col: 1,
                    labelWidth: 90,
                    button: false
                },
                model: {
                    model1: 2,
                    model2: ['1', '2'],
                    model3: '',
                },
                maxTagCount: 5, // 多选时显示框上最多显示的个数
                multiple: true, // 多选
                filterable: true, // 是否支持搜索
                labelInValue: true,
                loading: false,
                remote: true, // 远程查询
                showSelectAll: false,
                datas: [
                    {
                        value: 1,
                        label: '北京',
                        disabledOption: true // 控制选项是否可以选择
                    },
                    {
                        value: 2,
                        label: '上海',
                        hiddenOption: true // 代表该数据在数据库中是否已被删除
                    },
                    {
                        value: 3,
                        label: '广州'
                    },
                    {
                        value: 4,
                        label: '天津'
                    },
                    {
                        value: 5,
                        label: '长春'
                    }
                ],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
                data1: []
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            remoteMethod (query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.datas1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.datas1 = [];
                }
                this.showSelectAll = true
            },
            queryChange (query) {
                this.$Message.info(query);
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
