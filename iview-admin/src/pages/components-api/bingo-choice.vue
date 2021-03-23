<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="bingo-choice组件" hidden-breadcrumb></PageHeader>
      <Icon type="ios-film" class="film" @click.native="clickPlayer"/>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <!-- 单选 -->
      <split-template :html="html1" codeTemplate="bingoChoiceRadio">
                <span slot="components">
                    <bingo-choice types="radio" v-model="radioModel" :datas="datas" :label-in-value="true">
                    </bingo-choice>{{radioModel}}
                </span>
        <span slot="describe">
                    <p><strong>types</strong> 属性用来区分单选还是多选，为<strong>radio</strong>的时候单选，
                    为<strong>checkbox</strong>的时候多选</p>
                    <p><strong>type</strong> 属性指选框的样式，可选值为button，只有在types="radio"有效</p>
                </span>
      </split-template>
      <!-- 多选 -->
      <split-template :html="html2" codeTemplate="bingoChoiceCheckbox">
                <span slot="components">
                    <bingo-choice v-model="checkboxModel" :datas="datasCheck" :label-in-value="false" @on-change="onChange">
                    </bingo-choice>{{checkboxModel}}
                </span>
        <span slot="describe">
                </span>
      </split-template>

      <Divider>详细描述</Divider>
      <h3>props</h3>
      <Table border :columns="columns1" :data="data1"></Table>
      <br />
      <h3>event</h3>
      <Table border :columns="columns2" :data="data2"></Table>
    </Card>
    <my-video v-if="showPlayer" :viSrc="viSrc" @closePlayer="showPlayer=false"></my-video>
  </div>
</template>

<script>
import SplitTemplate from '@/components-api/splitTemplate'
import myVideo from '@/components-api/my-video'
export default {
  name: 'bingo-choice-demo',
  data () {
    return {
      showPlayer: false,
      viSrc: 'video/bingo-choice.mp4',
      radioModel: 0,
      checkboxModel: [2],
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
      html1: '<!--radio-单选-->\n' +
          '<bingo-choice types="radio"\n' +
          '               v-model="radioModel"\n' +
          '               :datas="sexData"\n' +
          '               @on-change="onChange">\n' +
          '</bingo-choice>',
      html2: '<!--checkbox-多选-->\n' +
          '<bingo-choice types="checkbox"\n' +
          '               v-model="checkboxModel"\n' +
          '               :datas="sexData"\n' +
          '               @on-change="onChange">\n' +
          '</bingo-choice>',
      columns1: [
        {
          title: '属性',
          key: 'props-name',
          width: 170
        },
        {
          title: '说明',
          key: 'props-decp'
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
          'props-decp': 'v-model绑定的数据是否键值的形式展示',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'datas',
          'props-decp': '显示的数据源，例如：datas: [{ label: 1, value: \'男\', disabled: false, border: false},]',
          'props-type': 'JSON',
          'props-default': '[]'
        },
        {
          'props-name': 'size',
          'props-decp': '尺寸，可选值为large、small、default或者不设置',
          'props-type': 'String',
          'props-default': 'default或者不设置'
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
          key: 'event-decp'
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
  },
  components: {
    SplitTemplate, myVideo
  },
  methods: {
    clearClick () {
      this.checkboxModel = []
      this.radioModel = 1
    },
    onChange (value) {
      if (value) {
        this.$Message.info(JSON.stringify(value))
      }
    },
    clickPlayer () {
      this.showPlayer = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
