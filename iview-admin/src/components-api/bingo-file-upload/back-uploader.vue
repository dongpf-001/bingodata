<template>
    <div class="back-uploader" ref="backUploader" v-show="visible" id="backUploader">
        <div class="card-header">
            <p class="card-title"><span class="card-title-doing">{{title}}</span></p>
            <a class="icon maximize-creator" @click="toggleList">
                <Icon class="icon-control" :type="controlIconCls"/>
            </a>
            <a class="icon close-creator" @click="hide">
                <Icon type="md-close"/>
            </a>
        </div>
        <ul class="back-uploader-list" v-show="listFlag">
            <li class="back-uploader-item"
                v-for="item in tableData" :key="item.id">
                <div class="uploader-wrapper">
                    <div class="uploader-content">
                        <div class="file-item">
                            <header :ref="`fileIcon${item.id}`" class="file-item-icon">
                                <Icon type="md-attach" v-if="!item.imgSrc"/>
                                <img v-else :src="item.imgSrc" width="32" height="32">
                            </header>
                            <section class="file-item-content">
                                <p class="elastic-title">
                                    <Tooltip transfer placement="top" max-width="200"
                                             :content="item.name">
                                        <span> {{item.name}}</span>
                                    </Tooltip>
                                </p>
                                <div class="file-info">
                                    <span class="file-size">{{item.size}}</span>
                                </div>
                            </section>
                        </div>
                        <div class="progress-container" :ref="`progressContainer${item.documentId}`">
                            <div class="progress">
                                <div class="progress-bar" :ref="`progressBar${item.documentId}`"></div>
                            </div>
                        </div>
                    </div>
                    <div class="uploader-handlers">
                        <Icon class="icon-updating"
                              v-if="item.progress !== 1"
                              @click="deleteFile(item.id)"
                              type="md-close"/>
                        <Icon class="icon-updating"
                              v-else
                              type="md-checkmark"/>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    /* eslint-disable */
    import $ from './lib/jquery'
    import WebUploader from './lib/webuploader'
    import util from '@/libs/util';
    import Setting from '../../setting'

    const EVENT_FINISHED = 'finished'
    const token = util.cookies.get('token');
    export default {
        name: 'back-uploader',
        props: {
            // 服务配置
            serveOption: {
                type: Object,
                default: null
            },
            /*auth:{
                type: Object,
                default: [true, true, true, true, true]
            },*/
            // 文件类型
            accept: {
                type: String,
                default: ''
            },
            // 是否多选
            multiple: {
                type: Boolean,
                default: true
            },
            // 上传最大数量 默认为10
            fileNumLimit: {
                type: Number,
                default: 100
            },
            // 大小限制 默认200M
            fileSingleSizeLimit: {
                type: Number,
                default: 200
            },
            // 上传时传给后端的参数，一般为token，key等
            formData: {
                type: Object,
                default: null
            },
            // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
            keyGenerator: {
                type: Function,
                default(file) {
                    const currentTime = new Date().getTime()
                    return `${currentTime}.${file.name}`
                }
            },
            // 上传按钮ID
            uploadButton: {
                type: String,
                default: ''
            },
            // 新增上传按钮
            addUploadButton: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                token: token,
                visible: false,
                listFlag: true,
                tableData: [],
                state: 'pedding',
                allFilesUpdateFlag: false,
                oldUploadData: {}
            }
        },
        computed: {
            title() {
                return this.allFilesUpdateFlag ? '上传完成' : `正在上传 ${this.fileCount}/${this.tableData.length}`
            },
            controlIconCls() {
                return this.listFlag ? 'md-arrow-dropdown' : 'md-arrow-dropup'
            },
            $user() {
                return this.$store.state.admin.user.info.data
            }
        },
        watch: {
            serveOption: function (val, old) {
                console.log('serveOption==--==' + val)
            }
        },
        mounted() {
            this.oldUploadData = this.serveOption.getCurrentData
            this.register()
            this.init()
        },
        methods: {
            // 注册组件事件
            register() {
                WebUploader.Uploader.unRegister('custom')
                WebUploader.Uploader.register(
                        {
                            name: 'custom',
                            'before-send-file': 'beforeSendFile',
                            'before-send': 'beforeSend',
                            'after-send-file': 'afterSendFile'
                        },
                        {
                            beforeSendFile: this._beforeSendFileHook,
                            beforeSend: this._beforeSendHook,
                            afterSendFile: this._afterSendFileHook
                        }
                )
            },
            // 初始化
            init() {
                // 实例
                this.uploader = null
                this.fileCount = 0
                this.uploader = WebUploader.create({
                    // 选完文件后，是否自动上传
                    auto: true,
                    // swf文件路径
                    swf: './lib/Uploader.swf',
                    // 文件接收服务端
                    server: Setting.apiBaseURL + '/' + this.serveOption.uploadFileUrl,
                    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
                    //headers['Authorization']: token,
                    preserveHeaders: true,
                    prepareNextFile: true,
                    pick: {
                        id: this.uploadButton,
                        multiple: this.multiple,
                        innerHTML: '<i data-v-425b7c77="" class="icon ivu-icon ivu-icon-md-cloud-upload"></i>上传'
                    },
                    // 允许选择文件格式。
                    accept: this._getAccept(this.accept),
                    // 允许同时最大上传进程数
                    threads: 10,
                    // 限制上传个数
                    fileNumLimit: this.fileNumLimit,
                    // 限制单个上传图片的大小
                    fileSingleSizeLimit: this.fileSingleSizeLimit * 1024 * 1000,
                    // 上传所需参数
                    formData: this.formData,
                    // 分片上传
                    chunked: true,
                    // 分片大小, 默认大小为5M
                    chunkSize: 5242880,
                    // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
                    duplicate: true,
                    headers: {
                        'Authorization': util.cookies.get('token')
                    }
                })
                // 第二个按钮
                this.$nextTick(() => {
                    this.uploader.addButton({
                        id: '#filePickerBtn2',
                        multiple: this.multiple,
                        innerHTML: '<i data-v-425b7c77="" class="ivu-icon ivu-icon-ios-folder-outline" style="position: absolute;"></i>'
                    })
                })

                //当文件被加入队列之前触发
                this.uploader.on('beforeFileQueued', this.onBeforeFileQueued)

                // file 当文件被加入队列以后触发
                this.uploader.on('fileQueued', this.onFileQueued)

                // files 当一批文件添加进队列以后触发。
                this.uploader.on('filesQueued', this.onFilesQueueds)

                // 全部文件
                this.uploader.on('all', this.onAllFile)

                // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次
                this.uploader.on('uploadBeforeSend', this.onUploadBeforeSend)

                // 某个文件开始上传前触发，一个文件只会触发一次。
                this.uploader.on('uploadStart', this.onUploadStart)

                // 上传过程中触发，携带上传进度。。
                this.uploader.on('uploadProgress', this.onUploadProgress)

                // 上传成功时触发
                this.uploader.on('uploadSuccess', this.onSuccess)

                // 当validate不通过时，会以派送错误事件的形式通知调用者
                this.uploader.on('error', this.onError)

                // 不管成功或者失败，文件上传完成时触发
                this.uploader.on('uploadComplete', this.onUploadComplete)

                // 排序
                this.uploader.on('sort', this.onSort)
            },
            addButton(data) {
                this.uploader.addButton(data)
            },
            /*
            * 状态
            * ready dialogOpen beforeFileQueued fileQueued filesQueued startUpload uploadStart uploadBeforeSend
            *  uploadProgress uploadAccept uploadSuccess uploadComplete uploadFinished reset
            * */
            onAllFile(type) {
                if (type === 'filesQueued') {
                    this.show()
                } else if (type === 'uploadFinished') {
                    this.allFilesUpdateFlag = true
                    this.$emit(EVENT_FINISHED)
                    setTimeout(() => {
                        this.listFlag = false
                    }, 2000)
                }
            },
            // 某个文件开始上传前触发，一个文件只会触发一次。
            onUploadStart(file) {
                this.keyGenerator(file)
            },
            // 上传过程中触发，携带上传进度。
            onUploadProgress(file, percentage) {
                this.$refs[`progressBar${file.documentId}`][0].style.width = `${percentage * 100}%`
                if (percentage === 1) {
                    this.fileCount += 1
                    setTimeout(() => {
                        this.$refs[`progressContainer${file.documentId}`][0].style.display = `none`
                        let item = this.tableData.filter(item => item.id === file.id)
                        //item[0].progress = 1
                    }, 500)
                }
            },
            //上传成功时触发
            onSuccess(file) {
                this.$emit("success", file)
            },
            onUploadComplete(file) {
                this.$emit("finished", file)
            },
            // 当validate不通过时，会以派送错误事件的形式通知调用者
            onError(type) {
                this.allFilesUpdateFlag = true
                let errorMessage = ''
                if (type === 'F_DUPLICATE') {
                    errorMessage = '文件已存在'
                } else if (type === 'F_EXCEED_SIZE') {
                    errorMessage = `文件大小不能超过${this.fileSingleSizeLimit}M`
                } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                    errorMessage = '文件上传已达到最大上限数'
                } else if (type === 'Q_TYPE_DENIED') {
                    errorMessage = '您上传的文件错误，请检查文件并重新上传文件'
                } else {
                    errorMessage = `上传出错！请检查后重新上传！错误代码${type}`
                }
                this.$BMessage.warning(errorMessage)
            },
            // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次
            onUploadBeforeSend(block, data, headers) {
                let item = block.file.item
                let fileModel = item.model
                data.file = block.file
                data.chunkSize = this.uploader.options.chunkSize
                data.chunk = block.chunk
                data.uploadId = fileModel.uploadId
                data.bucketName = fileModel.bucketName
                data.objectKey = fileModel.objectKey
            },
            //文件添加到队列之前
            onBeforeFileQueued(file) {
                let that = this;
                let name = file.name.substring(0, file.name.lastIndexOf('.'))
                if (file.size && name.length < 100) {
                    return true
                } else {
                    if (name.length >= 100) {
                        this.$BMessage.warning('您上传的文件名称过长，请不要超过100个字符！')
                    }
                    if (file.size == 0) {
                        this.$BMessage.warning('您上传一个文件大小为0字节的文件，请重新上传！')
                    }
                    return false
                }
            },
            // 文件添加到队列
            onFileQueued(file) {
                if (!file.size) return
                let that = this;
                const {id, name, size} = file
                let fileSize = this._formatSize(size)
                // 优化retina, 在retina下这个值是2
                let ratio = window.devicePixelRatio || 1
                // 缩略图大小
                let thumbnailWidth = 110 * ratio
                let thumbnailHeight = 110 * ratio
                let imgSrc
                if (that.$parent.getCurrentData.id) {
                    file.documentId = that.$parent.getCurrentData.documentId;
                } else {
                    file.documentId = ''
                }
                if (file.getStatus() !== 'invalid') {
                    this.uploader.makeThumb(file, (error, src) => {
                        if (error) {
                            imgSrc = ''
                        }
                        imgSrc = src
                        file.previewUrl = imgSrc
                        this.tableData.push({
                            id,
                            No: this.tableData.length + 1,
                            control: 1,
                            name,
                            imgSrc,
                            progress: 0,
                            size: fileSize,
                            documentId: file.documentId
                        })
                    }, thumbnailWidth, thumbnailHeight)
                }
            },
            // 文件发送之前执行,整个文件发送之前
            _beforeSendFileHook(file) {
                let deferred = WebUploader.Deferred()
                let data = {
                    systemId: this.serveOption.systemId,
                    folderId: this.serveOption.folderId,
                    name: file.name
                }
                this.serveOption.uploadCheckFile(data).then((res) => {
                    if (res) {
                        file.item = {}
                        file.item.model = res
                        deferred.resolve()
                    } else {
                        deferred.reject()
                    }
                })
                return deferred.promise()
            },
            // 文件块发送之前在文件分片（如果没有启用分片，整个文件被当成一个分片）后，上传之前执行
            async _beforeSendHook(blcok) {
                let deferred = WebUploader.Deferred()
                let chunkNumber = blcok.chunk
                let item = blcok.file.item
                let uploadId = item.model.uploadId
                let isExist = false
                let chunkData = {
                    uploadId: uploadId,
                    chunkNumber: chunkNumber
                }
                await this.serveOption.uploadCheckChunk(JSON.stringify(chunkData))
                        .then((res) => {
                            isExist = res
                        })
                if (isExist) {
                    return deferred.resolved()
                }
                return deferred.promise()
            },
            // 在文件所有分片都上传完后，且服务端没有错误返回后执行
            async _afterSendFileHook(file) {
                let deferred = WebUploader.Deferred()
                let item = file.item
                let fileModel = item.model
                if (this.$parent.getCurrentData.id) {
                    file.documentId = this.$parent.getCurrentData.documentId
                } else {
                    file.documentId = ''
                }
                let mergeData = {
                    uploadId: fileModel.uploadId,
                    documentId: file.documentId,
                    isMain: true,
                    id: fileModel.id,
                    name: fileModel.name,
                    extName: file.ext,
                    folderId: fileModel.folderId,
                    previewUrl: file.previewUrl,
                    size: file.size,
                    creatorId: this.$user.userId,
                    creator: this.$user.name
                }
                await this.serveOption.uploadFileMerge(mergeData).then((res) => {
                    if (res) {
                        this.$parent.fileMergeSuccess(file, res)
                        item.percentage = 100
                    }
                })
                return deferred.promise()
            },
            // 在队列中移除文件
            removeFile(file, bool, id) {
                // 取消并中断文件上传
                this.uploader.cancelFile(file)
                // 在队列中移除文件
                this.uploader.removeFile(file, bool)
                let index = this.tableData.findIndex(el => el.id === id)
                this.tableData.splice(index, 1)
                if (!this.tableData.length) this.hide()
            },
            // 获取类型
            _getAccept(accept) {
                switch (accept) {
                    case 'file':
                        return {
                            title: 'File',
                            exteensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
                            mimeTypes: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
                        }
                    case 'video':
                        return {
                            title: 'Videos',
                            exteensions: 'mp4',
                            mimeTypes: '.mp4'
                        }
                    case 'image':
                        return {
                            title: 'Image',
                            exteensions: 'gif,jpg,jpeg,bmp,png',
                            mimeTypes: '.gif,.jpg,.jpeg,.bmp,.png'
                        }
                    default:
                        return accept
                }
            },
            upload(file) {
                this.uploader.upload(file)
            },
            // 显示组件
            show() {
                const div = this.$refs.backUploader
                document.body.append(div)
                this.visible = true
                this.listFlag = true
                this.allFilesUpdateFlag = false
            },
            // 隐藏组件
            hide() {
                this.visible = false
                this.reset()
            },
            // 重置
            reset() {
                this.uploader.reset()
                this.tableData = []
                this.fileCount = 0
            },
            // 删除文件
            deleteFile(id) {
                let files = this.uploader.getFiles()
                let file = files.filter(item => item.id === id)
                this.removeFile(file, true, id)
            },
            // 切换文件列表
            toggleList() {
                this.listFlag = !this.listFlag
            },
            _formatSize(size) {
                let fileSize = ''
                if (size < 1024 * 1000) {
                    fileSize = `${(size / 1024).toFixed(2)}KB`
                } else {
                    fileSize = `${(size / 1024 / 1000).toFixed(2)}MB`
                }
                return fileSize
            }
        },
        beforeDestroy() {
            const el = document.getElementById('backUploader')
            if (el) {
                this.uploader.destroy()
                document.body.removeChild(el)
            }
        }
    }
</script>

<style scoped lang="less">
    .back-uploader {
        position: fixed;
        width: 480px;
        right: 40px;
        bottom: 16px;
        z-index: 1001;
        box-shadow: 0 7px 21px rgba(0, 0, 0, 0.1);
        transition: bottom 218ms ease;
        background: #fff;
        
        .card-header {
            position: relative;
            padding: 10px 20px;
            line-height: 30px;
            border-bottom: 1px solid #e1e1e1;
            font-size: 20px;
            
            .card-title {
                max-width: 100%;
                padding-right: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
            }
            
            .icon {
                position: absolute;
                top: 10px;
                right: 55px;
                font-size: 22px;
                color: #8c8c8c;
                transition: color 218ms ease;
            }
            
            .icon-control {
                font-size: 26px;
            }
            
            .close-creator {
                right: 20px;
            }
        }
        
        .back-uploader-list {
            position: relative;
            padding: 12px 12px 0;
            height: 240px;
            background-color: #f7f7f7;
            overflow-y: auto;
            
            .back-uploader-item {
                float: left;
                width: 100%;
                background: #eee;
                box-shadow: none;
                margin-bottom: 8px;
                font-size: 14px;
                list-style: none;
                
                .uploader-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 8px;
                }
                
                .uploader-content {
                    position: relative;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex: 1 1 auto;
                }
                
                .file-item {
                    display: flex;
                    
                    .file-item-icon {
                        display: flex;
                        flex: 0 0 32px;
                        margin-right: 8px;
                        font-size: 22px;
                    }
                    
                    .file-item-content {
                        display: flex;
                        flex: 1 1 auto;
                        padding: 4px 0;
                        line-height: 16px;
                        min-width: 0;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .elastic-title {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        min-width: 0;
                        width: 250px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    
                    .file-info {
                        flex: 1;
                        text-align: right;
                    }
                }
                
                .progress-container {
                    position: absolute;
                    bottom: 2px;
                    width: 100%;
                    padding-left: 40px;
                    
                    .progress {
                        position: relative;
                        width: 100%;
                        height: 2px;
                        overflow: hidden;
                        margin-bottom: 0;
                        box-shadow: none;
                        border-radius: 0;
                        background-color: #d1ebfc;
                    }
                    
                    .progress-bar {
                        float: left;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 0;
                        height: 100%;
                        max-width: 100%;
                        background-color: #1b9aee;
                        box-shadow: none;
                        font-size: 12px;
                        line-height: 20px;
                        color: #fff;
                        text-align: center;
                        transition: width .6s ease;
                    }
                }
                
                .uploader-handlers {
                    display: flex;
                    width: 64px;
                    flex: 0 0 64px;
                    justify-content: flex-end;
                    align-items: center;
                    font-size: 18px;
                    
                    .ivu-icon-md-checkmark {
                        color: #1b9aee;
                    }
                    
                    .ivu-icon-md-checkmark:hover {
                        cursor: pointer;
                    }
                    
                    .ivu-icon-md-close:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        
    }
</style>
