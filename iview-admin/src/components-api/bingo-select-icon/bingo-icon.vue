<template>
    <div>
        <span v-if="showValue.model=='icon'">
            <Icon :type="showValue.type" style="width: 30px;height: 30px;line-height: 30px;" size="18"/>
        </span>
        <span v-if="showValue.model=='icon-font'">
            <Icon :custom="showValue.type" style="width: 30px;height: 30px;line-height: 30px;" size="16"/>
        </span>
        <span v-if="showValue.model=='svg'">
            <span>
                <svg class="icon-svg-wrapper" aria-hidden="true">
                    <use :xlink:href="showValue.before"></use>
                </svg>
                <svg class="icon-svg-wrapper" aria-hidden="true">
                    <use :xlink:href="showValue.after"></use>
                </svg>
            </span>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'bing-select-icon',
        data() {
            return {}
        },
        props: {
            showValue: {
                type: Object,
                default() {
                    return {
                        model: 'icon',
                        type: '',
                        before: '',
                        after: ''
                    };
                }
            }
        },
        watch: {},
        created() {
        },
        methods: {}
    }
</script>
<style lang="less">
</style>
