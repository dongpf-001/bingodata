<template>
   <span class="drop-grid">
         <slot></slot>
         <Dropdown v-if="!ag&&$slots.list" trigger="click" placement="bottom-end" @on-visible-change="visibleChange" style="position: absolute;">
            <a href="javascript:void(0)" style="position: absolute">
                <Icon type="md-arrow-dropdown"></Icon>
            </a>
            <DropdownMenu slot="list">
                 <slot name="list"></slot>
            </DropdownMenu>
        </Dropdown>
       <Dropdown v-if="ag&&$slots.list" trigger="click" placement="bottom-end" @on-visible-change="visibleChange" style="position: fixed;">
            <a href="javascript:void(0)" >
                <Icon type="md-arrow-dropdown"></Icon>
            </a>
            <DropdownMenu slot="list">
                 <slot name="list"></slot>
            </DropdownMenu>
        </Dropdown>
   </span>
</template>
<script>
export default {
  name: 'action-drop',
  props: {
    ag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    visibleChange (flag) {
      if (flag) {
        this.$el.parentNode.parentNode.style.zIndex = 111150
      } else {
        this.$el.parentNode.parentNode.style.zIndex = 1
      }
      // this.$el.getBoundingClientRect()
    }
  }
}
</script>
<style>
    .drop-grid .ivu-dropdown-item span{
        display: inherit;
        margin: -12px -0px;
        height: 40px;
        line-height: 40px;
        text-align: left;
    }
</style>
