<template>
  <div class="content-inner">
    <Card>
      <div class="demo-split" style="height: 450px">
        <Split v-model="split" mode="vertical">
          <div slot="top" class="demo-split-pane">
            <Button type="primary" @click="open('modal1')">默认弹窗</Button>
            <bingo-modal ref="modal1" v-model="showModel.modal1Show" :title="model.title" :closable="model.closable"
                         :maskClosable="model.maskClosable" :fullscreen="model.fullscreen"
                         :draggable="model.draggable" @on-ok="ok" @on-cancel="cancel">
            </bingo-modal>
            <Button type="primary" @click="open('modal2')" style="margin-left: 20px">自定义弹窗</Button>
            <bingo-modal ref="modal2" v-model="showModel.modal2Show" :title="model.title" :closable="model.closable"
                         :maskClosable="model.maskClosable" :fullscreen="model.fullscreen"
                         :draggable="model.draggable">
                            <span slot="footer">
                                <Button type="primary" @click="save">保存</Button>
                                <Button type="primary" @click="close">关闭</Button>
                            </span>
            </bingo-modal>
            <Button type="primary" @click="open('info')" style="margin-left: 20px">消息</Button>
            <bingo-modal ref="modal3" v-model="showModel.infoShow" type="info" title="提示头">
              提示，我是提示的内容
            </bingo-modal>
            <Button type="primary" @click="open('success')" style="margin-left: 20px">成功</Button>
            <bingo-modal ref="modal4" v-model="showModel.successShow" type="success" title="提示头">
              成功，我是提示的内容
            </bingo-modal>
            <Button type="primary" @click="open('warning')" style="margin-left: 20px">警告</Button>
            <bingo-modal ref="modal5" v-model="showModel.warnShow" :setTimeout="setTimeout" type="warning" title="提示头">
              警告，我是提示的内容
            </bingo-modal>
            <Button type="primary" @click="open('error')" style="margin-left: 20px">错误</Button>
            <bingo-modal ref="modal6" v-model="showModel.errorShow" setTimeout type="error" title="提示头">
              错误，我是提示的内容
            </bingo-modal>
            <Button type="primary" @click="open('errorMessage')" style="margin-left: 20px">错误详情</Button>
            <bingo-modal ref="modal7" v-model="showModel.errorMessageShow" type="errorMessage" title="提示头">
                            <span slot="content">
                                Error: 3f79b5a-yf78-ssa0-79ig-15auif60s9no
                            </span>
            </bingo-modal>
            <Button type="primary" @click="open('drawer')" style="margin-left: 20px">抽屉</Button>
            <bingo-modal ref="modal8" v-model="showModel.drawerShow" type="drawer" title="提示头">
              demo
            </bingo-modal>
          </div>
          <div slot="bottom" class="demo-split-pane">
            <Button class="btn-copy" @click="handleCopy">copy</Button>
            <pre v-highlight>
                <code >{{html1}}</code>
                <code >{{html2}}</code>
                <code >{{html3}}</code>
                <code >{{html4}}</code>
                <code >{{html5}}</code>
                <code >{{html6}}</code>
                <code >{{html7}}</code>
                <code >{{html8}}</code>
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
import bingoModal from '@/components-api/bingo-modal'

export default {
  name: 'bingo-modal2',
  data () {
    return {
      setTimeout: 4000,
      showModel: {
        modal1Show: false,
        modal2Show: false,
        errorShow: false,
        infoShow: false,
        warnShow: false,
        successShow: false,
        errorMessageShow: false,
        drawerShow: false
      },
      model: {
        show: true,
        title: '编辑 ',
        closable: true,
        maskClosable: true,
        draggable: false
      },
      split: 0.2,
      html1: '<!-- 默认显示按钮的弹窗 -->\n' +
        '<Button type="primary" @click="open">默认弹窗</Button>\n' +
        '<bingo-modal ref="modal" :title="model.title" :closable="model.closable"\n' +
        '             :maskClosable="model.maskClosable" :fullscreen="model.fullscreen"\n' +
        '             :draggable="model.draggable" @on-ok="ok" @on-cancel="cancel">\n' +
        '</bingo-modal>',
      html2: '<!-- 自定义显示按钮的弹窗 -->\n' +
        '<Button type="primary" @click="open1">自定义弹窗</Button>\n' +
        '<bingo-modal ref="modal1" title="model.title" :closable="model.closable"\n' +
        '             :maskClosable="model.maskClosable" :fullscreen="model.fullscreen"\n' +
        '             :draggable="model.draggable">\n' +
        '    <span slot="footer">\n' +
        '        <Button type="primary" @click="save">保存</Button>\n' +
        '        <Button type="primary" @click="close">关闭</Button>\n' +
        '    </span>\n' +
        '</bingo-modal>',
      html3: '<!-- info -->\n' +
        '<bingo-modal ref="modal3" v-model="showModel.infoShow" type="info" title="提示头">\n' +
        '    提示，我是提示的内容\n' +
        '</bingo-modal>',
      html4: '<!-- success -->\n' +
        '<bingo-modal ref="modal4" v-model="showModel.successShow" type="success" title="提示头">\n' +
        '    成功，我是提示的内容\n' +
        '</bingo-modal>',
      html5: '<!-- warning -->\n' +
        '<bingo-modal ref="modal5" v-model="showModel.warnShow" :setTimeout="setTimeout" type="warning" title="提示头">\n' +
        '    警告，我是提示的内容\n' +
        '</bingo-modal>',
      html6: '<!-- error -->\n' +
        '<bingo-modal ref="modal6" v-model="showModel.errorShow" setTimeout type="error" title="提示头">\n' +
        '    错误，我是提示的内容\n' +
        '</bingo-modal>',
      html7: '<!-- errorMessage -->\n' +
        '<bingo-modal ref="modal7" v-model="showModel.errorMessageShow" type="errorMessage" title="提示头">\n' +
        '    <span slot="content">\n' +
        '        Error: 3f79b5a-yf78-ssa0-79ig-15auif60s9no\n' +
        '    </span>\n' +
        '</bingo-modal>',
      html8: '<!-- drawer -->\n' +
        '<bingo-modal ref="modal8" v-model="showModel.drawerShow" type="drawer" title="提示头">\n' +
        '    demo\n' +
        '</bingo-modal>',
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
          'props-decp': '控制弹窗的显示隐藏',
          'props-type': 'Boolean',
          'props-default': '-'
        },
        {
          'props-name': 'title',
          'props-decp': '标题显示的内容',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'type',
          'props-decp': '类型，info、success、warning、error、errorMessage、drawer',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'setTimeout',
          'props-decp': '默认显示时间',
          'props-type': 'Number',
          'props-default': '2000'
        },
        {
          'props-name': 'closable',
          'props-decp': '是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'maskClosable',
          'props-decp': '是否允许点击遮罩层关闭',
          'props-type': 'Boolean',
          'props-default': 'true'
        },
        {
          'props-name': 'footer-hide',
          'props-decp': '不显示底部',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'fullscreen',
          'props-decp': '是否全屏显示',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'draggable',
          'props-decp': '是否可以拖拽移动',
          'props-type': 'Boolean',
          'props-default': 'false'
        },
        {
          'props-name': 'ok-text',
          'props-decp': '确定按钮文字',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'cancel-text',
          'props-decp': '取消按钮文字',
          'props-type': 'String',
          'props-default': '-'
        },
        {
          'props-name': 'width',
          'props-decp': '对话框宽度，对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto。当其值不大于 100 时以百分比显示，大于 100 时为像素\n',
          'props-type': 'Number',
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
          'event-name': 'on-ok',
          'event-decp': '点击确定的回调',
          'return-val': '...'
        },
        {
          'event-name': 'on-cancel',
          'event-decp': '点击取消的回调',
          'return-val': '...'
        }
      ]
    }
  },
  components: {
    bingoModal
  },
  methods: {
    ok () {
      this.$Message.info('Clicked  ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    open (value) {
      if (value === 'modal1') {
        this.showModel.modal1Show = true
      } else if (value === 'modal2') {
        this.showModel.modal2Show = true
      } else if (value === 'info') {
        this.showModel.infoShow = true
      } else if (value === 'success') {
        this.showModel.successShow = true
      } else if (value === 'warning') {
        this.showModel.warnShow = true
      } else if (value === 'error') {
        this.showModel.errorShow = true
      } else if (value === 'errorMessage') {
        this.showModel.errorMessageShow = true
      } else if (value === 'drawer') {
        this.showModel.drawerShow = true
      }

      // if (value === 'modal1') {
      //     this.$refs.modal1.show = true;
      // } else if (value === 'modal2') {
      //     this.$refs.modal2.show = true;
      // } else if (value === 'info') {
      //     this.$refs.modal3.show = true;
      // } else if (value === 'success') {
      //     this.$refs.modal4.show = true;
      // } else if (value === 'warning') {
      //     this.$refs.modal5.show = true;
      // } else if (value === 'error') {
      //     this.$refs.modal6.show = true
      // } else if (value === 'errorMessage') {
      //     this.$refs.modal7.show = true
      // } else if (value === 'drawer') {
      //     this.$refs.modal8.show = true
      // }
    },
    save () {
      this.$Message.info('Clicked  save')
    },
    close () {
      this.$refs.modal2.show = false
    },
    handleCopy () {
      let that = this
      this.$Copy({
        text: that.html1
      })
    },
    demo () {
      this.$Modal.info({
        title: 'title',
        content: '内容'
      })
    }
  }
}
</script>
