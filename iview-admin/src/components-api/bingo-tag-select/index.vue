<template>
    <TagSelect v-bind="$attrs" v-on="$listeners">
        <TagSelectOption v-for="(item, key) in data" :name="item.id" :key="key">{{item.name}}</TagSelectOption>
    </TagSelect>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style>

</style>
