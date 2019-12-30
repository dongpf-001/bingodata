<template>
  <div>
    <!--下拉选择-->
    <Select v-model="model"
            v-if="type!='selectTree' && type!='selectAuto'"
            ref="select"
            v-bind="$attrs"
            @on-query-change="queryChange"
            :placeholder="placeholder"
            v-on="$listeners"
            :disabled="disabledSelect">
      <Option disabled value="" key="" style="color: white" v-if="showSelectAll && $attrs.multiple">
        {{query}}
        <Button size="small" style="float: right;margin-right: 6px" @click="cancelAll">取消</Button>
        <Button type ='primary' size="small" style="float: right;margin-right: 6px" @click="selectAll">全选</Button>
      </Option>
      <Option :value="item.value" v-for="item in data" :key="item.value" :disabled="item.disabledOption">{{item.label}}</Option>
    </Select>
    <!--下拉选择树-->
    <TreeSelect v-model="treeModel"
                v-if="type=='selectTree'"
                :data="data"
                :placeholder="placeholder"
                v-bind="$attrs"
                v-on="$listeners"/>
    <!--智能感知-->
    <AutoComplete
      v-model="autoModel"
      v-if="type=='selectAuto'"
      :data="data"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="$listeners">
      <slot></slot>
    </AutoComplete>
  </div>
</template>
<script>
export default {
  name: 'bing-select',
  data () {
    return {
      label: '',
      query: ''
    }
  },
  props: {
    data: Array,
    value: {
      type: [String, Number, Array, Object],
      default () {
        return ''
      }
    },
    type: {
      type: String,
      default: ''
    },
    disabledSelect: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    showSelectAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    treeModel: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    autoModel: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleCreate (val) {
      this.datas.push({
        value: val,
        label: val
      })
    },
    onChange (value) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    },
    onChangeTree (value) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    },
    onQueryChange (value) {
      this.$emit('on-query-change', value)
    },
    onClear (value) {
      this.$emit('on-clear', value)
    },
    onOpenChange (value) {
      this.$emit('on-open-change', value)
    },
    showTag (num) {
      let returnValue = ''
      if (this.maxTagPlaceholder) {
        returnValue = this.maxTagPlaceholder + ' ' + num
      } else {
        returnValue = '+ ' + num + '...'
      }
      return returnValue
    },
    // 智能感知
    onSearchAuto (value) {
      this.$emit('on-search', value)
    },
    onChangeAuto (value) {
      this.$emit('on-change', value)
    },
    onSelectAuto (value) {
      this.$emit('on-select', value)
    },
    onFocusAuto (value) {
      this.$emit('on-focus', value)
    },
    onBlurAuto (value) {
      this.$emit('on-blur', value)
    },
    onClearAuto (value) {
      this.$emit('on-clear', value)
    },
    selectAll () {
      let arr = []
      for (let i = 0; i < this.data.length; i++) {
        arr.push(this.data[i].value)
      }
      this.model = arr
    },
    cancelAll () {
      this.model = []
    },
    queryChange (query) {
      this.query = query
      this.$emit('on-query-change', query)
    }
  }
}
</script>
<style lang="less">
</style>
