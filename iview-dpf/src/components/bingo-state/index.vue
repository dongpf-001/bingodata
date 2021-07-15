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

        <Select v-model='state' :placeholder="placeholder" :disabled="disabled" :transfer="transfer"
                @on-change='handleSelectState' v-if="type=='select'">
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
                stateIcon: this.value,
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
                    },
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
            },
            transfer: {
                type: Boolean,
                default: false
            },
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
                };
                return style;
            },
            styles2 () {
                let style = {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                    opacity: 0.2
                };
                return style;
            },
            showClass () {
                let showClass = 'white';
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
                        this.$emit('input', _this.state);
                    } else {
                        _this.state = type
                        this.$emit('on-change', type)
                        this.$emit('input', _this.state);
                    }
                }
            },
            onClick () {
                this.$emit('on-click');
            },
            // 事件
            handleSelectState (value) {
                for (let state of this.states) {
                    if (state.value === value) {
                        this.stateIcon = state.color;
                        break;
                    }
                }
                this.$emit('input', this.state);
            }
        }
    }
</script>
<style lang="less">
</style>
