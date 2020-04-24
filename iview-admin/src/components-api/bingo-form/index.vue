<template>
    <Form ref="form" class="form" :rules="rules" :model="data" :label-width="labelW" :label-position="labelPosition"
          style="margin-top: 0px;">
        <Grid :col="col" :border="false" justify="end" padding="5px">
            <slot></slot>
            <GridItem v-if="button" style="width: 100%;text-align: right;" >
                <FormItem>
                    <slot name="button">
                        <Button type="primary" @click="handleOne" :loading="loading">{{buttonOneText}}</Button>
                        <Button class="ivu-ml-8" @click="handleTwo" v-if="buttonTwo" :loading="loading">
                            {{buttonTwoText}}
                        </Button>
                    </slot>
                </FormItem>
            </GridItem>
        </Grid>
    </Form>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'query-form',
  props: {
    button: {
      type: Boolean,
      default: true
    },
    buttonTwo: {
      type: Boolean,
      default: false
    },
    buttonTwoText: {
      type: String,
      default: '提交'
    },
    buttonOneText: {
      type: String,
      default: '保存'
    },
    col: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'form'
    },
    labelWidth: {
      type: Number
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
    rules: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      collapse: false
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
  methods: {
    handleOne () {
      this.$refs.form.validate((valid) => {
        this.loading = true
        if (valid) {
          let _this = this
          this.$emit('on-button-one', function () {
            _this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    },
    handleTwo () {
      this.$refs.form.validate((valid) => {
        this.loading = true
        if (valid) {
          let _this = this
          this.$emit('on-button-two', function () {
            _this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  },
  mounted () {
    console.log(this.$slots.collapse)
  }
}
</script>
<style>
    .form .ivu-form-item {
        margin-bottom: 10px;
    }
</style>
