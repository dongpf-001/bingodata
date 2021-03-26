<template>
    <div class="ivu-inline upload-wrapper">
        <div v-if="types=='picture'" style="float: left">
            <div class="bingo-upload-list" v-for="item in uploadList"
                 :style="'width:'+pictureSize+'px;height:'+pictureSize+'px'">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="bingo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
        </div>
        <Modal title="View Image" v-model="visible">
            <img :src="'https://dev-file.iviewui.com/'+imgName+'/avatar'" v-if="visible" style="width: 100%">
        </Modal>
        <Upload
                ref="upload"
                v-if="!(types=='modal')"
                class="ivu-inline"
                :class="[types=='picture' ? 'upload-picture' : '']"
                :style="pictureStyles"
                :action="action"
                :headers="headers"
                :multiple="multiple"
                :paste="paste"
                :disabled="disabled"
                :data="data"
                :name="name"
                :with-credentials="withCredentials"
                :show-upload-list="showUploadList"
                :type="(types == 'dragDrop' || types == 'picture') ? 'drag' : 'select'"
                :types="types"
                :accept="accept"
                :format="format"
                :max-size="maxSize"
                :before-upload="beforeUpload"
                :on-progress="handleProgress"
                :on-success="onSuccess"
                :on-error="onError"
                :on-preview="onPreview"
                :on-remove="onRemove"
                :on-format-error="onFormatError"
                :on-exceeded-size="onExceededSize"
                :default-file-list="defaultFileList"
        >
            <!--单选/多选附件上传-->
            <div style="position: relative">
                <Button ref="uploadButton" v-if="types=='button'" type='primary' :icon="icon">{{btnName}}</Button>
                <div v-if="!(widths==100) && !multiple && types=='button'" class="progress-flot" ref="progress"
                     :style="'width:' + widths + '%'">
                    <!--                    <span v-if="count>0" style="color: black">{{count}}%</span>-->
                    <Icon v-if="count==100" type="ios-checkmark-circle" style="color: #19be6b"/>
                </div>
                <!--拖拽-->
                <div style="padding: 20px 0" v-if="types=='dragDrop'">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖动文件到这里上传</p>
                </div>
                <!--上传图片-->
                <div :class="disabled ? 'upload-picture' : ''"
                     :style="'width:'+pictureSize+'px;height:'+pictureSize+'px;line-height:'+pictureSize+'px'"
                     v-if="types=='picture'">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </div>
        </Upload>
        <div v-if="types=='modal'">
            <Button ref="uploadButton" type='primary' :icon="icon" @click="open">{{btnName}}</Button>
            <bingo-modal ref="modal"
                         class="modal-wrapper"
                         :title="modalModel.title"
                         :closable="modalModel.closable"
                         :maskClosable="modalModel.maskClosable"
                         :fullscreen="modalModel.fullscreen"
                         :draggable="modalModel.draggable"
                         footer-hide>
                <Upload ref="upload" :action="action" :headers="headers" :multiple="multiple" :data="data" :name="name"
                        :with-credentials="withCredentials" :show-upload-list="showUploadList"
                        :accept="accept" :format="format" :max-size="maxSize" :before-upload="beforeUpload"
                        :on-progress="handleProgress"
                        :on-success="onSuccess" :on-error="onError" :on-preview="onPreview" :on-remove="onRemove"
                        :on-format-error="onFormatError" :on-exceeded-size="onExceededSize"
                        :default-file-list="defaultFileList">
                    <Button type='primary' icon="ios-cloud-upload-outline">附件</Button>
                </Upload>
            </bingo-modal>
        </div>
    </div>
</template>
<script>
    import * as Api from '@/api/bmsa/demo'
    import bingoModal from '@/components-api/bingo-modal'
    import util from '@/libs/util'

    const uuid = require('uuid')
    export default {
        name: 'bingo-upload',
        data() {
            return {
                fileList: [],
                timer: '',
                uploadList: [],
                imgName: '',
                buttonWidth: 0,
                visible: false,
                modalModel: {
                    show: true,
                    title: '上传附件',
                    closable: true,
                    maskClosable: true,
                    draggable: false
                },
                widths: 0,
                count: 0,
                modalShowFlag: false
            }
        },
        props: {
            action: {
                type: String,
                required: true
            },
            headers: {
                type: Object,
                default() {
                    return {
                        Authorization: util.cookies.get('token')
                    }
                }
            },
            btnName: {
                type: String,
                default: '上传'
            },
            icon: {
                type: String,
                default: 'ios-cloud-upload-outline'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            paste: {
                type: Boolean,
                default: false
            },
            data: { // 上传默认带的参数
                type: Object,
                default() {
                    return {}
                }
            },
            name: {
                type: String,
                default: 'file'
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
            showUploadList: {
                type: Boolean,
                default: false
            },
            isImport: { // 判断是否是导入
                type: Boolean,
                default: false
            },
            types: {
                type: String
            },
            accept: {
                type: String
            },
            format: {
                type: Array,
                default() {
                    return []
                }
            },
            pictureSize: {
                type: Number,
                default: 58
            },
            maxSize: {
                type: Number
            },
            beforeUpload: Function,
            onProgress: {
                type: Function,
                default() {
                    return {}
                }
            },
            onRemove: {
                type: Function,
                default() {
                    return {}
                }
            },
            onPreview: {
                type: Function,
                default() {
                    return {}
                }
            },
            onExceededSize: {
                type: Function,
                default() {
                    return {}
                }
            },
            onFormatError: {
                type: Function,
                default() {
                    return {}
                }
            },
            onSuccess: {
                type: Function,
                default() {
                    return {}
                }
            },
            onError: {
                type: Function,
                default() {
                    return {}
                }
            },
            defaultFileList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            styles() {
                let style = {}
                if (!(this.types === 'picture' || this.types === 'dragDrop' || this.types === 'modal')) {
                    style = {
                        width: `${this.buttonWidth}px`
                    }
                }
                return style
            },
            pictureStyles() { // 控制上传图片大小的
                let style = {}
                if (this.types === 'picture') {
                    style = {
                        display: 'inline-block',
                        width: `${this.pictureSize}px`
                    }
                }
                return style
            }
        },
        components: {
            bingoModal
        },
        created() {
            this.$nextTick(() => {
                this.buttonWidth = document.querySelector('.ivu-upload-select').offsetWidth
            })
            if (this.data) {
                this.data.progressKey = uuid.v1()
            }
        },
        mounted() {
            if (this.$refs.upload) {
                this.uploadList = this.$refs.upload.fileList
            }
        },
        watch: {
            widths: {
                deep: true,
                handler: function (value) {
                    if (value == 100) { // 终止获取进度条
                        clearInterval(this.timer)
                        this.widths = 0
                        console.log('终止查询')
                    }
                }
            },
            data: {
                deep: true,
                handler: function (value) {
                    if (value) {
                        value.progressKey = uuid.v1()
                    }
                }
            }
        },
        methods: {
            handleView(name) {
                this.imgName = name
                this.visible = true
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
            },
            handleProgress(event, file, fileList) {
                if (this.isImport) {
                    let _this = this
                    this.timer = setInterval(() => { // 从后台开始获取进度
                        Api.getProcessBykey(this.data).then(res => {
                            if (res.data.percent) {
                                this.widths = parseInt(res.data.percent.substring(0, res.data.percent.length - 1))
                            }
                            console.log(this.widths)
                            // if (this.widths == 100) {
                            //     clearInterval(_this.timer);
                            //     console.log('yes')
                            // }
                        })
                    }, 200)
                } else {
                    console.log('上传中', event) // 继承了原生函数的 event 事件
                    console.log('上传中 file', file) // 上传的文件
                    console.log('上传中 fileList', fileList) // 上传文件列表包含file
                    // uploadList 就是 原文档中的那个渲染的 uplist 是个数组，所以要把filelist 赋值给他
                    this.uploadList = fileList
                    // 调用监听 上传进度 的事件
                    event.target.onprogress = (event) => {
                        // 保留两位小数
                        let uploadProgcess = parseFloat(((event.loaded / event.total) * 100).toFixed(2))
                        // 手动设置显示上传进度条 以及上传百分比
                        this.widths = uploadProgcess
                        this.count = uploadProgcess
                    }
                }
            },
            open() {
                this.$refs.modal.show = true
            }
        }
    }
</script>
<style lang="less">
    .upload-wrapper {
        .progress-flot {
            opacity: 0.6;
            border-radius: 3px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #044570;
            height: 100%;
            width: 20px;
        }
        .upload-picture {
            display: inline-block;
            width: 58px;
        }
        /*上传图片样式*/
        .bingo-upload-list {
            display: inline-block;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            margin-right: 4px;
        }
        .bingo-upload-list img {
            width: 100%;
            height: 100%;
        }
        .bingo-upload-list-cover {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, .6);
        }
        .bingo-upload-list:hover .bingo-upload-list-cover {
            display: block;
        }
        .bingo-upload-list-cover i {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
        .ivu-upload {
            margin: 0 -2px 0 0;
            button {
                margin: 0;
            }
            .ivu-upload-list .ivu-upload-list-file {
                height: 60px;
                /*line-height: 40px;*/
            }
        }
        .upload-picture {
            background: #e3e5e8;
        }
    }
    
    .modal-wrapper {
        .ivu-upload-list .ivu-upload-list-file {
            height: 60px;
            /*line-height: 40px;*/
        }
    }
</style>
