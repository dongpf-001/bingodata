<template>
    <div class="bmsa-shear-image-wrapper">
        <div class="img-box">
            <img class="bmsa-shear-image-image" :id="imgId" alt="">
        </div>
        <div class="right-con">
            <div v-if="preview" class="preview-box" :id="previewId"></div>
            <div class="button-box">
                <slot>
                    <Upload action="image/upload" :before-upload="beforeUpload">
                        <Button style="width: 150px;" type="primary">上传图片</Button>
                    </Upload>
                </slot>
                <div v-show="insideSrc">
                    <Button type="primary" @click="shrink">
                        <Icon type="md-remove" :size="18"/>
                    </Button>
                    <Button type="primary" @click="move(0, -moveStep)">
                        <Icon type="md-arrow-round-up" :size="18"/>
                    </Button>
                    <Button type="primary" @click="magnify">
                        <Icon type="md-add" :size="18"/>
                    </Button>
                    <Button type="primary" @click="move(-moveStep, 0)">
                        <Icon type="md-arrow-round-back" :size="18"/>
                    </Button>
                    
                    <Button type="primary" @click="rotate">
                        <Icon type="md-refresh" :size="18"/>
                    </Button>
                    <Button type="primary" @click="move(moveStep, 0)">
                        <Icon type="md-arrow-round-forward" :size="18"/>
                    </Button>
                    <Button type="primary" @click="scale('Y')">
                        <Icon type="ios-pause" :size="18"/>
                    </Button>
                    <Button type="primary" @click="move(0, moveStep)">
                        <Icon type="md-arrow-round-down" :size="18"/>
                    </Button>
                    <Button type="primary" @click="scale('X')">
                        <Icon type="ios-menu" :size="18"/>
                    </Button>
                    <Button style="width: 150px;margin-top: 10px;" type="primary" @click="crop">{{ cropButtonText }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs'
    import 'cropperjs/dist/cropper.min.css'
    export default {
        name: 'bmsa-shear-image',
        props: {
            src: { // 上传url
                type: String,
                default: ''
            },
            preview: { // 是否显示裁剪区域
                type: Boolean,
                default: true
            },
            moveStep: { // 移动间距
                type: Number,
                default: 4
            },
            cropButtonText: { // 提交按钮名称
                type: String,
                default: '裁剪'
            },
            angle: { // 旋转角度
                type: Number,
                default: 90
            },
            zoom: { // 放大缩小比例
                type: Number,
                default: 0.1
            }
        },
        data () {
            return {
                cropper: null, // cropper实体
                insideSrc: ''
            }
        },
        computed: {
            // 裁剪区域生成id
            imgId () {
                return `cropper${this._uid}`
            },
            // 显示区域生成id
            previewId () {
                return `cropper_preview${this._uid}`
            }
        },
        watch: {
            // 监听上传地址
            src (src) {
                this.replace(src)
            },
            // 监听重新上传图片
            insideSrc (src) {
                this.replace(src)
            }
        },
        methods: {
            // 上传前的操作，终止上传，自定义上传
            beforeUpload (file) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (event) => {
                    this.insideSrc = event.srcElement.result
                }
                return false
            },
            // 重新上传图片后获取新的地址
            replace (src) {
                this.cropper.replace(src)
                this.insideSrc = src
            },
            // 旋转
            rotate () {
                this.cropper.rotate(this.angle)
            },
            // 缩小
            shrink () {
                this.cropper.zoom(-this.zoom)
            },
            // 放大
            magnify () {
                this.cropper.zoom(this.zoom)
            },
            // 水平或垂直调转
            scale (d) {
                this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
            },
            // 移动
            move (...argu) {
                this.cropper.move(...argu)
            },
            // 确认裁剪
            crop () {
                this.cropper.getCroppedCanvas().toBlob(blob => {
                    this.$emit('on-crop', blob)
                })
            }
        },
        mounted () {
            // 页面渲染完后初始化裁剪实例
            this.$nextTick(() => {
                let dom = document.getElementById(this.imgId)
                this.cropper = new Cropper(dom, {
                    preview: `#${this.previewId}`,
                    checkCrossOrigin: true
                })
            })
        }
    }
</script>
<style lang="less" scoped>
    .bg{
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")
    }
    .bmsa-shear-image-wrapper{
        width: 600px;
        height: 340px;
        .img-box{
            height: 340px;
            width: 430px;
            border: 1px solid #ebebeb;
            display: inline-block;
            .bg;
            img{
                max-width: 100%;
                display: block;
            }
        }
        .right-con{
            display: inline-block;
            width: 170px;
            vertical-align: top;
            box-sizing: border-box;
            padding: 0 10px;
            .preview-box{
                height: 150px !important;
                width: 100% !important;
                overflow: hidden;
                border: 1px solid #ebebeb;
                .bg;
            }
            .button-box{
                padding: 10px 0 0;
            }
        }
    }
</style>
