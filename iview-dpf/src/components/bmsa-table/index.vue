<template>
    <div class="bmsa-table-wrapper">
        <!--toolbar区域-->
        <vxe-toolbar class-name="bmsa-table-toolbar">
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
        <!--普通表格区域-->
        <vxe-table ref="vxeTable"
                   class="bmsa-table"
                   v-bind="$attrs"
                   v-on="$listeners"
                   auto-resize>
            <slot></slot>
        </vxe-table>
        <!--分页-->
        <vxe-pager
                border
                class-name="bmsa-table-page"
                size="medium"
                align="center"
                :loading="loading"
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
                loading: false, // 表格加载
                page: { // 表格分页
                    currentPage: 1, // 查询页数
                    pageSize: 10, // 查询数量
                    totalResult: 0, // 总数量
                }
            }
        },
        computed: {},
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
            // 开关方法，切换到卡片形式
            handleSwitch () {
                this.$emit('on-switch');
            },
            // 全屏方法
            handleFullScreen () {
            }
        },
        mounted () {},
    };
</script>
<style lang="less">
    .bmsa-table-wrapper {
        width: 100%;
        height: 100%;
    }
    .bmsa-table-toolbar { // toolbar
        height: 52px;
        .bmsa-table-btn { // toolbar按钮区域
            button {
                margin-right: 8px;
            }
        }
        .bmsa-table-tool { // toolbar工具栏区域
            i {
                font-size: 18px;
                margin: 0 8px 0 8px;
            }
        }
    }
    .bmsa-table-page { // 分页
        height: 44px;
    }

    /*滚动条整体部分*/
    .bmsa-table ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    /*滚动条的轨道*/
    .bmsa-table ::-webkit-scrollbar-track {
        background-color: #FFFFFF;
    }
    /*滚动条里面的小方块，能向上向下移动*/
    .bmsa-table ::-webkit-scrollbar-thumb {
        background-color: #bfbfbf;
        border-radius: 5px;
        border: 1px solid #F1F1F1;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    .bmsa-table ::-webkit-scrollbar-thumb:hover {
        background-color: #A8A8A8;
    }
    .bmsa-table ::-webkit-scrollbar-thumb:active {
        background-color: #787878;
    }
    /*边角，即两个滚动条的交汇处*/
    .bmsa-table ::-webkit-scrollbar-corner {
        background-color: #FFFFFF;
    }
</style>
