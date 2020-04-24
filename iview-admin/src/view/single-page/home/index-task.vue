<template>
    <div class="ivu-card index-modular index-task" style="margin-top: 0;">
        <div class="ivu-card-body">
            <Row :gutter="16">
                <i-col :span="span" v-for="(item, key) in taskContext" :key="key"
                       :class="{ 'ivu-card-body-col': widths<=1440 }">
                    <div class="ivu-card index-task-list">
                        <div class="ivu-card-head-green">
                            {{item.state}}<span class="num">{{item.number}}</span>
                        </div>
                        <div class="ivu-card-body" :style="widths>1440?'max-height: 600px;height:'+(topHeight) + 'px': ''"
                             style="overflow: hidden;overflow-y: auto;">
                            <div class="index-modular-listbox">
                                <ul>
                                    <li v-for="(item2, key) in item.context" :key="key">
                                        <div class="index-task-card">
                                            <div class="title"><span class="red-lamp"></span><a href="#">{{item2.a}}</a></div>
                                            <div class="class" :class="widths>1440? 'class1' : ''">{{item2.b}}</div>
                                            <div class="text">{{item2.c}}</div>
                                            <div class="bottom-div">
                                                <div class="date"><i class="ivu-icon ivu-icon-ios-calendar-outline"></i>{{item2.d}}</div>
                                                <div class="user"><img src="../../../assets/images/user.jpg"/><span>{{item2.e}}</span></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index-card',
  components: {
  },
  props: {
    widths: {
      type: Number,
      default: 1450
    },
    span: {
      type: [Function, String, Number]
    },
    topHeight: {
      type: Number
    },
    taskContext: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
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
