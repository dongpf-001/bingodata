<template>
        <bingo-select type="selectTree" v-model="model" :data="selectTreeData"
                      :show-checkbox="showCheckbox" :load-data="loadData"
                      @on-change="onChangeTree" @on-open-change="onOpenChange"></bingo-select>
</template>
<script>
// import * as Api from '@/api/bmsa/demo'
import bingoSelect from '@/components/bingo-select'
export default {
  name: 'bing-select',
  data () {
    return {
      model: this.value,
      selectTreeData: [],
      nextValue: 0
    }
  },
  components: {
    // Api,
    bingoSelect
  },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default () {
        return ''
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getOragnization()
  },
  methods: {
    onChangeTree (value) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    },
    onOpenChange (value) {
      this.$emit('on-open-change', value)
    },
    loadData (item, callback) {
      let value = item.value
      this.getOragnization(item, value)
    },
    getOragnization (item, value) {
      this.setItem = item
      // Api.getOragnizationData({ parentId: value }).then(res => {
      //   if (res.success) {
      //     if (this.nextValue === 0) {
      //       res.data.forEach((item) => {
      //         this.selectTreeData.push({
      //           title: item.description,
      //           value: item.orgId,
      //           expand: false,
      //           loading: false,
      //           selected: false,
      //           checked: false,
      //           children: []
      //         })
      //       })
      //       this.nextValue = 1
      //     } else {
      //       if (res.data.length > 0) {
      //         res.data.forEach((item) => {
      //           this.setItem.children.push({
      //             title: item.description,
      //             value: item.orgId,
      //             expand: false,
      //             loading: false,
      //             selected: false,
      //             checked: false,
      //             children: []
      //           })
      //         })
      //         this.setItem.expand = true
      //         this.setItem.loading = false
      //       } else {
      //         this.setItem.loading = false
      //         delete this.setItem.loading
      //       }
      //     }
      //   }
      // })
    }
  }
}
</script>
<style lang="less">
</style>
