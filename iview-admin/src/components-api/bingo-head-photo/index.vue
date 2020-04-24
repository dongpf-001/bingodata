<template>
    <!--iview-pro头像组件真次-->
    <!--<AvatarList v-bind="$attrs" v-on="$listeners" :excessStyle="excessStyle" :list="list" :max="max">-->
        <!--<span slot="excess">-->
            <!--<Tooltip :content="label" transfer>-->
                <!--+{{list.length - max}}-->
            <!--</Tooltip>-->
        <!--</span>-->
    <!--</AvatarList>-->
    <div>
        <span class="head-photo-wrapper" v-for="(item, key) in list" :key="key" v-if="key<=max">
            <Tooltip :content="item.tip" transfer v-if="key<max">
                <Avatar :src="item.src" v-if="item.src && item.src!=''"></Avatar>
                <Avatar v-else-if="item.gesch == '1'">
                    <svg class="icon" aria-hidden="true" width="41px" height="41px" style="margin-top: -7px;margin-left: -3px;">
                        <use xlink:href="#iconuser-boy-copy" width="100%"></use>
                    </svg>
                </Avatar>
                <Avatar v-else>
                    <svg class="icon" aria-hidden="true" width="41px" height="41px" style="margin-top: -7px;margin-left: -3px;">
                        <use xlink:href="#iconuser-girl-copy" width="100%"></use>
                    </svg>
                </Avatar>
            </Tooltip>
            <Tooltip :content="label" transfer v-else>
                <Avatar>+{{list.length-max}}</Avatar>
            </Tooltip>
        </span>
    </div>
</template>
<script>
export default {
  name: 'bing-head-photo',
  data () {
    return {
      label: ''
    }
  },
  components: {
  },
  props: {
    excessStyle: {
      type: Object,
      default: () => {
        return {
          color: '#f56a00',
          backgroundColor: '#ffc72c'
        }
      }
    },
    list: {
      type: Array,
      default: []
    },
    max: {
      type: Number,
      default: 3
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    if (this.list.length > this.max) {
      let arr = []
      this.list.forEach((item, key) => {
        if (key > this.max - 1) {
          arr.push(item.tip)
        }
      })
      this.label = arr.join('，')
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function (value) {
        if (value.length > this.max) {
          let arr = []
          value.forEach((item, key) => {
            if (key > this.max - 1) {
              arr.push(item.tip)
            }
          })
          this.label = arr.join('，')
        }
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
    .head-photo-wrapper:not(first-child) {
        margin-right: -12px;
    }
    .head-photo-wrapper {
        .ivu-avatar {
            background: #bfbfbf;
        }
    }
</style>
