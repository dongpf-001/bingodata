<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split" style="height: 850px">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <h3>下拉选择</h3>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :rules="rules"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="下拉单选" prop="model1" label-for="model1">
                                    <bingo-select ref="element" v-model="model.model1" :data="datas" :clearable="true"
                                                  :filterable="filterable" :label-in-value="labelInValue"
                                                  @on-change="onChange">
                                    </bingo-select>
                                    <Button @click="btnClear">清空</Button>{{model.model1}}
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="下拉多选" prop="model2" label-for="model2">
                                    <bingo-select ref="element" v-model="model.model2" :data="datas"
                                                  :multiple="multiple" :filterable="filterable" :showSelectAll="true"
                                                  :labelInValue="labelInValue" @on-change="onChange">
                                    </bingo-select>
                                    <Button @click="btnClear2">清空</Button>{{model.model2}}
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="远程查询" label-for="model3">
                                    <bingo-select ref="element" v-model="model.model3" :data="datas1" :multiple="multiple"
                                                  :filterable="filterable" :labelInValue="labelInValue" :remote="remote"
                                                  :max-tag-count="2" :showSelectAll="true"
                                                  :remoteMethod="remoteMethod" :loading="loading" placeholder="请选择">
                                    </bingo-select>{{model.model3}}
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <h3>下拉选择树</h3>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :rules="rules"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="下拉树单选">
                                    <bingo-select type="selectTree" v-model="model.treeValue1" placeholder="请选择"
                                                  @on-change="onChange" :data="treeDatas"></bingo-select>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="下拉树多选">
                                    <bingo-select type="selectTree" v-model="model.treeValue2" show-checkbox
                                                  @on-change="onChange" :data="treeDatas" multiple></bingo-select>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="异步加载选择">
                                    <bingo-select type="selectTree" v-model="model.treeValue3" :data="selectTreeData"
                                                  :load-data="loadData"></bingo-select>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                        <h3>智能感知</h3>
                        <bingo-form :col="query.col" :labelWidth="query.labelWidth" :rules="rules"
                                    ref="form" :button="query.button">
                            <bingo-grid-item>
                                <FormItem label="智能感知">
                                    <bingo-select type="selectAuto" v-model="model.autoValue" placeholder="请选择"
                                                  :data="autoData2" :filter-method="filterMethod"></bingo-select>
                                </FormItem>
                            </bingo-grid-item>
                            <bingo-grid-item>
                                <FormItem label="自定义选项">
                                    <bingo-select type="selectAuto" v-model="model.autoValue" @on-search="handleSearch2">
                                        <Option v-for="item in autoData1" :value="item" :key="item">{{ item }}</Option>
                                    </bingo-select>
                                </FormItem>
                            </bingo-grid-item>
                        </bingo-form>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        <Tabs style="margin-top: 20px">
                            <TabPane label="下拉选择">
                                <Button class="btn-copy" @click="handleCopy">copy</Button>
                                <pre v-highlight>
                                    <code >{{html}}</code>
                                </pre>
                                <pre v-highlight>
                                    <code >{{html1}}</code>
                                </pre>
                                <pre v-highlight>
                                    <code >{{html2}}</code>
                                </pre>
                            </TabPane>
                            <TabPane label="下拉选择树">
                                <Button class="btn-copy" @click="handleCopy">copy</Button>
                                <pre v-highlight>
                                    <code >{{treeHtml}}</code>
                                </pre>
                                <pre v-highlight>
                                    <code >{{treeHtml1}}</code>
                                </pre>
                                <pre v-highlight>
                                    <code >{{treeHtml2}}</code>
                                </pre>
                            </TabPane>
                            <TabPane label="智能感知">
                                <Button class="btn-copy" @click="handleCopy">copy</Button>
                                <pre v-highlight>
                                    <code >{{autoHtml}}</code>
                                </pre>
                                <pre v-highlight>
                                    <code >{{autoHtml1}}</code>
                                </pre>
                            </TabPane>
                        </Tabs>
                    </div>
                </Split>
            </div>
            <Divider>详细描述</Divider>
            <Tabs :animated="false">
                <TabPane label="下拉选择">
                    <h3>props</h3>
                    <Table border :columns="columns1" :data="data1"></Table>
                    <h3>event</h3>
                    <Table border :columns="columns2" :data="data2"></Table>
                </TabPane>
                <TabPane label="下拉选择树">
                    <h3>props</h3>
                    <Table border :columns="treeColumns1" :data="treeData1"></Table>
                    <h3>event</h3>
                    <Table border :columns="treeColumns2" :data="treeData2"></Table>
                </TabPane>
                <TabPane label="智能感知">
                    <h3>props</h3>
                    <Table border :columns="autoColumns1" :data="autoDatas1"></Table>
                    <h3>event</h3>
                    <Table border :columns="autoColumns2" :data="autoDatas2"></Table>
                </TabPane>
            </Tabs>
            <br />
        </Card>
    </div>
</template>

<script>
import bingoSelect from '@/components-api/bingo-select'
import bingoForm from '@/components-api/bingo-query/bingo-form'
import bingoGridItem from '@/components-api/bingo-query/bingo-grid-item'
// import * as Api from '@/api/bmsa/demo'
export default {
  name: 'bingo-select2',
  data () {
    return {
      model: {
        model1: 1,
        model2: [1, 2],
        model3: '',
        treeValue1: '',
        treeValue2: '',
        treeValue3: '',
        autoValue: ''
      },
      query: {
        col: 3,
        labelWidth: 90,
        button: false
      },
      nextValue: 0,
      rules: {
        name: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        status1: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      split: 0.4,
      html: '<!--下拉单选-->\n' +
                    '<bingo-select type="select" v-model="model.model1" :data="datas">\n' +
                    '</bingo-select>',
      html1: '<!--下拉多选-->\n' +
                    '<bingo-select type="select" v-model="model.model2" :data="datas" :multiple="multiple">\n' +
                    '</bingo-select>',
      html2: '<!--远程查询-->\n' +
                    '<bingo-select type="select" v-model="model.model3" :data="datas1" :multiple="multiple"\n' +
                    '         :filterable="filterable" :remote="remote" :remoteMethod="remoteMethod" :loading="loading">\n' +
                    '</bingo-select>',
      treeHtml: '<!--下拉单选树-->\n' +
                    '<bingo-select type="selectTree" v-model="model.treeValue1" :data="treeDatas"></bingo-select>',
      treeHtml1: '<!--下拉多选树-->\n' +
                    '<bingo-select type="selectTree" v-model="model.treeValue2" :data="treeDatas" multiple></bingo-select>',
      treeHtml2: '<!--异步加载选择-->\n' +
                    '<bingo-select type="selectTree" v-model="model.treeValue3" :data="treeDatasDemo" multiple\n' +
                    '           show-checkbox :load-data="loadData"></bingo-select>',
      autoHtml: '<!--智能感知-->\n' +
                    '<bingo-select type="selectAuto" v-model="model.autoValue"\n' +
                    '           :data="autoData2" :filter-method="filterMethod"></bingo-select>',
      autoHtml1: '<!--自定义选项智能感知-->\n' +
                    '<bingo-select type="selectAuto" v-model="model.autoValue" @on-search="handleSearch">\n' +
                    '     <Option v-for="item in autoData1" :value="item" :key="item">{{ item }}</Option>\n' +
                    '</bingo-select>',
      maxTagCount: 2,
      multiple: true,
      filterable: true,
      labelInValue: true,
      size: 'default',
      datas1: [],
      loading: false,
      remote: true,
      list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
      datas: [
        {
          value: 1,
          label: '北京',
          disabledOption: false
        },
        {
          value: 2,
          label: '上海'
        },
        {
          value: 3,
          label: '广州'
        },
        {
          value: 4,
          label: '天津'
        }
      ],
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
          width: 200
        },
        {
          title: '默认值',
          key: 'props-default',
          width: 140
        }
      ],
      data1: [
        {
          'props-name': 'v-model',
          'props-decp': '双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array',
          'props-type': 'String | Number | Array',
          'props-default': '空'
        },
        {
          'props-name': 'datas',
          'props-decp': '显示的数据源，例如：datas: [{ value: 1, label: \'男\', disabledOption: false}]',
          'props-type': 'Array',
          'props-default': '-'
        },
        {
          'props-name': 'type',
          'props-decp': 'select | selectTree | selectAuto 当类型为select时，使用的是下拉选择',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'value',
          'props-decp': 'datas里的属性，绑定的值',
          'props-type': 'String | Number | Array',
          'props-default': '-'
        },
        {
          'props-name': 'label',
          'props-decp': 'datas里的属性，显示的值',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'multiple',
          'props-decp': '是否支持多选',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledSelect',
          'props-decp': '是否禁用选择',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledOption',
          'props-decp': 'datas里的属性，是否禁用当前选择项',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'clearable',
          'props-decp': '是否可以清空选项，只在单选时有效',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'filterable',
          'props-decp': '是否支持搜索',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'allowCreate',
          'props-decp': '是否允许用户创建新条目，需开启 filterable',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'size',
          'props-decp': '选择框大小，可选值为large、small、default或者不填',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'placeholder',
          'props-decp': '选择框默认文字',
          'props-type': 'String',
          'props-default': '请选择'
        },
        {
          'props-name': 'notFoundText',
          'props-decp': '当下拉列表为空时显示的内容',
          'props-type': 'String',
          'props-default': '无匹配数据'
        },
        {
          'props-name': 'labelInValue',
          'props-decp': '在返回选项时，是否将 label 和 value 一并返回，默认只返回 value',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'placement',
          'props-decp': '弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'prefix',
          'props-decp': '在 Select 内显示图标',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'maxTagCount',
          'props-decp': '多选时最多显示多少个 tag',
          'props-type': 'Number',
          'props-default': '-'
        }
      ],
      treeColumns1: [
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
          width: 200
        },
        {
          title: '默认值',
          key: 'props-default',
          width: 140
        }
      ],
      treeData1: [
        {
          'props-name': 'v-model',
          'props-decp': '双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array',
          'props-type': 'String | Number | Array',
          'props-default': '空'
        },
        {
          'props-name': 'datas',
          'props-decp': '显示的数据源，例如：datas: [{title: \'parent1\', expand: true, value: \'1\',selected: false,checked: false,children: []}]',
          'props-type': 'Array',
          'props-default': '-'
        },
        {
          'props-name': 'type',
          'props-decp': 'select | selectTree | selectAuto 当类型为selectTree时，使用的是选择树',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'multiple',
          'props-decp': '是否支持多选',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'show-checkbox',
          'props-decp': '是否显示多选框',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'load-data',
          'props-decp': '异步加载数据方法，详见示例',
          'props-type': 'Function',
          'props-default': '-'
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
          'event-name': 'on-change',
          'event-decp': '选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性',
          'return-val': '当前选中项'
        },
        {
          'event-name': 'on-query-change',
          'event-decp': '搜索词改变时触发',
          'return-val': 'query'
        },
        {
          'event-name': 'on-clear',
          'event-decp': '点击清空按钮时触发',
          'return-val': '无'
        },
        {
          'event-name': 'on-open-change',
          'event-decp': '下拉框展开或收起时触发',
          'return-val': 'true / false'
        },
        {
          'event-name': 'on-create',
          'event-decp': '新建条目时触发',
          'return-val': 'query'
        }
      ],
      autoColumns1: [
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
          width: 200
        },
        {
          title: '默认值',
          key: 'props-default',
          width: 140
        }
      ],
      autoDatas1: [
        {
          'props-name': 'v-model',
          'props-decp': '双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array',
          'props-type': 'String | Number | Array',
          'props-default': '空'
        },
        {
          'props-name': 'datas',
          'props-decp': '显示的数据源，例如：datas: [\'Steve\', \'Stephen\', \'Jonathan\']',
          'props-type': 'Array',
          'props-default': '-'
        },
        {
          'props-name': 'type',
          'props-decp': 'select | selectTree | selectAuto 当类型为selectAuto时，使用的是智能感知',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'clearable',
          'props-decp': '是否可以清空选项，只在单选时有效',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'disabledAuto',
          'props-decp': '是否禁用当前选择项',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'placeholder',
          'props-decp': '选择框默认文字',
          'props-type': 'String',
          'props-default': '请选择'
        },
        {
          'props-name': 'icon',
          'props-decp': '输入框尾部图标',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'filter-method',
          'props-decp': '是否根据输入项进行筛选。当其为一个函数时，会接收 value 和 option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false',
          'props-type': 'Function | Boolean',
          'props-default': 'false'
        }
      ],
      autoColumns2: [
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
      autoDatas2: [
        {
          'event-name': 'on-change',
          'event-decp': '选中 option，或 input 的 value 变化时，调用此函数',
          'return-val': 'value'
        },
        {
          'event-name': 'on-select',
          'event-decp': '被选中时调用，参数为选中项的 value 值',
          'return-val': 'value'
        },
        {
          'event-name': 'on-search',
          'event-decp': '搜索补全项的时候调用',
          'return-val': 'query'
        },
        {
          'event-name': 'on-focus',
          'event-decp': '聚焦时触发',
          'return-val': 'event'
        },
        {
          'event-name': 'on-blur',
          'event-decp': '失焦时触发',
          'return-val': 'event'
        },
        {
          'event-name': 'on-clear',
          'event-decp': '清空时触发',
          'return-val': '无'
        }
      ],
      treeColumns2: [
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
      treeData2: [
        {
          'event-name': 'on-change',
          'event-decp': '选项变化时触发',
          'return-val': '返回 String 或 Array，取决于 multiple，返回项为 data 中的 value 字段'
        },
        {
          'event-name': 'on-open-change',
          'event-decp': '下拉框展开或收起时触发',
          'return-val': 'true / false'
        }
      ],
      autoData1: [],
      autoData2: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
      treeDatas: [
        {
          title: 'parent1',
          expand: true,
          value: '1',
          selected: false,
          checked: false,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              value: '1-1',
              selected: false,
              checked: false,
              children: [
                {
                  title: 'leaf 1-1-1',
                  value: '1-1-1',
                  selected: false,
                  checked: false
                },
                {
                  title: 'leaf 1-1-2',
                  value: '1-1-2',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              value: '1-2',
              selected: false,
              checked: false,
              children: [
                {
                  title: 'leaf 1-2-1',
                  value: '1-2-1',
                  selected: false,
                  checked: false
                },
                {
                  title: 'leaf 1-2-2',
                  value: '1-2-2',
                  selected: false,
                  checked: false
                }
              ]
            }
          ]
        }
      ],
      treeDatasDemo: [
        {
          title: 'parent1',
          value: '1',
          loading: false,
          selected: false,
          checked: false,
          children: []
        }
      ],
      selectData: [],
      selectTreeData: [],
      setValue: 0,
      setItem: {}
    }
  },
  created () {
    this.getOragnization()
    this.getData()
  },
  watch: {
    multiple () {
      this.model = ''
      this.$refs.element.$refs.select.clearSingleSelect()
    }
  },
  components: {
    bingoSelect, bingoForm, bingoGridItem
  },
  methods: {
    getData () {
      // Api.getRadioData().then(res => {
      //   debugger
      //   if (res.success) {
      //     res.data.forEach((item) => {
      //       this.selectData.push({
      //         label: item.itemText,
      //         value: item.itemValue
      //       })
      //     })
      //   }
      // })
    },
    getOragnization (item, value) {
      this.setValue = value
      this.setItem = item
      // Api.getOragnizationData({ parentId: value }).then(res => {
      //   debugger
      //   if (res.success) {
      //     if (this.nextValue === 0) {
      //       res.data.forEach((item) => {
      //         this.selectTreeData.push({
      //           title: item.description,
      //           value: item.orgId,
      //           expand: false,
      //           loading: false,
      //           selected: false,
      //           checked: false,
      //           children: []
      //         })
      //       })
      //       this.nextValue = 1
      //     } else {
      //       if (res.data.length > 0) {
      //         res.data.forEach((item) => {
      //           this.setItem.children.push({
      //             title: item.description,
      //             value: item.orgId,
      //             expand: false,
      //             loading: false,
      //             selected: false,
      //             checked: false,
      //             children: []
      //           })
      //         })
      //         this.setItem.expand = true
      //         this.setItem.loading = false
      //       } else {
      //         this.setItem.loading = false
      //         delete this.setItem.loading
      //       }
      //     }
      //   }
      // })
    },
    loadData (item, callback) {
      let value = item.value
      this.getOragnization(item, value)
    },
    handleCopy (html) {
      let that = this
      this.$Copy({
        text: that.html
      })
    },
    handleCopy1 (html) {
      let that = this
      this.$Copy({
        text: that.html1
      })
    },
    handleCopy2 (html) {
      let that = this
      this.$Copy({
        text: that.html2
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            }
          })
          this.datas1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.datas1 = []
      }
    },
    handleSearch2 (value) {
      this.autoData1 = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    onChange (value) {
      if (value) {
        this.$Message.info(JSON.stringify(value))
      }
    },
    btnClear () {
      this.model.model1 = ''
    },
    btnClear2 () {
      this.model.model2 = ''
    }
  }
}
</script>
