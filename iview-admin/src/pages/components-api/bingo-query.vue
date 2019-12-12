<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <div ref="renderCode" class="renderCode">
                            <bingo-query :type="query.types" :col="query.col" :labelWidth="query.labelWidth" @on-submit="getData"
                                         @on-reset="getData">
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                                <bingo-grid-item>
                                    <FormItem label="流程编号" prop="name" label-for="name">
                                        <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"
                                               @keydown.enter.native="searchEnterFun"/>
                                    </FormItem>
                                </bingo-grid-item>
                            </bingo-query>
                        </div>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        <Button class="btn-copy" @click="handleCopy">copy</Button>
                        <pre v-highlight>
                            <code >{{html}}</code>
                        </pre>
                    </div>
                </Split>
            </div>
            <Divider>详细描述</Divider>
            <!--<Form :model="query" :label-width="100">
                <FormItem label="弹出方式">
                    <Select v-model="query.types" @on-change="changeClick">
                        <Option value="float">float</Option>
                        <Option value="modal">modal</Option>
                    </Select>
                    type属性为“float”或“modal”，默认为“modal”或者不填
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
                <FormItem label="展开内容显示">
                    在 slot="collapse" 标签下写
                </FormItem>
            </Form>-->
            <h3>props</h3>
            <Table border :columns="columns1" :data="data1"></Table>
            <br />
            <h3>event</h3>
            <Table border :columns="columns2" :data="data2"></Table>
        </Card>
    </div>
</template>

<script>
import bingoQuery from '@/components-api/bingo-query'
import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
export default {
  name: 'query-form',
  data () {
    return {
      split: 0.2,
      isShowHtml: false,
      html: '<bingo-query :type="query.types" :col="query.col" :labelWidth="query.labelWidth" @on-submit="getData" @on-reset="getData">\n' +
        '    <bingo-grid-item>\n' +
        '        <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '            <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                   @keydown.enter.native="searchEnterFun"/>\n' +
        '        </FormItem>\n' +
        '    </bingo-grid-item>\n' +
        '    <bingo-grid-item>\n' +
        '        <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '            <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                   @keydown.enter.native="searchEnterFun"/>\n' +
        '        </FormItem>\n' +
        '    </bingo-grid-item>\n' +
        '    <bingo-grid-item>\n' +
        '        <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '            <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                   @keydown.enter.native="searchEnterFun"/>\n' +
        '        </FormItem>\n' +
        '    </bingo-grid-item>\n' +
        '    <div slot="collapse">\n' +
        '        <bingo-grid-item>\n' +
        '            <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '                 <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                       @keydown.enter.native="searchEnterFun"/>\n' +
        '            </FormItem>\n' +
        '        </bingo-grid-item>\n' +
        '        <bingo-grid-item>\n' +
        '            <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '                 <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                       @keydown.enter.native="searchEnterFun"/>\n' +
        '            </FormItem>\n' +
        '        </bingo-grid-item>\n' +
        '        <bingo-grid-item>\n' +
        '            <FormItem label="流程编号" prop="name" label-for="name">\n' +
        '                 <Input v-model="datas.name" placeholder="请输入流程编号" element-id="name"\n' +
        '                                       @keydown.enter.native="searchEnterFun"/>\n' +
        '            </FormItem>\n' +
        '        </bingo-grid-item>\n' +
        '    </div>\n' +
        '</bingo-query>',
      selectType: 'float',
      query: {
        col: 3,
        labelWidth: 90,
        types: 'float'
      },
      datasRadio: [
        {
          label: 'float'
        },
        {
          label: 'modal'
        }
      ],
      datas: {
        name: '',
        status1: '',
        count: null,
        date: '',
        status2: '',
        status3: ''
      },
      columns1: [
        {
          title: '属性',
          key: 'props-name'
        },
        {
          title: '说明',
          key: 'props-decp'
        },
        {
          title: '类型',
          key: 'props-type'
        },
        {
          title: '默认值',
          key: 'props-default'
        }
      ],
      data1: [
        {
          'props-name': 'type',
          'props-decp': 'float或modal',
          'props-type': 'string',
          'props-default': 'modal'
        },
        {
          'props-name': 'col',
          'props-decp': '显示列数',
          'props-type': 'number',
          'props-default': '3'
        }
      ],
      columns2: [
        {
          title: '事件名',
          key: 'event-name'
        },
        {
          title: '说明',
          key: 'event-decp'
        },
        {
          title: '返回值',
          key: 'return-val'
        }
      ],
      data2: [
        {
          'event-name': 'on-submit',
          'event-decp': '点击查询按钮时触发',
          'return-val': '无'
        }
      ]
    }
  },
  components: {
    bingoQuery,
    bingoGridItem,
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
    // this.$refs.renderCode.innerHTML;
    this.isShowHtml = true
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      this.$Message.info('触发调用方法')
    },
    searchEnterFun () {
      this.$Message.info('您点击了回车')
    },
    changeClick (value) {
    },
    getModelRedio (msg) {
      this.query.types = msg
    },
    handleCopy (html) {
      let that = this
      this.$Copy({
        text: that.html
      })
    }
  }
}
</script>
