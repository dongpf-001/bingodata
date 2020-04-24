<template>
    <div class="state-wrapper">
        <Poptip :trigger="disabled ? 'click' : 'hover'"
                :disabled="disabled"
                v-if="type!='select' && type!='vertical'"
                :placement="placement">
            <span class="traffic-light" :class='showClass' @click="onClick"
                  :style="{width:size+'px',height:size+'px'}"></span>
            <div class="api" slot="content">
                <div v-for='item in states' :key='item.value' class="state-content">
                    <span class="traffic-light" :class='item.color' @click="change(item.color)"
                          :style="{width:size+'px',height:size+'px'}">
                        <Icon type="md-checkmark" class="state-icon" v-if="showClass == item.color"/>
                    </span>
                </div>
            </div>
        </Poptip>

        <Select v-model='state' :placeholder="placeholder" :disabled="disabled"  @on-change='handleSelectState' v-if="type=='select'">
            <span :class='stateIcon' class='traffic-light' slot='prefix' :style="{width:size+'px',height:size+'px'}"></span>
            <Option v-for='item in states' :disabled="item.disabled" :value='item.value' :key='item.value' label=' '>
                <span class="traffic-light" :class='item.color' :style="{width:size+'px',height:size+'px'}">
                </span>
                <span style="float: right;margin-top: 0px;">{{item.msg}}</span>
            </Option>
        </Select>

        <div v-if="type=='vertical'" class="state-vertical">
            <div class="state-vertical-title">
                <p>{{title}}</p>
            </div>
            <div v-for='item in verticalState' :key='item.value' class="state-vertical-state">
                <span class="traffic-light" :class='item.color' @click="change(item.color)"
                      :style="showClass == item.color?styles:styles2">
<!--                    <Icon type="md-checkmark" size="18" class="state-vertical-icon" v-if="showClass == item.color"/>-->
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bing-state',
  data () {
    return {
      state: this.value,
      stateIcon: '',
      showRed: false,
      showRedYellow: false,
      showYellow: false,
      showGreen: false,
      verticalState: [
        {
          value: 'red',
          color: 'red',
          msg: ''
        },
        {
          value: 'yellow',
          color: 'yellow'
        },
        {
          value: 'green',
          color: 'green'
        }
      ]
    }
  },
  props: {
    states: {
      type: [Array, Function],
      default () {
        return [
          {
            value: 'red',
            color: 'red',
            msg: ''
          },
          {
            value: 'redYellow',
            color: 'redYellow'
          },
          {
            value: 'yellow',
            color: 'yellow'
          },
          {
            value: 'green',
            color: 'green'
          }
        ]
      }
    },
    value: {
      type: [String, Number, Array, Object],
      default () {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isCondition: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 22
    },
    placement: {
      type: String,
      default: 'right'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (value) {
      this.state = value
    }
  },
  mounted () {
  },
  computed: {
    styles () {
      let style = {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
      return style
    },
    styles2 () {
      let style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        opacity: 0.2
      }
      return style
    },
    showClass () {
      let showClass = 'white'
      if (this.state === 'red') {
        showClass = 'red'
      } else if (this.state === 'redYellow') {
        showClass = 'redYellow'
      } else if (this.state === 'yellow') {
        showClass = 'yellow'
      } else if (this.state === 'green') {
        showClass = 'green'
      }
      return showClass
    }
  },
  methods: {
    change (type) {
      if (!this.disabled) { // 只读状态下不可操作
        let _this = this
        if (this.isCondition) { // 判断是否有条件
          this.$emit('on-change', type, () => {
            _this.state = type
          })
          this.$emit('input', _this.state)
        } else {
          _this.state = type
          this.$emit('on-change', type)
          this.$emit('input', _this.state)
        }
      }
    },
    onClick () {
      this.$emit('on-click')
    },
    // 事件
    handleSelectState (value) {
      for (let state of this.states) {
        if (state.value === value) {
          this.stateIcon = state.color
          break
        }
      }
      this.$emit('input', this.state)
    }
  }
}
</script>
<style lang="less">
    .traffic-light {
        margin-top: 4px;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
    }
    .state-content {
        float: left;
        text-align: center;
    }
    .state-content:not(:first-child) {
        margin-left: 8px;
    }
    .drop-state-content {
        float: left;
        text-align: center;
        margin-left: 8px;
    }
    .white {
        background-color: #8e8f90;
    }
    .red {
        background-color: #cb333b;
    }

    .yellow {
        background-color: #ffc72c;
    }
    .green {
        background-color: #84bd00;
    }
    .redYellow {
        background: linear-gradient(to bottom, #cb333b 0%, #cb333b, #cb333b, #cb333b, #ffc72c, #ffc72c, #ffc72c, #ffc72c 100%);
    }
    .state-icon {
        color: white;
        margin: 0 auto;
    }
    /*----------------------------------*/
    .state-wrapper {
        .ivu-poptip-inner {
            background-color: rgba(0 ,0 ,0 , 0.2);
        }
        .ivu-poptip-rel {
            top: 2px
        }
    }
    .state-wrapper .ivu-poptip-popper[x-placement^=right] .ivu-poptip-arrow:after {
        content: " ";
        left: 1px;
        bottom: -7px;
        border-left-width: 0;
        border-right-width: 7px;
        border-right-color: rgba(0 ,0 ,0 , 0.1);
    }
    .state-wrapper .ivu-poptip-popper[x-placement^="left"] .ivu-poptip-arrow:after {
        content: " ";
        right: 1px;
        border-right-width: 0;
        border-left-width: 7px;
        border-left-color: rgba(0 ,0 ,0 , 0.1);
        bottom: -7px;
    }
    .state-wrapper .ivu-poptip-popper[x-placement^="top"] .ivu-poptip-arrow:after {
        content: " ";
        bottom: 1px;
        margin-left: -7px;
        border-bottom-width: 0;
        border-top-width: 7px;
        border-top-color: rgba(0 ,0 ,0 , 0.1);
    }
    .state-vertical { // 纵向状态
        width: 50px;
        /*border: 1px solid red;*/
        background: #d2dde3;
        border-radius: 10px;
        .state-vertical-title {
            height: 32px;
            text-align: center;
            color: #fff;
            background: #0077c8;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            p {
                padding-top: 6px;
            }
        }
        .state-vertical-state {
            margin-top: 4px;
            margin-bottom: 4px;
            text-align: center;
            .state-vertical-icon {
                color: #0077c8;
                margin-top: 5px;
            }
        }
    }
</style>
