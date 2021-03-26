<template>
   <span class="drop-grid">
         <slot></slot>
         <Dropdown v-if="!ag&&$slots.list" trigger="click" :placement="placement" :transfer="transfer"
                   @on-visible-change="visibleChange" style="position: absolute;">
            <a>
                <Icon type="md-arrow-dropdown"></Icon>
            </a>
            <DropdownMenu slot="list" class="drop-grid-menu">
                 <slot name="list"></slot>
            </DropdownMenu>
        </Dropdown>
       <Dropdown v-if="ag&&$slots.list" trigger="click" :placement="placement" :transfer="transfer"
                 @on-visible-change="visibleChange" style="position: fixed;">
            <a>
                <Icon type="md-arrow-dropdown"></Icon>
            </a>
            <DropdownMenu slot="list" class="drop-grid-menu">
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
            },
            placement: {
                type: String,
                default: 'bottom-end'
            },
            transfer: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            visibleChange(flag) {
                if (flag) {
                    if (this.$parent.$parent.$parent.$parent.$el.getBoundingClientRect().bottom - this.$el.parentNode.parentNode.getBoundingClientRect().y < 150) {
                        this.placement = 'top-end'
                    } else {
                        this.placement = 'bottom-end'
                    }
                    this.$el.parentNode.parentNode.style.zIndex = 111150
                } else {
                    this.$el.parentNode.parentNode.style.zIndex = 1
                }
                // this.$el.getBoundingClientRect()
            }
        }
    }
</script>
<style lang="less">
    .drop-grid {
        > .ivu-dropdown {
            position: absolute;
        }
        .ivu-select-dropdown {
            top: 18px;
            left: auto !important;
            right: -10px !important;
        }
    }
    
    .drop-grid-menu .ivu-dropdown-item {
        padding: 0 !important;
    }
    
    .drop-grid-menu .ivu-dropdown-item span {
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: left;
        margin-left: 10px;
        cursor: pointer;
    }
    
    .drop-grid .ivu-dropdown-item {
        border-bottom: 1px solid #dcdee2;
        padding: 0 !important;
    }
    
    .drop-grid .ivu-dropdown-item:last-child {
        border-bottom: 0 solid #dcdee2;
    }
    
    .drop-grid .ivu-icon {
        margin-right: 2px;
    }
</style>
