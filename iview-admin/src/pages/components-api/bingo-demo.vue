// 在components中定义一个可引用的组件
// 此功能封装并非原创，在网上看到的，哪里看的忘了
// components 部分
<template>
  <div class="my-outbox" style="position: relative">
    <Icon type="ios-arrow-back" style="position: absolute;right: 10px;color: black;top: 0" @click="moveRight"></Icon>
    <div class="my-inbox" ref='box'>
      <div class="my-list" v-for="(item,index) in sendVal" :key='index' ref='list'>
        <!--{{item.name}}刚刚购买了产品-->
        <div class="btn-icon-div">
          <i :class="item.type"></i>
        </div>
      </div>
    </div>
    <Icon type="ios-arrow-forward" style="position: absolute;right: 0;color: black;top: 0" @click="moveLeft"></Icon>
  </div>
</template>

<script>
export default {
  name: 'my-marquee-left',
  data () {
    return {
      // 定时器标识
      nowTime: null,
      startDis: 0,
      // 每一个内容的宽度
      disArr: [],
      sendVal: [
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '134****7866抽中5元饭票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '180****3300抽中华为新品 HUAWEI nova 4手机' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-person', detail: '152****7846抽中5元电影票' },
        { type: 'ivu-icon ivu-icon-ios-flag', detail: '152****7846抽中5元电影票' }
      ]
    }
  },
  mounted () {
    // var that = this
    var item = this.$refs.list
    var len = this.sendVal.length
    var arr = []
    // 因为设置的margin值一样，所以取第一个就行。
    var margin = this.getMargin(item[0])
    for (var i = 0; i < len; i++) {
      arr.push(item[i].clientWidth + margin) // 把宽度和 margin 加起来就是每一个元素需要移动的距离
    }
    this.disArr = arr
    // this.moveLeft()
  },
  beforeDestroy () {
    // 页面关闭清除定时器
    clearInterval(this.nowTime)
    // 清除定时器标识
    this.nowTime = null
  },
  methods: {
    // 获取margin属性
    getMargin (obj) {
      var marg = window.getComputedStyle(obj, null)['margin-right']
      marg = marg.replace('px', '')
      return Number(marg) // 强制转化成数字
    },
    // 移动的方法
    moveLeft () {
      var outbox = this.$refs.box
      debugger
      this.startDis -= 52
      outbox.style = `transform: translateX(${this.startDis}px)`
    },
    moveRight () {
      var outbox = this.$refs.box
      debugger
      this.startDis += 52
      outbox.style = `transform: translateX(${this.startDis}px)`
    }
  }
}
</script>

<style lang="less" scoped>
  .my-outbox{
    /*color: #D7BC8D;*/
    overflow: hidden;
    color: #FFFFFF;
    height: 35px;
    max-width: 300px;
    overflow: hidden;
    /*background: #422b02;*/
    .my-inbox{
      white-space: nowrap;
      .my-list{
        margin-right: 12px;
        display: inline-block;
        font-size: 0.3rem;
        height: 40px;
        line-height: 40px;
        .my-uname{
          /*color: #FF8900;*/
          color: black;
        }
        .btn-icon-div {
          float: left;
          margin-right: 12px;
          border: #fff 1px solid;
          background: none;
          width: 28px;
          height: 28px;
          text-align: center;
          border-radius: 50%;
          list-style-type: none;
          padding: 3px;
          i{
            color: black;
            font-size: 18px;
          }
        }
        .btn-icon-div:hover{
          background: #333f48;
          border: #333f48 1px solid;
          box-shadow: 1px 1px #2c99bd;
          cursor: pointer;
        }
      }
    }
  }
</style>
