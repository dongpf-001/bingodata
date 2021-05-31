<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <div class="department-outer">
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view
          v-if="data"
          :data="data"
          :isRender="isRender"
          :zoom-handled="zoomHandled"
          @on-menu-click="handleMenuClick"
        ></org-view>
      </div>
    </div>
  </Card>
</template>

<script>
    import OrgView from './org-view.vue'
    import ZoomController from './zoom-controller.vue'
    import './index.less'
    const menuDic = {
        edit: '编辑部门',
        detail: '查看部门',
        new: '新增子部门',
        delete: '删除部门'
    }
    export default {
        name: 'org_tree_page',
        components: {
            OrgView,
            ZoomController
        },
        data () {
            return {
                zoom: 100
            }
        },
        props: {
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isRender: { // 是否自定义render
                type: Boolean,
                default: true
            }
        },
        computed: {
            zoomHandled () {
                return this.zoom / 100
            }
        },
        methods: {
            handleMenuClick ({ data, key }) {
                this.$Message.success({
                    duration: 5,
                    content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
                })
            },
        },
        mounted () {
        }
    }
</script>

<style>
</style>
