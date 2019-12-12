<template>
  <div class="content-inner">
    <Card>
      <div class="demo-split" style="height: 550px">
        <Split v-model="split" mode="vertical">
          <div slot="top" class="demo-split-pane">
            <bingo-choice types="radio" v-model="radioModel" :datas="datas" :label-in-value="true"
                          @on-change="onChange">
            </bingo-choice>
            <bingo-choice v-model="checkboxModel" :datas="datasCheck" :label-in-value="false" @on-change="onChange">
            </bingo-choice>{{checkboxModel}}
            <Button @click="clearClick">清空</Button>
          </div>
          <div slot="bottom" class="demo-split-pane">
            <Button class="btn-copy" @click="handleCopy">copy</Button>
            <pre v-highlight>
                <code >{{html1}}</code>
                <code >{{html2}}</code>
            </pre>
          </div>
        </Split>
      </div>
      <Divider>详细描述</Divider>
      <h3>props</h3>
      <Table border :columns="columns1" :data="data1"></Table>
      <br />
      <h3>event</h3>
      <Table border :columns="columns2" :data="data2"></Table>
    </Card>
  </div>
</template>

<script>
import bingoChoice from '@/components-api/bingo-choice'
// import * as Api from '@/api/bmsa/demo'
export default {
  name: 'bingo-radio2',
  data () {
    return {
      radioModel: 1,
      returnModel: {},
      returnCheckModel: [],
      checkboxModel: [1],
      sexData: [],
      html1: '<!--radio-单选-->\n' +
        '<bingo-choice types="radio" v-model="radioModel" :datas="sexData" @on-change="onChange">\n' +
        '</bingo-choice>',
      html2: '<!--checkbox-多选-->\n' +
        '<bingo-choice types="checkbox" v-model="checkboxModel" :datas="sexData" @on-change="onChange">\n' +
        '</bingo-choice>',
      split: 0.2,
      datas: [
        {
          label: 1,
          value: '男'
        },
        {
          label: 0,
          value: '女',
          disabled: false,
          border: false
        }
      ],
      datasCheck: [
        {
          label: 1,
          value: '北京'
        },
        {
          label: 2,
          value: '上海',
          disabled: false,
          border: false
        },
        {
          label: 3,
          value: '广州',
          border: false
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
          'props-name': 'v-model',
          'props-decp': '双向绑定数据',
          'props-type': 'String | Number',
          'props-default': '-'
        },
        {
          'props-name': 'types',
          'props-decp': 'radio或checkbox',
          'props-type': 'String',
          'props-default': 'checkbox'
        },
        {
          'props-name': 'label-in-value',
          'props-decp': '绑定的数据是否键值的形式',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'datas',
          'props-decp': '显示的数据源，例如：datas: [{ label: 1, value: \'男\', disabled: false, border: false},]',
          'props-type': 'JSON',
          'props-default': '-'
        },
        {
          'props-name': 'size',
          'props-decp': '尺寸，可选值为large、small、default或者不设置',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'label',
          'props-decp': 'datas数据源里面的属性，绑定的值',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'value',
          'props-decp': 'datas数据源里面的属性，选择时显示的值',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'disabled',
          'props-decp': 'datas数据源里面的属性，是否禁用当前项',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'border',
          'props-decp': 'datas数据源里面的属性，是否显示边框',
          'props-type': 'Boolean',
          'props-default': 'false'
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
          'event-decp': '在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发',
          'return-val': '...'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  components: {
    bingoChoice
  },
  methods: {
    getData () {
      // Api.getRadioData().then(res => {
      //   debugger
      //   if (res.success) {
      //     res.data.forEach((item) => {
      //       this.sexData.push({
      //         label: item.itemValue,
      //         value: item.itemText
      //       })
      //     })
      //   }
      // })
    },
    handleCopy (html) {
      let that = this
      this.$Copy({
        text: that.html1
      })
    },
    getModel (msg) {
      this.$Message.info(msg.join(','))
    },
    getModelRedio (msg) {
      this.$Message.info(msg + '')
    },
    onChange (value) {
      if (value) {
        this.$Message.info(JSON.stringify(value))
      }
    },
    clearClick () {
      this.checkboxModel = []
      this.radioModel = ''
    }
  }
}
</script>
