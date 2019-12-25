<template>
    <Row>
        <i-col :span="widths>1440?17:widths>786 && widths<=1440?15:24" class="home-body-left" v-if="flag==1">
            <Row :gutter="16">
                <i-col :span="widths>1440 ? 16 : 24" v-if="widths>1440">
                    <index-modular :height="298"></index-modular>
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24">
                    <Row :gutter="16">
                        <i-col :span="widths>1440 ? 24 : 12">
                            <index-card :widths="widths" :data="taskStatistical" :styles="{height: (widths>1440?140:180) + 'px'}">
                            </index-card>
                        </i-col>
                        <i-col :span="widths>1440 ? 24 : 12">
                            <index-card :widths="widths" :data="performStatistical" :styles="{height: (widths>1440?140:180) + 'px','margin-top': (widths>1440?16:0) + 'px'}">
                            </index-card>
                        </i-col>
                    </Row>
                </i-col>
                <i-col :span="widths>1440 ? 16 : 24" v-if="widths<=1440">
                    <index-modular :height="180" style="margin-top: 16px;"></index-modular>
                </i-col>
            </Row>
            <Row :gutter="16">  <!-- 详细任务区域 -->
                <i-col span="24">
                    <index-task :span="widths>1440 ? 8 : 24" :widths="widths" :taskContext="taskContext" :topHeight="topHeight"></index-task>
                </i-col>
            </Row>
            <!-- 786下显示 -->
            <index-footer :widths="widths"></index-footer>
        </i-col> <!-- 普通员工 -->
        <i-col :span="widths>1440?7:widths>786 && widths<=1440?9:24" class="home-body-right" v-if="flag==1 && widths>786"> <!-- user/参与的项目/推荐 -->
            <index-user :widths="widths"></index-user>  <!-- 人员 -->
            <index-project :projectInfo="projectInfo"></index-project>  <!-- 参与的项目 -->
            <index-recommend></index-recommend>  <!-- 推荐 -->
        </i-col> <!-- 普通员工 -->

        <!-----------------------------------------------------股长---------------------------------------------------------------------->
        <i-col :span="widths>1440?17:widths>786 && widths<=1440?15:24" class="home-body-left" v-if="flag==2">
            <Row :gutter="16"> <!-- 卡片区域 -->
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-card3 :widths="widths" :data="taskStatistical2">
                    </index-card3>
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-card3 :widths="widths" :data="systemNotice" :style="{'margin-top': (widths>1440?0:16) + 'px'}">
                    </index-card3>
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-card3 :widths="widths" :data="reportNumber" :style="{'margin-top': (widths>1440?0:16) + 'px'}">
                    </index-card3>
                </i-col>
            </Row>
            <Row :gutter="16">
                <i-col :span="widths>1440 ? 16 : 24">
                    <index-task2 :widths="widths" :topHeight="topHeight"></index-task2> <!-- 任务列表 -->
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-extra :widths="widths" :topHeight="topHeight"></index-extra> <!-- 专业 -->
                </i-col>
            </Row>
            <!-- 786下显示 -->
            <index-footer :widths="widths"></index-footer>
        </i-col>
        <i-col :span="widths>1440?7:widths>786 && widths<=1440?9:24" class="home-body-right" v-if="flag==2 && widths>786">
            <index-user :widths="widths"></index-user>  <!-- 人员 -->
            <index-project2 :widths="widths"></index-project2>
            <index-recommend></index-recommend>  <!-- 推荐 -->
        </i-col>

        <!-----------------------------------------------------科长---------------------------------------------------------------------->
        <i-col :span="widths>1440?17:widths>786 && widths<=1440?15:24" class="home-body-left" v-if="flag==3">
            <Row :gutter="16">
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-card3 :widths="widths" :data="taskStatistical">
                    </index-card3>
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24">
                    <index-card3 :widths="widths" :data="performStatistical" :style="{'margin-top': (widths>1440?0:16) + 'px'}">
                    </index-card3>
                </i-col>
                <i-col :span="widths>1440 ? 8 : 24"> <!-- EPMS -->
                    <index-epms :widths="widths" :style="{'margin-top': (widths>1440?0:16) + 'px'}"></index-epms>
                </i-col>

                <i-col :span="widths>1440 ? 16 : 24"> <!-- 任务详细 -->
                    <index-modular3 :height="140" :widths="widths" :topHeight="topHeight"></index-modular3>
                </i-col>

                <i-col :span="widths>1440 ? 8 : 24">
                    <index-epms-task :widths="widths" :topHeight="topHeight"></index-epms-task>
                </i-col>
            </Row>
            <!-- 786下显示 -->
            <index-footer :widths="widths"></index-footer>
        </i-col> <!-- 科长 -->
        <i-col :span="widths>1440?7:widths>786 && widths<=1440?9:24" class="home-body-right" v-if="flag==3 && widths>786">
            <index-user :widths="widths"></index-user>  <!-- 人员 -->
            <index-project :projectInfo="projectInfo"></index-project>  <!-- 参与的项目 -->
            <index-recommend></index-recommend>  <!-- 推荐 -->
        </i-col> <!-- 科长 -->
    </Row>
</template>

<script>
import indexFooter from './index-footer'
import indexProject2 from './index-project2'
import indexExtra from './index-extra'
import indexTask2 from './index-task2'
import indexEpmsTask from './index-epms-task'
import indexEpms from './index-epms'
import indexRecommend from './index-recommend'
import indexProject from './index-project'
import indexTask from './index-task'
import indexCard from './index-card'
import indexCard3 from './index-card3'
import indexUser from './index-user'
import indexModular from './index-modular'
import indexModular3 from './index-modular3'
// import * as Api from '@/api/bmsa/home'
import { mapState } from 'vuex'
export default {
  name: 'bmsahome',
  data () {
    return {
      widths: 1450,
      height: 770,
      topHeight: 0,
      flag: 1,
      // 卡片区数据
      taskStatistical: { // 完成统计
        title: '完成统计',
        persent: '36',
        persentAll: '100',
        state: '已完成',
        persentAllStr: '全部'
      },
      performStatistical: { // 执行统计
        title: '执行统计',
        persent: '38',
        persentAll: '216',
        state: '已完成',
        persentAllStr: '全部'
      },
      taskContext: [ // 内容
        {
          state: '未开始',
          number: '1',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        },
        {
          state: '进行中',
          number: '3',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        },
        {
          state: '已完成',
          number: '2',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        }
      ],
      userInfo: { // 人员信息
        name: '吴慈仁',
        org: 'EPK 高级经理',
        number: '10001'
      },
      projectInfo: [ // 项目区域
        {
          title: '协同项目',
          context: ['TPB', '计划']
        },
        {
          title: '车型项目',
          context: ['EPG', '整车']
        }
      ],
      recommend: [ // 推荐区域
        {
          attachName: '未来<span style="color: #cb333b;">X车</span>型项目-项目周报',
          attachURL: '<span style="color: #cb333b;">X车</span>型项目6周项目月报'
        },
        {
          attachName: '未来<span style="color: #cb333b;">X车</span>型项目-项目月报',
          attachURL: '<i class="iconfont iconlingxing"></i><span style="color: #cb333b;">X车</span>型项目6月项目月报'
        }
      ],
      // 科长
      toDo: { // 待办任务数量
        bigTitle: 'EPMS',
        title: '待办任务数量',
        url: '点击查询详情',
        number: '33'
      },
      taskContext1: [ // 内容 股长
        {
          state: '未开始',
          number: '1',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        },
        {
          state: '进行中',
          number: '3',
          context: [
            {
              a: '2019XMHT1',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT2',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT3',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        }
      ],
      etmsTask: [
        {
          a: '2019XMHT',
          b: 'BPM',
          c: 'ISO-TP通信记录',
          d: '2019-10-09',
          e: '张三'
        },
        {
          a: '2019XMHT',
          b: 'BPM',
          c: 'ISO-TP通信记录',
          d: '2019-10-09',
          e: '李四'
        },
        {
          a: '2019XMHT',
          b: 'BPM',
          c: 'ISO-TP通信记录',
          d: '2019-10-09',
          e: '王五'
        }
      ],
      // 股长
      taskStatistical2: { // 完成统计
        title: '待办事项',
        persent: '36',
        persentAll: '100',
        state: '已完成',
        persentAllStr: '全部'
      },
      systemNotice: { // 系统公告
        title: '系统公告',
        persent: '22',
        persentAll: '90',
        state: '已完成',
        persentAllStr: '全部'
      },
      reportNumber: { // 报告数量
        title: '报告数量',
        persent: '44',
        persentAll: '120',
        state: '已完成',
        persentAllStr: '全部'
      },
      taskContext2: [ // 内容
        {
          state: '已延期',
          number: '1',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        },
        {
          state: '进行中',
          number: '3',
          context: [
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            },
            {
              a: '2019XMHT',
              b: '整车交付文档',
              c: 'ISO-TP通信记录',
              d: '2019-10-09',
              e: '张三'
            }
          ]
        }
      ],
      professional: [
        {
          car: '地盘',
          title: 'TPB checklist',
          date: '2019-10-09',
          class: 'icon bg-green'
        },
        {
          car: '发动机',
          title: 'EPG试验报告',
          date: '2019-10-09',
          class: 'icon bg-red'
        },
        {
          car: '车窗',
          title: '重量数据管理',
          date: '2019-10-09',
          class: 'icon bg-red'
        },
        {
          car: '地盘',
          title: 'TPB checklist',
          date: '2019-10-09',
          class: 'icon bg-red'
        }
      ],
      projectInfo2: [ // 项目区域
        {
          title: 'SVW361',
          text: 'NCS',
          percent: 42,
          plan: '项目主计划',
          lf: '里程碑'
        },
        {
          title: 'Ab571/1',
          text: 'AudiX 20年第二次年型',
          percent: 49,
          plan: '项目主计划',
          lf: '里程碑'
        }
      ]
    }
  },
  components: {
    // Api,
    indexCard,
    indexModular,
    indexUser,
    indexTask,
    indexProject,
    indexRecommend,
    indexCard3,
    indexEpms,
    indexModular3,
    indexEpmsTask,
    indexTask2,
    indexExtra,
    indexProject2,
    indexFooter
  },
  created () {
    // 数据字典接口 通用
    // this.getTime()
    // this.getFrom()
    // this.getChild()
    // this.getState()
    // this.getUser()
    // this.getTaskStatistical()
    // this.getPerformStatisticals()
    // this.getProject1()
    // this.getProject2()
    // this.getRecommend()
    // 科长
    // this.getToDo()
    // 股长
    // this.getToDo1()
    // this.getSystemReport()
    // this.getReportNumber()
    // this.getTask()
    // this.getProfessional()
  },
  mounted () {
    this.$nextTick(() => {
      if (this.flag == 1 || this.flag == 2 || this.flag == 3) {
        this.widths = document.body.clientWidth // 浏览器宽度
        if (this.widths > 1440) {
          if (document.getElementsByClassName('home-body-right').length > 0) {
            this.height = document.getElementsByClassName('home-body-right')[0].offsetHeight
          }
          document.getElementsByClassName('home-body-left')[0].style.height = this.height + 'px'
          if (this.flag == 1) {
            this.topHeight = 770 - 315 - 35
          } else if (this.flag == 2) {
            this.topHeight = 770 - 140 - 45 - 75
          } else if (this.flag == 3) {
            this.topHeight = 770 - 280 - 60
          }
        }
      }
    })
    window.addEventListener(
      'resize',
      () => {
        this.$nextTick(() => {
          if (this.flag == 1 || this.flag == 2 || this.flag == 3) {
            this.widths = document.body.clientWidth
            if (this.widths > 1440) {
              if (document.getElementsByClassName('home-body-right').length > 0) {
                this.height = document.getElementsByClassName('home-body-right')[0].offsetHeight
              }
              document.getElementsByClassName('home-body-left')[0].style.height = this.height + 'px'
              if (this.flag == 1) {
                this.topHeight = 770 - 315 - 35
              } else if (this.flag == 2) {
                this.topHeight = 770 - 140 - 45 - 75
              } else if (this.flag == 3) {
                this.topHeight = 770 - 280 - 55
              }
            }
          }
        })
      }
    )
  },
  computed: {
    ...mapState('admin/user', [
      'info'
    ])
  },
  watch: {},
  methods: {
    getTime (parms) { // 时间接口
      Api.getTimes(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getFrom (parms) { // 来源接口
      Api.getFroms(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getChild (parms) { // 子系统接口
      Api.getChilds(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getState (parms) { // 状态接口
      Api.getStates(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getUser (parms) { // 人员信息接口
      Api.getUserInfo(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getTaskStatistical (parms) { // 完成统计接口
      Api.getTaskStatisticals(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getPerformStatistical (parms) { // 执行统计接口
      Api.getPerformStatisticals(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getProject1 (parms) { // 参与项目接口-协同项目
      Api.getSynergyProject(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getProject2 (parms) { // 参与项目接口-车型项目
      Api.getCardProject(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getRecommend (parms) { // 获取推荐接口
      Api.getRecommends(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    // 科长
    getToDo (parms) { // 科长-获取待办接口
      Api.getToDoList(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    // 股长
    getToDo1 (parms) { // 股长-获取待办接口
      Api.getToDoList1(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getSystemReport (parms) { // 股长-获取系统报告接口
      Api.getSystemReports(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getReportNumber (parms) { // 股长-获取报告数量接口
      Api.getReportNumbers(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getTask (parms) { // 股长-获取全部任务和我的任务
      Api.getTasks(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    getProfessional (parms) { // 股长-获取任务
      Api.getProfessionals(parms).then((res) => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    // 任务卡片 -- 时间查询
    timeClick (item) {
      this.timeName = item
      // 接口
      // this.getTime(item)
    },
    // 任务卡片 -- 来源查询
    fromClick (item) {
      this.fromName = item
      // 接口
      // this.getFrom(item)
    },
    // 任务卡片 -- 子系统查询
    childClick (item) {
      this.childName = item
      // 接口
      // this.getChild(item)
    },
    // 任务卡片 -- 状态查询
    stateClick (item) {
      this.stateName = item
      // 接口
      // this.getState(item)
    },
    modalUserInfo () {
      this.$Message.success('人员信息')
    }
  }
}
</script>

<style lang="less">
    /*响应式*/
    .ivu-card-body-col:not(:first-child) {
        margin-top: 16px;
    }

    /*卡片开始*/
    .home-body-left {
        .index-card{
            /*height:140px;*/
            overflow: hidden;
            .index-card-body {
                .chart {
                    .row{
                        display: block;
                        color: #575757;
                        line-height: 35px;
                        font-weight: bold;
                        .num{
                            font-size: 18px;
                            color: #575757;
                            text-align: left;
                            .red{
                                color: #cb333b;
                                font-size: 18px
                            }
                        }
                        .title{
                            font-size: 14px;
                            color: #575757;
                            text-align: right;
                            .red{
                                color: #cb333b;
                                font-size: 14px;
                            }
                        }
                    }
                    img{
                        display: block;
                        margin: 0 auto;
                    }
                }
            }
            .index-card-body1 {
                position: absolute;
                top: 0;
                left: 55px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 98%;
                width: calc(~"100% - 55px");
                padding: 10px;
                .card-title{
                    float: left;
                    color: #0077c8;
                    font-size: 16px;
                    font-weight: bold;
                    width: 70px;
                }
                .chart{
                    float: right;
                    width: calc(~"100% - 70px");
                }
            }
            .index-card-body2 {
                position: absolute;
                top: 0;
                left: 0;
                align-items: center;
                justify-content: center;
                height: 98%;
                width: calc(100%);
                padding: 10px;
                .card-title{
                    color: #0077c8;
                    font-size: 16px;
                    font-weight: bold;
                    width: 70px;
                }
                .chart{
                    margin: 0 auto;
                    width: 80%;
                }
            }
            .index-card-body3 {
                position: absolute;
                top: 0;
                left: 55px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 98%;
                width: calc(~"100% - 55px");
                padding: 10px;
                .card-title{
                    float: left;
                    color: #0077c8;
                    font-size: 16px;
                    font-weight: bold;
                    width: 70px;
                }
                .chart{
                    float: right;
                    width: calc(~"100% - 70px");
                    img {
                        width: 180px!important;
                    }
                    .row {
                        width: 225px;
                        margin: 0 auto;
                    }
                }
            }
        }
        .index-card:before{
            content: "";
            height:0;
            width:0;
            overflow: hidden;
            font-size: 0;
            line-height: 0;
            border-color: #f2f6f9 transparent transparent transparent;
            border-style: solid dashed dashed dashed;
            border-width: 70px 350px 0 0;
            position: absolute;
        }
        .index-card-col:after {
            content: "\e63f";
            font-family: "iconfont" !important;
            padding-right: 5px;
            color:#a6bbc8;
            font-size: 110px;
            position: relative;
            top: -49px;
            left: -27px;
        }
        .index-card-col3:after { // 科长
            content: "\e63f";
            font-family: "iconfont" !important;
            padding-right: 5px;
            color:#a6bbc8;
            font-size: 150px;
            position: relative;
            top: -76px;
            left: 100px;
        }
        .index-card-bg1 {
            border: none!important;
            background: url('../../../assets/images/01.jpg') left bottom #fff;
            background-repeat:no-repeat;
            background-size:100%;
        }
        .index-card-bg2 {
            border: none!important;
            background: url('../../../assets/images/02.jpg') left bottom #fff;
            background-repeat:no-repeat;
            background-size:100%;
        }
        .index-card-recom { // 786以下的card
            overflow: hidden;
            .card-title{
                color: #0268ad;
                font-size: 16px;
                font-weight: bold;
                margin-left: 20px;
                line-height: 7.5;
            }
            .card-title2{
                color: #0077c8;
                font-size: 16px;
                font-weight: bold;
                margin-left: 67px;
                line-height: 7.5;
            }
        }
        .index-card-recom:after { // 786以下的card
            content: "\e63f";
            font-family: "iconfont" !important;
            padding-right: 5px;
            color:#0077c8;
            font-size: 120px;
            position: relative;
            top: -63px;
            left: 69px;
        }
        .index-card-recom-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 120px;
            opacity:0.5;
            background: #fff;
        }
        .index-card-recom-bg:after {
            content: "";
            position: absolute;
            left: 100px;
            opacity:3.5;
            width: 0;
            height: 0;
            border-top: 60px solid transparent;
            border-left: 58px solid #fff;
            border-bottom: 60px solid transparent;
        }
        .index-card-body-recom { // 786以下的card
            .chart {
                .row{
                    display: block;
                    color: #575757;
                    line-height: 35px;
                    font-weight: bold;
                    .num{
                        font-size: 18px;
                        color: #575757;
                        text-align: left;
                        .red{
                            color: #cb333b;
                            font-size: 18px
                        }
                    }
                    .title{
                        font-size: 14px;
                        color: #575757;
                        text-align: right;
                        .red{
                            color: #cb333b;
                            font-size: 14px;
                        }
                    }
                }
                img{
                    display: block;
                    margin: 0 auto;
                }
            }
        }
    }
    /*卡片结束*/

    /*用户开始*/
    .home-body-right {
        .index-user{
            /*height: 140px;*/
            background: #0077c8;
            background: -webkit-linear-gradient(90deg,#0062d1,#0077c8,#0098ff);
            background: -moz-linear-gradient(to right,#0062d1,#0077c8,#0098ff);
            background: -o-linear-gradient(to right,#0062d1,#0077c8,#0098ff);
            background: linear-gradient(90deg,#0062d1,#0077c8,#0098ff);
            img{
                border-radius: 50%;
            }
            .user-img{
                width: 100px;
                float: left;
                position: absolute;
                img{
                    width: 100px;
                    height: 100px;
                }
            }
            .user-img1{
                width: 65px;
                margin: 0 auto;
                img{
                    width: 65px;
                    height: 65px;
                }
            }
            .user-right{
                width: calc(~"100% - 50px");
                float: right;
                margin-right: -16px;
            }
            .user-right1{
                position: absolute;
                top: 84px;
                width: 100%;
                text-align: center;
                margin-left: -16px;
                .user-button{  // 1440以下，人员按钮样式
                    padding: 4px 0 4px 0!important;
                }
                ul {
                    display: table;
                    margin: 0 auto;
                    li:first-child{
                        margin-left: 12px;
                    }
                }
            }
            .user-name{
                display: block;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                padding: 5px 0 5px 50px;
            }
            .user-name1{
                display: block;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
            }
            .user-position{
                display: block;
                color: #94e4ff;
                padding-left: 50px;
            }
            .user-position1{
                display: block;
                color: #94e4ff;
            }
            .user-id{
                padding-left: 20px;
            }
            .user-button{
                margin-top: 5px;
                height: 35px;
                background: rgba(255,255,255,0.2);
                padding: 4px 0 4px 50px;
                li{
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
                        color: #fff;
                        font-size: 18px;
                    }
                }
                li:hover{
                    background: #333f48;
                    border: #333f48 1px solid;
                    box-shadow: 1px 1px #2c99bd;
                    cursor: pointer;
                }
            }
        }
        .index-user:before{
            content: "\e60d";
            font-family: "iconfont" !important;
            padding-right: 5px;
            color:#ffc72e;
            font-size: 20px;
            position:absolute;
            top: -7px;
            right: 5px;
        }
        .index-user:after{
            content: "\e641";
            font-family: "iconfont" !important;
            padding-right: 5px;
            color:rgba(255,255,255,0.12);
            font-size: 160px;
            position: absolute;
            top: -50px;
            left: -25px;
        }
    }
    /*用户结束*/

    /*模块开始*/
    .index-modular{
        margin-top: 15px;
        border: 1px solid rgba(51, 63, 72, 0.15);
        .ivu-card-head{
            background: -webkit-linear-gradient(180deg,#ffffff,#f1f1f1);
            background: -moz-linear-gradient(to bottom,#ffffff,#f1f1f1);
            background: -o-linear-gradient(to bottom,#ffffff,#f1f1f1);
            background: linear-gradient(180deg,#ffffff,#f1f1f1);
            border-radius: 4px 4px 0 0;
            font-size: 16px;
            font-weight: bold;
            color: #000;
        }
        .ivu-card-extra {
            top:13px;
            color: rgba(51,63,72,0.7);
        }
        .ivu-card-extra span{
            padding:0 5px;
        }
    }
    /*模块结束*/

    /*任务开始*/
    .index-task{
        background:none;
        border: none;
        .ivu-card-head{
            background:#fff;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            border: 1px solid rgba(51, 63, 72, 0.15);
        }
        .ivu-card-head .num{
            font-size: 14px;
            padding-left: 15px;
            color: #8e8f90;
        }
        .ivu-card-body{
            padding: 15px 0 0 0;
            .index-task-list{
                background:#fff;
                border: 1px solid rgba(51, 63, 72, 0.15);
                .ivu-card-head{
                    background:#fff;
                    border-radius: 4px 4px 0 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: #000;
                    border:none;
                    padding-bottom: 0;
                    .num{
                        font-size: 14px;
                        padding-left: 15px;
                        color: #8e8f90;
                    }
                }
                .ivu-card-body{
                    padding: 15px;
                }
            }
            .index-task-list:hover{
                box-shadow: none;
            }
        }
    }
    .index-task:hover{
        box-shadow: none;
    }
    /*任务结束*/
    /*任务中的card*/
    .index-task-card{
        width: 100%;
        text-align: left;
        position: relative;
        .class{
            position: absolute;
            border-radius: 4px;
            background: rgb(166,187,200);
            padding: 3px 10px;
            right:0;
            top: 0;
            color: #fff;
        }
        .class1 {
            height: 25px;
            width: 40%;
        }
        .title{
            color:#0077c8;
            font-size: 16px;
            font-weight: bold;
        }
        .text{
            padding-left: 28px;
            width: 100%;
        }
        .bottom-div{
            width: 100%;
            height: 30px;
            padding-top: 5px;
        }
        .date{
            color: #b9b9b9;
            padding: 3px 0 0 28px;
            width: 62%;
            float: left;
            i{
                color:rgb(166,187,200);
                font-size: 16px;
                margin-right: 10px;
            }
        }
        .user{
            color: #b9b9b9;
            /*padding-left: 28px;*/
            width: 38%;
            float: right;
            text-align: right;
            img{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 8px;
            }
            span{
                position: relative;
                top: -6px;
            }
        }
    }
    /*任务中的card*/
    /*专业开始*/
    .index-modular-listbox{
        width: 100%;
        li{
            background: #fff;
            border: 1px solid rgba(51, 63, 72, 0.1);
            box-shadow: 2px 2px 2px rgba(51, 63, 72, 0.05);
            padding: 10px;
            margin-bottom: 16px;
            list-style-type: none;
            border-radius: 4px;
        }
        li:last-child{
            margin-bottom: 0;
        }
        li:hover{
            box-shadow: 2px 2px 2px rgba(51, 63, 72, 0.2);
            border: 1px solid rgba(51, 63, 72, 0.15);
        }
    }
    .index-modular-list-border{
        width: 100%;
        li{
            border-bottom: 1px solid rgba(51, 63, 72, 0.1);
            padding: 10px;
            list-style-type: none;
        }
        li:last-child{
            margin-bottom: 0;
        }
    }
    .index-major{
        width: 100%;
        text-align: center;
        .car{
            width: 100%;
            position: relative;
        }
        .class{
            position: absolute;
            border-radius: 4px;
            background: rgb(166,187,200);
            padding: 3px 10px;
            left: 58%;
            top: 0;
            color: #fff;
        }
        .title{
            color:#0077c8;
            font-size: 16px;
            font-weight: bold;
        }
        .icon{
            color:#fff;
            font-size: 16px;
            border-radius: 4px;
            margin-right: 10px;
            padding: 3px;
        }
        .date{
            color: #b9b9b9;
            i{
                color:rgb(166,187,200);
                font-size: 16px;
                margin-right: 10px;
            }
        }
    }
    .bg-green{
        background: #84bd00;
    }
    .bg-red{
        background: #cb333b;
    }
    .bg-blue{
        background: #0077c8;
    }
    .bg-yellow{
        background: #ffc72c;
    }

    .color-green{
        color: #84bd00;
    }
    .color-red{
        color: #cb333b;
    }
    .color-blue{
        color: #0077c8;
    }
    .color-yellow{
        color: #ffc72c;
    }

    .index-margin{
        margin-left: 15px;
    }
    /*专业结束*/

    /*参与的项目开始*/
    .index-project{
        width: 100%;
        text-align: left;
        height: 100px;
        .state{
            width: 100%;
            text-align: right;
            padding-top: 8px;
            height: 26px;
            i{
                font-size: 16px;
                color:#0077c8;
                margin-right: 8px;
            }
            span{
                float: left;
                margin-right: 8px;
            }
            .milepost{
                position: relative;
                float: left;
                width: 25px;
                height: 25px;
                span{
                    z-index: 1;
                    position: relative;
                    color: #fff;
                    font-size: 12px;
                    line-height: 22px;
                }
            }
            .milepost:after{
                content: "\e643";
                font-family: "iconfont" !important;
                color:#0077c8;
                font-size: 27px;
                position: absolute;
                top:-10px;
                left:-6px;
                z-index: 0;
            }
        }
        .information{
            width: 100%;
            text-align: left;
            height:72px;
            position: relative;
            left: -10px;
            border-bottom: 1px solid rgba(51, 63, 72, 0.15);
            .logo{
                background-color:rgba(0,119,200,0.08);
                border-radius: 0 20px 20px 0;
                width: 80px;
                padding:5px;
                height: 54px;
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
                img{
                    display: block;
                }
            }
            .information-right{
                width:calc(~"100% - 90px");
                float: right;
                .title{
                    float: left;
                    font-size: 16px;
                    font-weight: bold;
                    color:#0077c8;
                    width: 100%;
                }
                .text{
                    float: left;
                    padding-left: 28px;
                    width: 100%;
                }
                .bar{
                    float: left;
                    padding-left: 28px;
                    width: 100%;
                }
            }
        }
    }
    .red-lamp{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #cb333b;
        border:#a51017 1px solid;
        display: inline-flex;
        position: relative;
        top: 2px;
        margin-right: 8px;
    }
    .yellow-lamp{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffc72c;
        border:#cb8600 1px solid;
        display: inline-flex;
        position: relative;
        top: 2px;
        margin-right: 8px;
    }
    .green-lamp{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #84bd00;
        border:#608a00 1px solid;
        display: inline-flex;
        position: relative;
        top: 2px;
        margin-right: 8px;
    }
    /*参与的项目结束*/
    /*推荐开始*/
    .index-recommend{
        width: 100%;
        text-align: left;
        height:70px;
        .icon{
            width: 80px;
            float: left;
            text-align: center;
            i{
                color:#193d77;
                font-size: 40px;
                display: block;
            }
        }
        .right{
            width: calc(~"100% - 90px");
            float: right;
            height: 60px;
            overflow: hidden;
            /*overflow-y: auto;*/
            .title{
                width: 100%;
                float: left;
                color: #000;
                font-size: 16px;
                font-weight: bold;
                padding: 8px 0;
            }
            span{
                color: #cb333b;
            }
            .text{
                color: #0077c8;
                text-decoration:underline;
                i{
                    color: #0077c8;
                    font-size: 12px;
                }
            }
        }
    }

    /*后增加*/
    .index-card-body{
        .card-title2{
            float: left;
            color: #0077c8;
            font-size: 16px;
            font-weight: bold;
            width: 140px;
            .big-title{
                float: left;
                color: #333f48;
                font-size: 20px;
                font-weight: bold;
                width: 100%;
            }
        }
        .chart2{
            float: right;
            width: calc(~"100% - 140px");
            img{
                display: block;
                margin: 0 auto;
            }
            p{
                display: block;
                color: #575757;
                line-height: 35px;
                font-weight: bold;
                .num{
                    font-size: 20px;
                    color: #575757;
                    float: left;
                    width: 100%;
                    .red{
                        color: #cb333b;
                        font-size: 32px
                    }
                }
                .link{
                    font-size: 14px;
                    color: #0077c8;
                    float: left;
                    width: 100%;
                    text-decoration: underline;
                }
                .title{
                    font-size: 14px;
                    color: #575757;
                    float: right;
                    .red{
                        color: #cb333b;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .index-project-kezhang{
        width: 100%;
        text-align: left;
        position: relative;
        margin-bottom: 15px;
        .more{
            text-align: right;
            position: absolute;
            right: 10px;
            top:4px;
            color: #8e8f90;
            font-size: 20px;
            a{
                color: #8e8f90;
            }
        }
        ul{
            width: 100%;
            padding-top: 15px;
            li{
                width: 100%;
                background: #fff;
                border: 1px solid rgba(51, 63, 72, 0.15);
                border-radius:4px;
                padding:2px 5px;
                line-height: 30px;
                margin-bottom: 16px;
                a{
                    color: #333f48;
                }
            }
            li:nth-child(2n){
                background: #f8f8fa;
            }
            li:before{
                content: "\e692";
                font-family: "iconfont" !important;
                color:#a6bbc8;
                font-size:18px;
                margin-right: 8px;
            }
            li:hover{
                box-shadow: 2px 2px 2px rgba(51, 63, 72, 0.2);
                border: 1px solid rgba(51, 63, 72, 0.15);
            }
        }
    }
    .index-project-kezhang:last-child{
        margin-bottom: 0;
    }
    .index-modular-listbg{
        width: 100%;
        li{
            border: none;
            list-style-type: none;
        }
        li:last-child{
            margin-bottom: 0;
        }
    }
    /*.index-major li:nth-child(2n){*/
    /*background: #f9f9f9;*/
    /*}*/
    .index-task-list {
        .ivu-card-head-green{
            background: #84bd00;
            border-radius: 4px 4px 0 0;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            border: none;
            padding: 14px 16px;
            .num{
                font-size: 14px;
                color: #fff;
                margin-left: 10px;
            }
        }
    }
    .index-condition{
        width:100%;
        li{
            width:100%;
            list-style-type: none;
            line-height: 28px;
            height: 28px;
            .name{
                width:70px;
                text-align: left;
                float: left;
            }
            .option{
                width:calc(~"100% - 70px");
                text-align: left;
                float: left;
                li{
                    text-align: left;
                    display: initial;
                    font-size: 14px;
                    font-weight: normal;
                    a{
                        color: #333f48;
                    }
                    span{
                        padding: 0 10px 0 0;
                    }
                }
                li:after{
                    content: "|";
                    font-family: "iconfont" !important;
                    color:#a6bbc8;
                    font-size:14px;
                    margin-right: 8px;
                }
            }
        }
    }
    .index-condition li .option li .all,.index-condition li .option li .all a{
        color: #0077c8;
    }
</style>
