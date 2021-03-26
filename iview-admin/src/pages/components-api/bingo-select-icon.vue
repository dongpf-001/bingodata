<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split" style="height: 350px">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth" ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="图标">
                                    <bingo-select-icon @on-select-click="selectClick"
                                                       :showValue="showValue">
                                    </bingo-select-icon>
                                    {{model}}
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <Button type="primary" @click="open" style="margin-left: 20px">抽屉</Button>
                        <bingo-modal ref="modal8" v-model="drawerShow" type="drawer" :width="400" title="提示头">
                            <bingo-form :col="1" :labelWidth="query.labelWidth" ref="form" :button="query.button">
                                <bingo-grid-item>
                                    <FormItem label="图标">
                                        <bingo-select-icon @on-select-click="selectClick"
                                                           :showValue="showValueDrawer">
                                        </bingo-select-icon>
                                    </FormItem>
                                </bingo-grid-item>
                            </bingo-form>
                        </bingo-modal>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        <Button class="btn-copy" @click="handleCopy">copy</Button>
                        <pre v-highlight>
                            <code>{{html1}}</code>
                        </pre>
                    </div>
                </Split>
            </div>
            <Divider>详细描述</Divider>
            <h3>props</h3>
            <Table border :columns="columns1" :data="data1"></Table>
            <br/>
            <h3>event</h3>
            <Table border :columns="columns2" :data="data2"></Table>
        </Card>
    </div>
</template>

<script>
    import bingoSelectIcon from '@/components-api/bingo-select-icon'
    import bingoForm from '@/components-api/bingo-query/bingo-form'
    import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
    import bingoModal from '@/components-api/bingo-modal'

    export default {
        name: 'bingo-radio2',
        data() {
            return {
                model: '',
                drawerShow: false,
                showValue: {
                    model: 'svg',
                    before: '#icona',
                    after: '#iconicon-test5'
                },
                showValueDrawer: {},
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
                },
                split: 0.4,
                html1: '<bingo-select-icon @on-select-click="selectClick"\n' +
                        '                      :showValue="showValue">\n' +
                        '</bingo-select-icon>',
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
                        'props-name': 'showValue',
                        'props-decp': '显示的默认值，例如：{\n' +
                                '                    model: \'svg\',\n' +
                                '                    before: \'#icona\',\n' +
                                '                    after: \'#iconicon-test5\'\n' +
                                '                }',
                        'props-type': 'String',
                        'props-default': ''
                    }
                ],
                columns2: [
                    {
                        title: '事件名',
                        key: 'event-name',
                        width: 170
                    },
                    {
                        title: '说明',
                        key: 'event-decp',
                        width: 870
                    },
                    {
                        title: '返回值',
                        key: 'return-val',
                        width: 170
                    }
                ],
                data2: [
                    {
                        'event-name': 'on-select-click',
                        'event-decp': '选择图标后执行的方法，若是svg类型则返回三个参数，若是其他类型则返回两个参数',
                        'return-val': '...'
                    }
                ]
            }
        },
        created() {
        },
        components: {
            bingoSelectIcon, bingoForm, bingoGridItem, bingoModal
        },
        methods: {
            selectClick(type, icon, icon2) { // 若是svg类型，则有三个参数，分别是类型，点击前的图标，点击后的图标
                this.model = type + ', ' + icon + ', ' + icon2
            },
            handleCopy(html) {
                let that = this
                this.$Copy({
                    text: that.html1
                })
            },
            open() {
                this.drawerShow = true
                this.showValueDrawer = {
                    model: 'svg',
                    before: '#icona',
                    after: '#iconicon-test5'
                }
            }
        }
    }
</script>
<style>
</style>
