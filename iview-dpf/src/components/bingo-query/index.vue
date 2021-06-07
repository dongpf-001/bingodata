<template>
    <div class="query-box-wrapper">
        <div class="query-box query-box-form" :type="type">
            <Form class="query" :model="data" ref="form"  :rules="rules" :label-width="labelW" :label-position="labelPosition" @submit.native.prevent="handleSubmit">
                <Grid v-if="type == 'float'" :col="col" :border="false" justify="end" padding="2px">
                    <div class="query-wrapper">
                        <slot></slot>
                        <span v-if="!collapse" ref="more">
                            <!--<slot name="collapse" ref="collapse"></slot>-->
                        </span>
                    </div>
                    <div class="query-form">
                        <a v-font="14" class="ivu-mr-8" @click="collapseClick" v-if="node.length>0">
                            <template v-if="collapse">
                                <Icon type="ios-arrow-down" />
                            </template>
                            <template v-else>
                                <Icon type="ios-arrow-up" />
                            </template>
                        </a>
                        <Button type="primary" html-type="submit">{{$t('page.common.search')}}</Button>
                        <Button class="ivu-ml-8" @click="handleReset">{{$t('page.common.reset')}}</Button>
                       </div>
                </Grid>
                <Grid v-if="type != 'float'" :col="col" :border="false" justify="end" padding="2px">
                    <div class="query-wrapper">
                        <slot></slot>
                        <bingo-modal-form ref="modal" :col="col" :title="$t('page.common.search')" :width="width" :button="false"
                                          :labelWidth="labelWidth" :showDefault="false">
                            <slot></slot>
                            <div slot="footer-button">
                                <Button type="primary" html-type="submit" @click="handleSubmit">{{$t('page.common.search')}}</Button>
                                <Button class="ivu-ml-8" @click="handleReset">{{$t('page.common.reset')}}</Button>
                                <a v-font="14" class="ivu-ml-8" @click="close">
                                    <template>
                                        <Icon type="ios-arrow-up" />
                                    </template>
                                </a>
                            </div>
                        </bingo-modal-form>
                    </div>
                    <div class="query-form">
                        <a v-font="14" class="ivu-mr-8" @click="open"  v-if="node.length>0">
                            <template>
                                <Icon type="ios-arrow-down" />
                            </template>
                        </a>
                        <Button type="primary" html-type="submit" >{{$t('page.common.search')}}</Button>
                        <Button class="ivu-ml-8" @click="handleReset">{{$t('page.common.reset')}}</Button>
                    </div>
                </Grid>
            </Form>
            <div style="display: none" ref="cache"></div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import bingoModalForm  from './modal-form';
    export default {
        name: 'query-right',
        props: {
            type: String,
            col: {
                type: Number,
                default: 4
            },
            width: {
                type: Number,
                default: 1300
            },
            labelWidth: {
                type: Number,
                default: 90
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 开启后，链接颜色为默认的蓝色， 默认关闭为继承效果
            linkColor: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object
            }
        },
        data () {
            return {
                grid: {
                    xl: 8,
                    lg: 8,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                collapse: false,
                rules: {
                },
                node:[]
            };
        },
        computed: {
            labelW () {
                return this.labelWidth;
            },
            labelPosition () {
                return 'right';
            }
        },
        components: {
            bingoModalForm
        },
        methods: {
            getParams(){
                let params={};
                for(let d in this.data){
                    if(this.data[d]&&this.data[d]!=''){
                        params=Object.assign(params, {[d]:this.data[d]});
                    }
                }
                return params;
            },
            handleSubmit () {
                this.$emit('on-submit', this.getParams());
                if(this.type != 'float') this.$refs.modal.show = false;

            },
            handleReset () {
                this.$refs.form.resetFields();
                for(let item in this.$refs.form.model){
                    if(typeof this.$refs.form.model[item]=='object'){
                        this.$refs.form.model[item]=[];
                    }else {
                        this.$refs.form.model[item]='';
                    }
                }
                this.$emit('on-reset');
                if(this.type != 'float') this.$refs.modal.show = false;
            },
            open () {
                this.$refs.modal.show = true;

            },
            close () {
                this.$refs.modal.show = false;
            },
            collapseClick () {
                this.collapse = !this.collapse;
                this.$nextTick(() => {
                    this.node.forEach((item, index) => {
                        if(this.$refs.more){
                            this.$refs.more.appendChild(item.elm);
                        }
                    });
                });
            },

        },
        mounted () {
            if(this.$slots.default.length>this.col){
                this.collapse=true;
                for(let index in this.$slots.default){
                    if((parseInt(index)+1)>this.col){
                        this.node.push(this.$slots.default[parseInt(index)]);
                        this.$refs.cache.appendChild(this.$slots.default[parseInt(index)].elm);
                    }
                }
            }
        }
    };
</script>
