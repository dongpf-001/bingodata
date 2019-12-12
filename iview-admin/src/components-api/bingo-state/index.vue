<template>
    <div class="state-wrapper">
        <Poptip :trigger="disabled ? 'click' : 'hover'"
                :disabled="disabled"
                v-if="type!='select'"
                placement="right">
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
<!--        <Dropdown placement="bottom-start" class="down-class" @on-click="change"-->
<!--                  trigger="click" v-if="type=='drop'" style="width: 100%;">-->
<!--            <div class="ivu-input">-->
<!--                <span class="traffic-light" :class='showClass' @click="onClick" :style="{width:size+'px',height:size+'px'}"></span>-->
<!--            </div>-->
<!--            <DropdownMenu slot="list" style="width: 100%">-->
<!--                <DropdownItem v-for='item in states' :key='item.value' :name="item.color">-->
<!--                    <span class="traffic-light" :class='item.color' :style="{width:size+'px',height:size+'px'}">-->
<!--&lt;!&ndash;                        <Icon type="md-checkmark" class="state-icon" v-if="showClass == item.color"/>&ndash;&gt;-->
<!--                    </span>-->
<!--                </DropdownItem>-->
<!--            </DropdownMenu>-->
<!--        </Dropdown>-->

        <Select v-model='state'  @on-change='handleSelectState' v-if="type=='select'">
            <span :class='stateIcon' class='traffic-light' slot='prefix' :style="{width:size+'px',height:size+'px'}"></span>
            <Option v-for='item in states' :value='item.value' :key='item.value' label=' '>
                <span class="traffic-light" :class='item.color' :style="{width:size+'px',height:size+'px'}">
                </span>
                <span style="float: right;margin-top: 0px;">{{item.msg}}</span>
            </Option>
        </Select>
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
      showGreen: false
    }
  },
  props: {
    states: {
      type: [Array, Function],
      default () {
        return [
          {
            value: 0,
            color: 'red',
            msg: ''
          },
          {
            value: 1,
            color: 'yellow'
          },
          {
            value: 2,
            color: 'green'
          },
          {
            value: 3,
            color: 'redYellow'
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
    type: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 22
    }
  },
  mounted () {
  },
  computed: {
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
      this.state = type
      this.$emit('input', this.state)
      this.$emit('on-change', this.state)
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
    }
  }
}
</script>
<style lang="less">
    .traffic-light {
        margin-top: 4px;
        border-radius: 50%;
        display: inline-block;
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
        background-color: #C0C0C0;
    }
    .red {
        background-color: red;
    }

    .yellow {
        background-color: yellow;
    }
    .green {
        background-color: green;
    }
    .redYellow {
        background: linear-gradient(to bottom, red 0%, red, red, yellow, yellow, yellow 100%);
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
</style>
