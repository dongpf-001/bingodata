<template>
    <div class="icon">
      <div style="padding: 15px;">iview 支持的图标，请点击<a href="https://www.iviewui.com/components/icon" target="_blank">查看</a> </div>
      <ul ref="addIcon">
          <li v-for="(item, index) in icons" :key="index">
              <span @click="handleCopy(item.html)"><Icon></Icon></span>
              <div>{{item.name}}</div>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'ui-icon',
  data () {
    return {
      icons: [{
        html: '<Icon custom="iconfont iconxinjian1" />', 'type': 'custom', 'iconCode': 'iconfont iconxinjian1', 'name': '新建'
      }, {
        html: '<Icon type="md-create" />', 'type': 'type', 'iconCode': 'md-create', 'name': '编辑'
      }, {
        html: '<Icon type="ios-eye" />', 'type': 'type', 'iconCode': 'ios-eye', 'name': '查看'
      }, {
        html: '<Icon type="md-copy" />', 'type': 'type', 'iconCode': 'md-copy', 'name': '复制'
      }, {
        html: '<Icon custom="iconfont iconbaocun1" />', 'type': 'custom', 'iconCode': 'iconfont iconbaocun1', 'name': '保存'
      }, {
        html: '<Icon custom="iconfont iconbaocunbingguanbi" />', 'type': 'custom', 'iconCode': 'iconfont iconbaocunbingguanbi', 'name': '保存并关闭'
      }, {
        html: '<Icon type="md-close" />', 'type': 'type', 'iconCode': 'md-close', 'name': '关闭'
      }, {
        html: '<Icon type="md-refresh" />', 'type': 'type', 'iconCode': 'md-refresh', 'name': '刷新'
      }, {
        html: '<Icon type="md-trash" />', 'type': 'type', 'iconCode': 'md-trash', 'name': '删除'
      }, {
        html: '<Icon type="md-arrow-round-back" />', 'type': 'type', 'iconCode': 'md-arrow-round-back', 'name': '上一步'
      }, {
        html: '<Icon type="md-arrow-round-forward" />', 'type': 'type', 'iconCode': 'md-arrow-round-forward', 'name': '下一步'
      }, {
        html: '<Icon type="md-settings" />', 'type': 'type', 'iconCode': 'md-settings', 'name': '设置'
      }, {
        html: '<Icon type="md-mail" />', 'type': 'type', 'iconCode': 'md-mail', 'name': '邮件'
      }, {
        html: '<Icon type="md-options" />', 'type': 'type', 'iconCode': 'md-options', 'name': '流程'
      }, {
        html: '<Icon type="md-print" />', 'type': 'type', 'iconCode': 'md-print', 'name': '打印'
      }, {
        html: '<Icon type="md-checkmark" />', 'type': 'type', 'iconCode': 'md-checkmark', 'name': '正确'
      }, {
        html: '<Icon type="md-close" />', 'type': 'type', 'iconCode': 'md-close', 'name': '错误'
      }, {
        html: '<Icon custom="iconfont iconfenpei" />', 'type': 'custom', 'iconCode': 'iconfont iconfenpei', 'name': '分配'
      }, {
        html: '<Icon type="md-swap" />', 'type': 'type', 'iconCode': 'md-swap', 'name': '同步'
      }, {
        html: '<Icon custom="iconfont iconyichu" />', 'type': 'custom', 'iconCode': 'iconfont iconyichu', 'name': '移除'
      }, {
        html: '<Icon type="md-person-add" />', 'type': 'type', 'iconCode': 'md-person-add', 'name': '引入'
      }, {
        html: '<Icon type="md-open" />', 'type': 'type', 'iconCode': 'md-open', 'name': '转发'
      }, {
        html: '<Icon type="md-paper-plane" />', 'type': 'type', 'iconCode': 'md-paper-plane', 'name': '发送'
      }, {
        html: '<Icon type="md-search" />', 'type': 'type', 'iconCode': 'md-search', 'name': '查询'
      }, {
        html: '<Icon custom="iconfont iconshengji" />', 'type': 'custom', 'iconCode': 'iconfont iconshengji', 'name': '升级'
      }, {
        html: '<Icon custom="iconfont iconbanben1" />', 'type': 'custom', 'iconCode': 'iconfont iconbanben1', 'name': '版本'
      }, {
        html: '<Icon type="md-done-all" />', 'type': 'type', 'iconCode': 'md-done-all', 'name': '确定'
      }, {
        html: '<Icon custom="iconfont iconxingzhuanggongnengtubiao-" />', 'type': 'custom', 'iconCode': 'iconfont iconxingzhuanggongnengtubiao-', 'name': '取消'
      }, {
        html: '<Icon custom="iconfont iconjurassic_reject-task" />', 'type': 'custom', 'iconCode': 'iconfont iconjurassic_reject-task', 'name': '驳回'
      }, {
        html: '<Icon custom="iconfont iconzhongzhi" />', 'type': 'custom', 'iconCode': 'iconfont iconzhongzhi', 'name': '终止'
      }, {
        html: '<Icon custom="iconfont iconchexiao" />', 'type': 'custom', 'iconCode': 'iconfont iconchexiao', 'name': '撤销'
      }, {
        html: '<Icon custom="iconfont iconshouquan" />', 'type': 'custom', 'iconCode': 'iconfont iconshouquan', 'name': '授权'
      }, {
        html: '<Icon custom="iconfont iconrili1" />', 'type': 'custom', 'iconCode': 'iconfont iconrili1', 'name': '日期'
      }, {
        html: '<Icon custom="iconfont iconyuyuetoubiao" />', 'type': 'custom', 'iconCode': 'iconfont iconyuyuetoubiao', 'name': '时间'
      }, {
        html: '<Icon custom="iconfont icondazhongzhou" />', 'type': 'custom', 'iconCode': 'iconfont icondazhongzhou', 'name': '周'
      }, {
        html: '<Icon type="md-cloud-upload" />', 'type': 'type', 'iconCode': 'md-cloud-upload', 'name': '上传'
      }, {
        html: '<Icon type="md-cloud-download" />', 'type': 'type', 'iconCode': 'md-cloud-download', 'name': '下载'
      }, {
        html: '<Icon type="md-attach" />', 'type': 'type', 'iconCode': 'md-attach', 'name': '附件'
      }, {
        html: '<Icon type="md-link" />', 'type': 'type', 'iconCode': 'md-link', 'name': '链接'
      }, {
        html: '<Icon type="ios-text" />', 'type': 'type', 'iconCode': 'ios-text', 'name': '消息'
      }, {
        html: '<Icon type="md-volume-down" />', 'type': 'type', 'iconCode': 'md-volume-down', 'name': '公告'
      }, {
        html: '<Icon custom="iconfont icondaoru" />', 'type': 'custom', 'iconCode': 'iconfont icondaoru', 'name': '导入'
      }, {
        html: '<Icon custom="iconfont icondaochu" />', 'type': 'custom', 'iconCode': 'iconfont icondaochu', 'name': '导出'
      }, {
        html: '<Icon custom="iconfont iconWORD" />', 'type': 'custom', 'iconCode': 'iconfont iconWORD', 'name': 'word'
      }, {
        html: '<Icon custom="iconfont iconexcel1" />', 'type': 'custom', 'iconCode': 'iconfont iconexcel1', 'name': 'excel'
      }, {
        html: '<Icon custom="iconfont iconPPT" />', 'type': 'custom', 'iconCode': 'iconfont iconPPT', 'name': 'ppt'
      }, {
        html: '<Icon custom="iconfont iconpdf" />', 'type': 'custom', 'iconCode': 'iconfont iconpdf', 'name': 'pdf'
      }, {
        html: '<Icon type="md-qr-scanner" />', 'type': 'custom', 'iconCode': 'iconfont iconfull-screen', 'name': '全屏'
      }, {
        html: '<Icon type="md-resize" />', 'type': 'type', 'iconCode': 'md-resize', 'name': '最大化'
      }]
    }
  },
  created () {
  },
  mounted () {
    let that = this
    that.$refs.addIcon.childNodes.forEach(function (item, index) {
      if (that.icons[index].type === 'type') {
        item.firstChild.firstChild.className = 'ivu-icon ivu-icon-' + that.icons[index].iconCode
      } else {
        item.firstChild.firstChild.className = that.icons[index].iconCode
      }
    })
  },
  computed: {},
  watch: {},
  methods: {
    handleCopy (icon) {
      this.$Copy({
        text: icon
      })
    }
  }
}
</script>

<style scoped>
    ul,li{
        list-style: none;
    }
    ul{
        float:none;
        clear: both;
    }
    li{
        width: 100px;
        margin-bottom: 10px;
        margin-right: 18px;
        text-align: center;
        list-style: none !important;
        cursor: default;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: inherit;
    }
    .iconfont{
        font-size: 30px;
        transition: font-size 0.15s linear, width 0.15s linear;
    }
    .iconfont:hover{
        font-size: 90px;
    }
    .ivu-icon{
        font-size: 38px;
        transition: font-size 0.15s linear, width 0.15s linear;
        line-height: normal;
        vertical-align: middle;
    }
    .ivu-icon:hover{
        font-size: 96px;
    }
    li span{
        display: block;
        height: 100px;
        line-height: 100px;
        font-size: 42px;
        margin: 10px auto;
        color: #333;
        -webkit-transition: font-size 0.25s linear, width 0.25s linear;
        -moz-transition: font-size 0.25s linear, width 0.25s linear;
        transition: font-size 0.25s linear, width 0.25s linear;
    }
    li div{
        padding-left: 5px;
        text-align: center;
        font-size: 14px;
    }
</style>
