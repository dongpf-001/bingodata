<template>
    <div class="bmsa-table-wrapper">
        <!--toolbar区域-->
        <vxe-toolbar class-name="bmsa-table-toolbar" v-if="showToolbar">
            <template #buttons><!-- toolbar左侧 -->
                <div class="bmsa-table-btn">
                    <slot name="buttons"></slot>
                </div>
            </template>
            <template #tools><!-- toolbar右侧-->
                <div class="bmsa-table-tool">
                    <Tooltip transfer :content="$t('page.common.export')">
                        <span @click="handleExport">
                            <i class="icon iconfont icondaochu"></i>
                        </span>
                    </Tooltip>
                    <Tooltip transfer :content="$t('page.common.import')">
                        <span @click="handleImport">
                            <i class="icon iconfont icondaoru"></i>
                        </span>
                    </Tooltip>
                    <Tooltip transfer :content="$t('page.common.print')">
                        <span @click="handlePrint">
                            <i class="icon iconfont icondayin"></i>
                        </span>
                    </Tooltip>
                    <Tooltip transfer :content="$t('page.common.refresh')">
                        <span @click="handleRefresh">
                            <i class="icon iconfont iconshuaxin"></i>
                        </span>
                    </Tooltip>
                    <Tooltip transfer content="开关">
                        <span @click="handleSwitch">
                            <i class="icon iconfont iconweibiaoti--"></i>
                        </span>
                    </Tooltip>
                    <Tooltip transfer :content="!isFullScreen?$t('page.common.fullScreen'):$t('page.common.reduction')">
                        <span @click="handleFullScreen">
                            <i :class="!isFullScreen?'icon iconfont iconzuidahua':'icon iconfont iconzuidahua-huanyuan'"></i>
                        </span>
                    </Tooltip>
                </div>
            </template>
        </vxe-toolbar>
        <!--表格区域-->
        <div :style="getTableHeight">
            <slot name="table"></slot>
        </div>
        <!--分页-->
        <vxe-pager
                border
                v-if="showPage"
                class-name="bmsa-table-page"
                size="medium"
                align="center"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :total="page.totalResult"
                :layouts="['Total', 'PrevPage', 'JumpNumber', 'NextPage', 'Sizes']"
                @page-change="handlePageChange">
        </vxe-pager>
    </div>
</template>
<script>
    export default {
        name: 'bmsa-table',
        components: {},
        data () {
            return {
                isFullScreen: false, // 全屏控制
                page: { // 表格分页
                    currentPage: 1, // 查询页数
                    pageSize: 10, // 查询数量
                    totalResult: 0, // 总数量
                }
            }
        },
        props: {
            showToolbar: { // 是否显示toolbar
                type: Boolean,
                default: true
            },
            showPage: { // 是否显示分页
                type: Boolean,
                default: true
            },
            height: { // 表格的高度
                type: String,
                default: 'auto'
            }
        },
        computed: {
            // 获取表格高度
            getTableHeight () {
                let html = ''
                if (this.showToolbar && this.showPage) { // 显示toolbar和page
                    html = 'height: calc(100% - 96px)'
                } else {
                    if (this.showToolbar) { // 只显示toolbar
                        html = 'height: calc(100% - 44px)'
                    } else if (this.showPage) { // 只显示page
                        html = 'height: calc(100% - 52px)'
                    }
                }
                return html
            }
        },
        created () {},
        methods: {
            // 导出方法
            handleExport () {
                this.$emit('on-export');
            },
            // 导入方法
            handleImport () {
                this.$emit('on-import');
            },
            // 打印方法
            handlePrint () {
                this.$emit('on-print');
            },
            // 刷新方法
            handleRefresh () {
                this.$emit('on-refresh');
            },
            // 开关方法，切换到卡片形式
            handleSwitch () {
                this.$emit('on-switch');
            },
            // 全屏方法
            handleFullScreen () {
            },
            // 分页方法
            handlePageChange () {
            }
        },
        mounted () {},
    };
</script>
<style lang="less">
</style>
