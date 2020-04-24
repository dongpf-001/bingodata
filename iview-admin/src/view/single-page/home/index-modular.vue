<template>
    <div class="ivu-card index-modular index-task ivu-card-bg" style="margin-top: 0;"> <!-- 任务卡片区 -->
        <div class="ivu-card-head ivu-card-head-bg" :style="'height:'+ height +'px;'">
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
                        <div class="name">来源</div>
                        <div class="option">
                            <ul>
                                <li v-for="(item, key) in from" :key="key">
                                    <span :class="{ 'all': fromName==item }">
                                        <a href="#" @click="fromClick(item)">{{item}}</a>
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
                    <li>
                        <div class="name">状态</div>
                        <div class="option">
                            <ul>
                                <li v-for="(item, key) in state" :key="key">
                                    <span :class="{ 'all': stateName==item }">
                                        <a href="#" @click="stateClick(item)">{{item}}</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
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
      stateName: '全部'
    }
  },
  components: {
  },
  props: {
    height: Number
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
    /*.ivu-card-bg:before{*/
    /*    content: "";*/
    /*    height:0;*/
    /*    width:0;*/
    /*    overflow: hidden;*/
    /*    font-size: 0;*/
    /*    line-height: 0;*/
    /*    border-color: #f2f6f9 transparent transparent transparent;*/
    /*    border-style: solid dashed dashed dashed;*/
    /*    border-width: 70px 350px 0 0;*/
    /*    position: absolute;*/
    /*}*/
    /*.ivu-card-head-bg {*/
    /*    background: url('../../../assets/images/car-bg.jpg') left bottom #fff!important;*/
    /*    background-repeat:no-repeat!important;*/
    /*    background-size:40%!important;*/
    /*}*/
</style>
