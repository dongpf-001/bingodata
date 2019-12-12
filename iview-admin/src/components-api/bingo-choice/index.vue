<template>
    <div :types="types">
        <RadioGroup v-model="radioModel" :vertical="vertical" :type="type"
                    :size="size" @on-change="changeClick" v-if="types=='radio'">
            <Radio v-for="(item, key) in datas" :key="key" :label="item.label" :disabled="item.disabled"
                   :border="item.border">
                <span>{{item.value}}</span>
            </Radio>
        </RadioGroup>
        <CheckboxGroup v-model="checkboxModel" :type="type"
                       :size="size" @on-change="changeClick" v-else-if="types!='radio'">
            <Checkbox v-for="(item, key) in datas" :key="key" :label="item.label" :disabled="item.disabled"
                      :border="item.border">
                <span>{{item.value}}</span>
            </Checkbox>
        </CheckboxGroup>
    </div>
</template>
<script>
export default {
  name: 'bing-choice',
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
    vertical: {
      type: Boolean,
      default: false
    },
    labelInValue: {
      type: Boolean,
      default: true
    },
    type: String,
    types: String,
    size: String,
    datas: Array
  },
  computed: {
    radioModel: {
      get: function () {
        if (this.labelInValue) {
          if (typeof this.value == 'object') {
            return this.value.label
          } else {
            return this.value
          }
        }
        return this.value
      },
      set: function (value) {
        this.$emit('input', value);
      },
    },
    checkboxModel: {
      get: function () {
        if (this.labelInValue) {
          debugger
          if (this.value.length > 0 && typeof this.value[0] == 'object') {
            let valueArr = []
            this.value.forEach((item) => {
              valueArr.push(item.label)
            })
            return valueArr
          } else {
            return this.value
          }
        }
        return this.value
      },
      set: function (value) {
        this.$emit('input', value);
      },
    }
  },
  methods: {
    changeClick (msg) {
      if (this.types === 'radio') {
        this.datas.forEach((item) => {
          if (item.label === msg) {
            let returnModel = {
              label: item.label,
              value: item.value
            }
            if (this.labelInValue) {
              this.$emit('input', returnModel);
              this.$emit('on-change', returnModel);
            } else {
              this.$emit('input', msg);
              this.$emit('on-change', msg);
            }
          }
        })
      } else {
        let returnModel = []
        for (let i = 0; i < this.datas.length; i++) {
          for (let j = 0; j < msg.length; j++) {
            if (msg[j] === this.datas[i].label) {
              returnModel.push({
                label: this.datas[i].label,
                value: this.datas[i].value
              })
            }
          }
        }
        if (this.labelInValue) {
          this.$emit('input', returnModel);
          this.$emit('on-change', returnModel);
        } else {
          this.$emit('input', msg);
          this.$emit('on-change', msg);
        }
      }
    }
  }
}
</script>
<style lang="less">
</style>
