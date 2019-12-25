<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="onSelect">
      <!--正常menu-->
      <menu-item name="4">
        <Icon type="ios-construct" />
        综合设置{{flag}}
      </menu-item>
      <!--带下拉menu-->
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <template>
          <menu-item name="one">用户留存</menu-item>
          <menu-item name="two">流失用户</menu-item>
        </template>
      </Submenu>
    </Menu>
    <div slot="one" style="height:500px" v-if="flag=='one'">
      <Divider>详细描述</Divider>
      <h3>props</h3>
    </div>
    <div slot="two" style="height:500px" v-if="flag=='two'">
      <Divider>第二个页面</Divider>
      <h3>props</h3>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      flag: 'one'
    }
  },
  created () {
  },
  computed: {
  },
  components: {
  },
  methods: {
    onSelect (name) {
      this.flag = name
    }
  }
}
</script>
