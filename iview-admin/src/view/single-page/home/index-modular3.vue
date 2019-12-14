<template>
    <div class="ivu-card index-modular index-task">
        <div class="ivu-card-head" :style="'height:'+ height +'px;'">
            <div class="index-condition">
                <ul>
                    <li>
                        <div class="name">时间</div>
                        <div class="option">
                            <ul>
                                <li v-for="(item, key) in time" :key="key">
                                    <span :class="{ 'all': timeName==item }">
                                        <a href="#" @click="timeClick(item)">{{item}}</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="name">子系统</div>
                        <div class="option">
                            <ul>
                                <li v-for="(item, key) in child" :key="key">
                                    <span :class="{ 'all': childName==item }">
                                        <a href="#" @click="childClick(item)">{{item}}</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ivu-card-body" style="padding-top: 0">
            <Row :gutter="16">
                <i-col span="24">
                    <index-task :span="widths>1440 ? 12 : 24" :widths="widths" :taskContext="taskContext1" :topHeight="topHeight"></index-task>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
import indexTask from './index-task'
export default {
  name: 'index-modular',
  data () {
    return {
      time: ['全部', '7天内', '30天内'],
      from: ['全部', 'E架构', '任务中心', '其他'],
      child: ['全部', '主计划', 'TPB', '整车发展流程', '模块验收表单', 'EPG费用'],
      state: ['全部', '未开始', '进行中', '已延期', '已完成'],
      timeName: '全部',
      fromName: '全部',
      childName: '全部',
      stateName: '全部',
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
      ]
    }
  },
  components: {
    indexTask
  },
  props: {
    height: Number,
    widths: {
      type: Number,
      default: 1450
    },
    topHeight: {
      type: Number
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
