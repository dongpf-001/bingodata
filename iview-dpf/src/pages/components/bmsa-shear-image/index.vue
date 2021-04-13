<template>
    <div class="content-inner">
       <bmsa-shear-image :src="exampleImageSrc"
                         crop-button-text="确认提交"
                         @on-crop="handleCroped">
       </bmsa-shear-image>
    </div>
</template>
<script>
    import bmsaShearImage from '@/components/bmsa-shear-image'
    export default {
        name: 'demo-shear-image',
        components: {
            bmsaShearImage
        },
        data () {
            return {
            }
        },
        computed: {},
        created () {},
        mounted () {},
        methods: {
            handleCroped (blob) {
                let self = this
                const formData = new FormData()
                formData.append('croppedImg', blob)
                setTimeout(() => {
                    self.$Message.success('Upload success~')
                }, 1000)
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
