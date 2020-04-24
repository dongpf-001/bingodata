<template>
  <Card class="form-demo-wrapper" dis-hover>
    <bingo-form ref="formDemo" :col="query.col" :rules="rules" :data="modalData"
                :button="false" :labelWidth="120">
      <GridItem>
        111
      </GridItem>
    </bingo-form>
  </Card>
</template>

<script>
import bingoForm from '@/components-api/bingo-form'
import bingoFormItem from '@/components-api/bingo-form-item'
import Grid from '@/components-api/iview-pro/components/grid/grid.vue'
import GridItem from '@/components-api/iview-pro/components/grid/grid-item.vue'
export default {
  name: 'form-demo',
  components: {
    bingoForm, bingoFormItem, Grid, GridItem
  },
  data () {
    return {
      query: {
        col: 3,
        labelWidth: 90
      },
      modalData: {
        dictName: ''
      },
      rules: {}
    }
  }
}
</script>

<style lang="less">
  .form-demo-wrapper {
    height: 100%;
  }
</style>
