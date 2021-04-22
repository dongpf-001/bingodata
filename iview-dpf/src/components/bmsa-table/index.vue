<template>
    <div class="bmsa-table-wrapper">
        <!--toolbar区域-->
        <vxe-toolbar>
            <template #buttons><!-- toolbar左侧 -->
                <div class="bmsa-table-btn">
                    <slot name="buttons"></slot>
                </div>
            </template>
            <template #tools><!-- toolbar右侧-->
                <div class="bmsa-table-tool">
                    <slot name="tools"></slot>
                </div>
            </template>
        </vxe-toolbar>
        <!--普通表格区域-->
        <vxe-table ref="vxeTable" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </vxe-table>
    </div>
</template>
<script>
    export default {
        name: 'bmsa-table',
        components: {},
        data () {
            return {
            }
        },
        computed: {},
        created () {},
        mounted () {},
        methods: {}
    };
</script>
<style lang="less">
    .bmsa-table-wrapper {
        width: 100%;
        height: 100%;
        .bmsa-table-btn { // toolbar按钮区域
            button {
                margin-right: 8px;
            }
        }
    }
</style>
