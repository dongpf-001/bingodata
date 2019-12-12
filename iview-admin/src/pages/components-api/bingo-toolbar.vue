<template>
    <div class="content-inner">
        <Card>
            <div class="demo-split" style="height: 350px">
                <Split v-model="split" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        <bingo-toolbar :showNew="showButton.showNew" :showDelete="showButton.showDelete"
                                       :showRefresh="showButton.showRefresh" :showAllButton="showButton.showAllButton"
                                       @on-new="newClick">
                            <!--                            <span slot="toolbar">-->
                            <!--                                 <Button type='primary' icon='ios-text'>消息</Button>-->
                            <!--                            </span>-->
                        </bingo-toolbar>
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
            <h3>props</h3>
            <Table border :columns="columns1" :data="data1"></Table>
            <br />
            <h3>event</h3>
            <Table border :columns="columns2" :data="data2"></Table>
        </Card>
    </div>
</template>

<script>
import bingoToolbar from '@/components-api/bingo-toolbar'

export default {
  name: 'bingo-toolbar1',
  data () {
    return {
      showButton: {
        showNew: true,
        showDelete: true,
        showRefresh: true,
        showAllButton: true
      },
      split: 0.2,
      html: '<!--在默认按钮上追加按钮，需要在slot="toolbar"标签下写追加的按钮，若想覆盖默认的按钮则需要将\n' +
                    ' 默认按钮的属性(:showAllButton)赋值成false，然后在slot="toolbar"标签下写自定义的按钮-->\n' +
                    '<bingo-toolbar :showNew="showButton.showNew" :showDelete="showButton.showDelete"\n' +
                    '           :showRefresh="showButton.showRefresh" :showAllButton="showButton.showAllButton">\n' +
                    '    <span slot="toolbar">\n' +
                    '        <Button type=\'primary\' icon=\'ios-text\'>消息</Button>\n' +
                    '    </span>\n' +
                    '</bingo-toolbar>',
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
          'props-name': 'showNew',
          'props-decp': '是否显示新建按钮',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'showDelete',
          'props-decp': '是否显示删除按钮',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'showRefresh',
          'props-decp': '是否显示刷新按钮',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'showAllButton',
          'props-decp': '是否显示所有默认按钮',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'showOpenButton',
          'props-decp': '是否显示全屏按钮',
          'props-type': 'Boolean',
          'props-default': 'true'
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
          'event-name': 'on-new',
          'event-decp': '新建的内置方法',
          'return-val': '...'
        },
        {
          'event-name': 'on-delete',
          'event-decp': '删除的内置方法',
          'return-val': '...'
        },
        {
          'event-name': 'on-refresh',
          'event-decp': '刷新的内置方法',
          'return-val': '...'
        },
        {
          'event-name': 'open-full-modal',
          'event-decp': '全屏的内置方法',
          'return-val': '...'
        }
      ]
    }
  },
  components: { bingoToolbar },
  created () {
  },
  mounted () {
  },
  computed: {},
  watch: {},
  methods: {
    handleCopy (html) {
      let that = this
      this.$Copy({
        text: that.html
      })
    },
    newClick () {
      alert(123)
    }
  }
}
</script>
