<template>
    <div class="staff-wrapper">
        <Poptip trigger="hover"
                placement="right"
                width="380"
                @on-popper-show="popperShow"
                :transfer="true">
            <slot>
                <span>{{data.name}}</span>
            </slot>
            <div class="api" slot="content" >
                <div style="display: inline-block;vertical-align: middle;width: 30%">
                    <img :src="data.photo" class="staff-img" alt="">
                </div>
                <div style="display: inline-block;vertical-align: middle;width: 70%">
                    <div class="staff-body">
                        <span class="staff-head">{{data.name}}</span>
<!--                        <span class="staff-head2">{{data.nachn}}</span>-->
                        <div class="staff-head-icon">
                            <span class="icon iconfont iconmsnui-male" v-if="data.gesch == '1'"></span>
                            <span class="icon iconfont iconnvcopy" v-if="data.gesch == '2'"></span>
                        </div>
                    </div>
                    <div class="staff-body">
                        <Icon type="md-person" size="18" class="staff-icon"/><span class="staff-body-content">{{data.pernr}}</span>
                        <hr size=1 class="staff-line">
                    </div>
                    <div class="staff-body">
                        <Icon type="icon iconfont icona1" class="staff-icon"/><span class="staff-body-content">{{data.department}}</span>
                        <hr size=1 class="staff-line">
                    </div>
                    <div class="staff-body">
                        <Icon type="ios-call" size="18" class="staff-icon"/><span class="staff-body-content">{{data.mobile}}</span>
                        <hr size=1 class="staff-line">
                    </div>
                    <div class="staff-body">
                        <Icon type="md-mail" size="18" class="staff-icon"/><span class="staff-body-content">{{data.email}}</span>
                        <hr size=1 class="staff-line">
                    </div>
                </div>
            </div>
        </Poptip>
    </div>
</template>
<script>
export default {
  name: 'bing-staff-card',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default () {
        return ''
      }
    },
    data: {
      type: [Array, Object],
      default () {
        return []
      }
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    popperShow () {
      this.$emit('on-popper-show')
    }
  }
}
</script>
<style lang="less">
    .staff-img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    .staff-head {
        font-size: 18px;
        font-weight: bold;
        /*color: #145aa0;*/
    }
    .staff-head2 {
        font-size: 22px;
        margin-left: 22px;
        font-weight: bold;
        color: #145aa0;
    }
    .staff-body {
        margin: 8px 0 8px 0;
        .staff-icon {
            color: #145aa0;
        }
        .staff-head-icon {
            /*float: left;*/
            display: inline-block;
            margin-left: 12px;
            text-align: center;
            width: 22px;
            height: 22px;
            background: #fec82a;
            border-radius: 50%;
            span {
                color: #fff;
                font-size: 14px;
            }
        }
    }
    .staff-body-content {
        font-size: 14px;
        margin: 0 0 5px 10px;
        color: #b9b9b9;
    }
    .staff-line {
        color: #515a6e;
        border-style:dashed;
    }
</style>
