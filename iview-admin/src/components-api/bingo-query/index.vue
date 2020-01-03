<template>
    <div style="height: 64px;position: relative">
        <div class="query-box query-box-form" :type="type">
            <Form class="query" :model="data" ref="form"  :rules="rules" :label-width="labelW" :label-position="labelPosition"
                  style="margin-top: 0px;" >
                <Grid v-if="type == 'float'" :col="col" :border="false" justify="end" padding="5px">
                    <div class="query-wrapper">
                        <slot></slot>
                        <span v-if="!collapse" ref="more">
                            <!--<slot name="collapse" ref="collapse"></slot>-->
                        </span>
                    </div>
                    <FormItem class="query-form">
                        <a style="font-size: 14px" class="ivu-mr-8" @click="collapseClick" v-if="node.length>0">
                            <template v-if="collapse">
                                <Icon type="ios-arrow-down" />
                            </template>
                            <template v-else>
                                <Icon type="ios-arrow-up" />
                            </template>
                        </a>
                        <Button type="primary" @click="handleSubmit">查询</Button>
                        <Button class="ivu-ml-8" @click="handleReset">重置</Button>
                    </FormItem>
                </Grid>
                <Grid v-if="type != 'float'" :col="col" :border="false" justify="end" padding="5px">
                    <div class="query-wrapper">
                        <slot></slot>
                        <bingo-modal-form ref="modal" :col="col" :title="$t('page.common.search')" :width="width" :button="false"
                                          :labelWidth="labelWidth" :showDefault="false">
                            <slot></slot>
                            <div slot="footer-button">
                                <Button type="primary" @click="handleSubmit">{{$t('page.common.search')}}</Button>
                                <Button class="ivu-ml-8" @click="handleReset">{{$t('page.common.reset')}}</Button>
                                <a style="font-size: 14px" class="ivu-ml-8" @click="close">
                                    <template>
                                        <Icon type="ios-arrow-up" />
                                    </template>
                                </a>
                            </div>
                        </bingo-modal-form>
                    </div>
                    <FormItem class="query-form">
                        <a style="font-size: 14px" class="ivu-mr-8" @click="open"  v-if="node.length>0">
                            <template>
                                <Icon type="ios-arrow-down" />
                            </template>
                        </a>
                        <Button type="primary" @click="handleSubmit">{{$t('page.common.search')}}</Button>
                        <Button class="ivu-ml-8" @click="handleReset">{{$t('page.common.reset')}}</Button>
                    </FormItem>
                </Grid>
            </Form>
            <div style="display: none" ref="cache"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import bingoModalForm from '@/components-api/bingo-modal-form'
import Grid from '@/components-api/iview-pro/components/grid'
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
      node: []
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'isMobile'
    ]),
    labelW () {
      return this.isMobile ? undefined : this.labelWidth
    },
    labelPosition () {
      return this.isMobile ? 'top' : 'right'
    }
  },
  components: {
    bingoModalForm, Grid
  },
  methods: {
    getParams () {
      let params = {}
      for (let d in this.data) {
        if (this.data[d] && this.data[d] != '') {
          params = Object.assign(params, { [d]: this.data[d] })
        }
      }
      return params
    },
    handleSubmit () {
      this.$emit('on-submit', this.getParams())
      if (this.type != 'float') this.$refs.modal.show = false
    },
    handleReset () {
      this.$refs.form.resetFields()
      this.$emit('on-reset')
      if (this.type != 'float') this.$refs.modal.show = false
    },
    open () {
      this.$refs.modal.show = true
    },
    close () {
      this.$refs.modal.show = false
    },
    collapseClick () {
      this.collapse = !this.collapse
      this.$nextTick(() => {
        this.node.forEach((item, index) => {
          if (this.$refs.more) {
            this.$refs.more.appendChild(item.elm)
          }
        })
      })
    }

  },
  mounted () {
    if (this.$slots.default.length > this.col) {
      this.collapse = true
      for (let index in this.$slots.default) {
        if ((parseInt(index) + 1) > this.col) {
          this.node.push(this.$slots.default[parseInt(index)])
          this.$refs.cache.appendChild(this.$slots.default[parseInt(index)].elm)
        }
      }
    }
  }
}
</script>
<style >
    .query  .ivu-form-item{
        margin-bottom: 5px;
    }
    .query-wrapper {
        position: relative;
        padding: 0 180px 8px 8px;
    }
    .query-form {
        position: absolute;
        top: 5px;
        right: 0;
    }
    .query-box-form {
        position: absolute;
        top: 0px;
        width: 100%;
        z-index: 2;
    }
</style>
