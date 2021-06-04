<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bmsa-shear-image :src="exampleImageSrc"
                                      crop-button-text="确认提交"
                                      @on-crop="handleCroped">
                    </bmsa-shear-image>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、必备src属性，代表上传地址</p>
                    <p style="margin-top: 12px">2、on-crop回调代表上传成功</p>
                </div>
            </Split>
        </Card>
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
                split1: 0.7,
                exampleImageSrc: ''
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
