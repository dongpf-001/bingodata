<template>
    <div class="ivu-card index-modular index-margin">
        <div class="ivu-card-head">参与的项目</div>
        <!--                <div class="ivu-card-extra"><div class="ivu-dropdown-rel"><i class="ivu-icon ivu-icon-ios-options"></i><span>更多视图</span><i class="ivu-icon ivu-icon-ios-arrow-down"></i></div></div>-->
        <div class="ivu-card-body">
            <div class="index-modular-listbg">
                <ul>
                    <li v-for="(item, key) in projectInfo" :key="key">
                        <div class="index-project-kezhang">
                            <div class="">
                                <h5>{{item.title}}</h5>
                                <div class="more"><a href="#"><i class="ivu-icon ivu-icon-ios-more"></i></a></div>
                                <ul v-for="(item2, key) in item.context" :key="key">
                                    <li><a href="#">{{item2}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index-card',
  components: {
  },
  props: {
    projectInfo: {
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
