<!-- 父子级目录以'-'相连，第一级子目录必须是模块名称，比如tpb,organization
     bmsa-ui-001
     organization-department-001
     planCenter-statics-doc
-->
<template>
    <div class="uploader-wrapper">
        <div :class="isOneFile ? '' : 'uploader'" :id="`uploader${randomNum}`" v-if="!tableLayout">
            <div class="queueList" v-if="!isOneFile">
                <div class="placeholder">
                    <div :id="`filePicker${randomNum}`"></div>
                    <p>或将文件拖到这里，单次最多可选{{multiple?fileNumLimit:1}}个</p>
                </div>
            </div>
            <div class="queueList oneQueueList" :style="'width:'+pictureSize+'px;height:'+pictureSize+'px;'" v-else> <!-- 单文件上传 -->
                <div class="placeholder">
                    <div :id="`filePicker3${randomNum}`"></div>
                </div>
            </div>
            <div class="statusBar" style="display:none;" v-if="showFileButton && !isOneFile">
                <div class="progress">
                    <span class="text">0%</span>
                    <span class="percentage"></span>
                </div>
                <div class="info"></div>
                <div class="btns" v-if="authUpload">
                    <div :id="`filePicker2${randomNum}`" class="file-picker2"></div>
                    <div @click="uploadBtnClick" class="uploadBtn" v-if="!autoUpload">开始上传</div>
                </div>
            </div>
        </div>
        <div v-else>
            <bingoTable
                    :border="model.border"
                    :columns="columns"
                    :data="tableData"
                    :height=height
                    :layoutShow="false"
                    :page="page"
                    :pageSetting="model.pageSetting"
                    :showDelete="false"
                    :showNew="false"
                    :showRefresh="false"
                    :size="model.size"
                    :toolbar="model.toolbar"
                    @getData="getTablePageData"
                    @on-select="onSelect"
                    @on-select-all="onSelectAll"
                    @on-select-all-cancel="onSelectAllCancel"
                    @on-select-cancel="onSelectCancel"
                    @on-selection-change="onSelectionChange"
                    class="upload-table"
                    ref="table">
                <span class="uploader-table-toolbar" name="toolbar">
                    <div :id="`tableFilePicker${randomNum}`" class="table-file-picker" v-if="authUpload"></div>
                    <div @click="uploadBtnClick" class="uploadBtn" v-show="tableUploadBtnFlag && !autoUpload">{{tableUploadBtn}}</div>
                    <Button @click="refreshTable" icon='md-refresh'
                            type='primary'>{{$t('page.common.refresh')}}</Button>
                    <Button @click="removeTableAllFile()" icon='md-trash' type='primary' v-if="authDelete">{{$t('page.common.delete')}}</Button>
                    <Button @click="batchDownFiles()" icon='md-cloud-download' type='primary' v-if="authDown">{{$t('page.common.download')}}</Button>
                </span>
            </bingoTable>
        </div>
        <Modal footer-hide v-model="showImageModal">
            <img :src="showBigImage" style="width: 100%">
        </Modal>
        <bingo-modal :content="modalMsg1.content" :title="modalMsg1.title" @ok="ok" ref="modal"></bingo-modal>
    </div>
</template>
<script>
/*
* 文档地址 http://fex.baidu.com/webuploader/doc/index.html
* */
/* eslint-disable */
    import $ from './lib/jquery'
    import WebUploader from './lib/webuploader'
    import * as Api from '@/api/bmsa/upload';
    import bingoTable from '@/components-api/bingo-table'
    import backUploader from '../bingo-file-upload/back-uploader'
    import bingoFileIcon from '@/components-api/bingo-file-icon';
    import bingoModal from '@/components-api/bingo-modal';
    import util from '@/libs/util';
    import Setting from '../../setting'

    const EVENT_SUCCESS = 'success'
    const EVENT_FINISHED = 'finished'
    const EVENT_UPLOAD_ERROR = 'upload-error'
    const officeExtName = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf']
    const imgExtName = ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
    const uuid = require('uuid');
    const token = util.cookies.get('token');
    export default {
        name: 'bingowebupload',
        components: {
            bingoTable, Api, backUploader, bingoFileIcon, bingoModal
        },
        props: {
            serveOption: {
                type: Object,
                required: true
            },
            autoUpload: { // 是否自动上传
                type: Boolean,
                default: false
            },
            showFileButton: {
                type: Boolean,
                default: true
            },
            // 默认类型
            tableLayout: {
                type: Boolean,
                default: false
            },
            isOneFile: { // 拖拽形态是否是单文件上传
                type: Boolean,
                default: false
            },
            pictureSize: { // 单文件
                type: Number,
                default: 110
            },
            // 指定接受哪些类型的文件, 默认文件类型
            accept: {
                type: String,
                default: ''
            },
            // 上传最大数量 默认为10
            fileNumLimit: {
                type: Number,
                default: 10
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
            // 是否多选
            multiple: {
                type: Boolean,
                default: false
            },
            // 表格是否显示分页
            page: {
                type: Boolean,
                default: false
            },
            //权限--下载
            authDown: {
                type: Boolean,
                default: true
            },
            //权限--上传
            authUpload: {
                type: Boolean,
                default: true
            },
            //权限--重命名
            authRename: {
                type: Boolean,
                default: true
            },
            //权限--删除
            authDelete: {
                type: Boolean,
                default: true
            },
            //权限--预览
            authSee: {
                type: Boolean,
                default: true
            },
            //控制表格的高度
            height: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                token: token,
                uploadFileList: [],
                uploader: null,
                randomNum: Math.floor(Math.random() * 1000000),
                currentPage: 1,
                tableUploadBtnFlag: false,
                tableUploadBtn: '开始上传',
                deleteBtn: '删除',
                downloadBtn: '下载',
                tableData: [],
                tableDataTotal: [],
                tableUploadData: {}, // 单文件上传的数据
                tableCheckBox: [],
                onUploadFile:[],
                uploadFlag: false, // 判断是否是单文件上传
                systemId: '',
                fileDetail: {
                    header: '',
                    url: '',
                    type: ''
                },
                modalMsg1: {
                    title: '请确认',
                    content: ''
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'left',
                        resizable: true,
                        render: (h, params) => {
                            return h('div', {
                                class:'progressOver',
                                    attrs: {
                                        id: `tableProgress${this.tableData[params.index].id}`
                                    }
                                },
                                [
                                    h('a', {
                                        on: {
                                            click: () => {
                                                if (params.row.url) {
                                                    this.downFile(params.row.url)
                                                }
                                            }
                                        }
                                    }, [
                                        h(bingoFileIcon, {
                                            props: {  // 自定义组件的属性
                                                type: params.row.extName,
                                                width: '14px',
                                                height: '14px'
                                            },
                                            class: 'bingoFileIcon',
                                            on: {}
                                        }),
                                        h('Tooltip', {
                                            props: {placement: 'top', transfer: true}
                                        }, [
                                            params.row[params.column.key],
                                            h('span', {
                                                slot: 'content',
                                                style: {whiteSpace: 'normal', wordBreak: 'break-all'}
                                            }, params.row[params.column.key])
                                        ])
                                    ])
                                ]
                            )
                        }
                    },
                    {
                        title: '文件大小',
                        key: 'size',
                        align: 'center',
                        width: 130
                    },
                    {
                        title: '操作',
                        key: 'control',
                        align: 'center',
                        width: 220,
                        render: (h, params) => {
                            let that = this;
                            return h('div', [
                                h('a', {
                                    attrs: {
                                        id: 'uploadFile' + params.row.id
                                    },
                                    style: {
                                        display: this.authUpload ? 'inline-block' : 'none',
                                    },
                                    on: {
                                        load: () => {
                                            that._addFileButton(params.row)
                                        },
                                        click: () => {
                                            that._addFileButton(params.row)
                                            //this.tableUploadData = params.row
                                        }
                                    }
                                }),
                                h('a', {
                                    style: {
                                        display: this.authDown ? 'inline-block' : 'none',
                                    },
                                    attrs: {
                                        href: Setting.apiBaseURL + '/docservice' + params.row.url,
                                        download: params.row.name,
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: 'md-cloud-download',
                                            size: '22',
                                        },
                                        nativeOn: {
                                            click: () => {
                                                if (params.row.url) {
                                                    this.downFile(params.row.url)
                                                }
                                            }
                                        }
                                    },)
                                ]),
                                h('a', {
                                    style: {
                                        display: this.authDelete ? 'inline-block' : 'none',
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: 'md-trash',
                                            size: '22',
                                        },
                                        nativeOn: {
                                            click: () => {
                                                this.removeTableFile(params)
                                            }
                                        }
                                    },)
                                ]),
                                h('a', {
                                    style: {
                                        display: this.authSee ? 'inline-block' : 'none',
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-eye',
                                            size: '22',
                                        },
                                        nativeOn: {
                                            click: () => {
                                                that.showFileDetail(params.row)
                                            }
                                        }
                                    },)
                                ]),
                            ])
                        }
                    }
                ],
                showImageModal: false,
                showBigImage: '',
                oldFile:''//单文件上传时要删除的文件
            }
        },
        watch: {
            tableDataTotal(val) {
                this.tableUploadBtnFlag = !!val.length
            }
        },
        computed: {
            model: function () {
                return {
                    toolbar: true,
                    border: true,
                    page: true,
                    size: 'small',
                    pageSetting: { // 文档中台暂时不支持分页查询
                        pageNum: 1,
                        pageTotal: this.tableDataTotal.length,
                        pageSize: 10,
                        showSizer: true,
                    }
                }
            },
            picker() {
                let ListPicker = {
                    cls: `#filePicker${this.randomNum}`,
                    label: '点击选择'
                }
                let OneListPicker = {
                    cls: `#filePicker3${this.randomNum}`,
                    label: '+'
                }
                let tablePicker = {
                    cls: `#tableFilePicker${this.randomNum}`,
                    label: '选择文件'
                }
                let picker = {}
                if(this.tableLayout){
                    picker = tablePicker
                } else {
                    if(this.isOneFile){
                        picker = OneListPicker
                    } else {
                        picker = ListPicker
                    }
                }

                return picker
                //return !this.tableLayout ? defaultPicker : tablePicker
            },
            $user() { // 获取当前登陆人信息
                return this.$store.state.admin.user.info.data;
            },

        },
        mounted() {
            this.init()
            this.initServeOption()
            this.register()
            this.initWebUploader()
            this._getFoldersList()
            if (this.page) {
                page = model.page
            }
        },
        methods: {
            // 初始化dom
            init() {
                // 容器
                this.$wrap = $(`#uploader${this.randomNum}`)
                // 图片容器
                this.$queue = $('<ul class="filelist"></ul>').appendTo(this.$wrap.find('.queueList'))
                // 状态栏，包括进度和控制按钮
                this.$statusBar = this.$wrap.find('.statusBar')
                // 文件总体选择信息。
                this.$info = this.$statusBar.find('.info')
                // 上传按钮
                this.$uploadBtn = this.$wrap.find('.uploadBtn')
                // 批量删除按钮
                this.$deleteBtn = this.$wrap.find('.deleteBtn')
                // 批量下载按钮
                this.$downloadBtn = this.$wrap.find('.downloadBtn')
                // 状态栏，包括进度和控制按钮
                this.$placeHolder = this.$wrap.find('.placeholder')
                // 状态栏上传按钮
                this.$filePicker2 = $(`#filePicker2${this.randomNum}`)
                this.$filePicker3 = $(`#filePicker2${this.randomNum}`)
                // 进度条
                this.$progress = this.$statusBar.find('.progress').hide()
                // 添加的文件数量
                this.fileCount = 0
                // 添加的文件总大小
                this.fileSize = 0
                // 进度条
                this.percentages = {}
                // 可能有pedding, ready, uploading, confirm, done.
                this.state = 'pedding'
                // 设置拖拽
                if (!this.tableLayout) {
                    this.uploaderPaste = `#uploader${this.randomNum}`
                    this.uploaderDnd = `#uploader${this.randomNum} .queueList`
                } else {
                    this.uploaderPaste = ''
                    this.uploaderDnd = ''
                }
            },
            //初始化serveOption
            initServeOption() {
                // 请求
                this.serveOption.uploadCheckFile = Api.uploadCheckFile // 查看文件
                this.serveOption.uploadCheckChunk = Api.uploadCheckChunk // 查看文件分片
                this.serveOption.uploadFileUrl = Api.uploadFileUrl // 上传文件
                this.serveOption.uploadFileMerge = Api.uploadFileMerge // 合并文件
                this.serveOption.uploadGetContent = Api.uploadGetContent // 获取目录及目录下文件

                this.serveOption.newSubFolders = Api.newSubFolders //创建文件目录
                this.serveOption.getFolders = Api.getFolders// 获取目录
                this.serveOption.getFoldersList = Api.getFoldersList//获取文件实体

                this.serveOption.deleteFilesId = Api.deleteFilesId // 按id逻辑删除实体
                this.serveOption.clearById = Api.clearById // 按id进行物理删除
                this.serveOption.deleteByIds = Api.deleteByIds // 根据多个id进行逻辑删除
                this.serveOption.updateFile = Api.updateFile // 根据多个id进行逻辑删除

                this.serveOption.deleteDocument = Api.deleteDocument // 单文档删除
                this.serveOption.deleteMultipleDocument = Api.deleteMultipleDocument // 多文档删除

                this.serveOption.officeOnlineUrl = 'http://172.20.30.43/op/view.aspx?src='

                if (this.serveOption.systemId == undefined && this.serveOption.systemId == null) {
                    this.serveOption.systemId = 'task';
                }
                this.serveOption.headers = {
                    'Authorization': util.cookies.get('token')
                };
            },
            // 初始化WebUploader
            initWebUploader() {
                this[`uploader${this.randomNum}`] = WebUploader.create({
                    // 选完文件后，是否自动上传
                    auto: this.autoUpload,
                    // swf文件路径
                    swf: './lib/Uploader.swf',
                    // 文件接收服务端
                    server: Setting.apiBaseURL + '/' + this.serveOption.uploadFileUrl,
                    dnd: this.uploaderDnd,
                    paste: this.uploaderPaste,
                    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                    disableGlobalDnd: true,
                    pick: {
                        // 选择文件的按钮
                        id: this.picker.cls,
                        // 是否多文件上传 默认false
                        multiple: this.multiple,
                        label: this.picker.label
                    },
                    // 允许选择文件格式。
                    accept: this.getAccept(this.accept),
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
                    duplicate: false,
                    //头部信息携带token
                    headers: {
                        'Authorization': util.cookies.get('token')
                    }
                })

                if (!this.tableLayout) {
                    // 添加“添加文件”的按钮，
                    this[`uploader${this.randomNum}`].addButton({
                        id: `#filePicker2${this.randomNum}`,
                        label: '继续添加'
                    })
                    /*this[`uploader${this.randomNum}`].addButton({
                        id: `#filePicker3${this.randomNum}`,
                        label: '+'
                    })*/
                }

                // 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证
                this[`uploader${this.randomNum}`].on('dndAccept', this.onDndAccept)

                // 当文件被加入队列以后触发
                this[`uploader${this.randomNum}`].on('fileQueued', this.onFileQueued)

                // 文件从队列删除
                this[`uploader${this.randomNum}`].on('fileDequeued', this.onFileDequeued)

                // 全部文件
                this[`uploader${this.randomNum}`].on('all', this.onAllFile)

                // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次
                this[`uploader${this.randomNum}`].on('uploadBeforeSend', this.onUploadBeforeSend)

                // 某个文件开始上传前触发，一个文件只会触发一次。
                this[`uploader${this.randomNum}`].on('uploadStart', this.onUploadStart)

                // 上传过程中触发，携带上传进度。。
                this[`uploader${this.randomNum}`].on('uploadProgress', this.onUploadProgress)

                // 当文件上传成功时触发
                this[`uploader${this.randomNum}`].on('uploadSuccess', this.onUploadSuccess)

                //文件上传完成后触发
                this[`uploader${this.randomNum}`].on('uploadFinished', (type) => {
                    this.setState('confirm')
                    this.register()
                    console.log('上传成功')
                })
                //文件开始上传时触发
                this[`uploader${this.randomNum}`].on('startUpload', (type) => {
                    this.setState('uploading')
                })
                // 文件暂停上传时触发
                this[`uploader${this.randomNum}`].on('stopUpload', (type) => {
                    this.setState('paused')
                })

                // 当文件上传出错时触发
                this[`uploader${this.randomNum}`].on('uploadError', this.onUploadError)

                // 当validate不通过时，会以派送错误事件的形式通知调用者
                this[`uploader${this.randomNum}`].on('error', this.onError)

                // 不管成功或者失败，文件上传完成时触发
                this[`uploader${this.randomNum}`].on('uploadComplete', this.onUploadComplete)
            },
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
            // 开始上传按钮
            uploadBtnClick() {
                if (this.$uploadBtn.hasClass('disabled')) {
                    return false
                }
                if (this.state === 'ready') {
                    this[`uploader${this.randomNum}`].upload()
                } else if (this.state === 'paused') {
                    this[`uploader${this.randomNum}`].upload(this.file)
                } else if (this.state === 'uploading') {
                    this[`uploader${this.randomNum}`].stop(true, this.file)
                    this.setState('paused')
                }
            },
            // table分页数据
            getTablePageData(currentPage) {
                if(this.page){
                    this.currentPage = this.model.pageSetting.pageNum
                    if (this.tableDataTotal.length === (this.currentPage - 1) * this.model.pageSetting.pageSize) {
                        this.currentPage -= 1
                        if (!this.currentPage) this.currentPage = 1
                    }
                    this.tableData = this.tableDataTotal.slice((this.currentPage - 1) * this.model.pageSetting.pageSize, this.currentPage * this.model.pageSetting.pageSize)
                } else {
                    this.tableData = this.tableDataTotal
                }
            },
            // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次
            onUploadBeforeSend(block, data) {
                let item = block.file.item
                let fileModel = item.model
                data.file = block.file
                data.chunkSize = this[`uploader${this.randomNum}`].options.chunkSize
                data.chunk = block.chunk
                data.uploadId = fileModel.uploadId
                data.bucketName = fileModel.bucketName
                data.objectKey = fileModel.objectKey
            },
            // 某个文件开始上传前触发，一个文件只会触发一次。
            onUploadStart(file) {
                if (this.uploadFlag) {
                    this.removeTableOldFile(this.tableUploadData) // 将源文件删除
                    this.tableUploadData = {}
                    this.uploadFlag = false
                }
                this.file = file
                this.keyGenerator(file)
            },
            // 上传过程中触发，携带上传进度。
            onUploadProgress(file, percentage) {
                var $li = $(`#tableProgress${file.id}`),
                    $percent = $li.find('.progress .progress-bar');

                // 避免重复创建
                // 避免重复创建
                if ( !$percent.length ) {
                    $percent = $('<div class="file-progress progress-striped active">' +
                        '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                        '</div>' +
                        '</div>' + '<br/><div class="per">0%</div>').appendTo( $li ).find('.progress-bar');
                }

                $li.siblings('.file-status').text('上传中');
                $li.find('.per').text((percentage * 100).toFixed(2) + '%');
                $percent.css( 'width', percentage * 100 + '%' );
            },
            // 当文件上传出错时触发
            onUploadError(file) {
                this.$emit(EVENT_UPLOAD_ERROR, file)
            },
            // 当validate不通过时，会以派送错误事件的形式通知调用者
            onError(type) {
                $( '#'+file.id ).find('.file-status').text('上传出错');
                let errorMessage = ''
                if (type === 'F_EXCEED_SIZE') {
                    errorMessage = `文件大小不能超过${this.fileSingleSizeLimit}M`
                } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                    errorMessage = '文件上传已达到最大上限数'
                } else if (type === 'Q_TYPE_DENIED') {
                    errorMessage = '文件格式错误，请选择文件'
                } else {
                    errorMessage = `上传出错！请检查后重新上传！错误代码${type}`
                }
                this.$Message.error(errorMessage)
            },
            // 当文件上传成功时触发
            onUploadSuccess(file, res) {
                $( '#'+file.id ).find('.file-status').text('上传成功');
                /*if(this.tableLayout){
                    $(`#tableProgress${file.id}`).addClass('upload-state-done');
                } else {
                    if(this.isOneFile){
                        if(this.oldFile != ''){
                            this._deleteDocument(this.oldFile.source.id);
                            this.$queue.empty();
                        }
                    }
                    this._getFoldersList()
                }*/
                if (res._raw === '分片上传完成') {
                    this.$emit('success', file)
                }
            },
            // 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证
            onDndAccept(items) {
                // 拖拽时不接受 js, txt 文件。
                let denied = false
                let len = items.length
                // 修改js类型
                let unAllowed = 'text/plain;application/javascript '
                for (let i = 0; i < len; i++) {
                    // 如果在列表里面
                    if (~unAllowed.indexOf(items[i].type)) {
                        denied = true
                        break
                    }
                }
                return !denied
            },
            // 文件添加到队列
            onFileQueued(file) {
                if (file.size) {
                    let fileSize = this._formatSize(file.size);
                    if (!this.tableLayout) {
                        this.fileCount++
                        this.fileSize += file.size
                        if (this.fileCount === 1) {
                            this.$placeHolder.addClass('element-invisible')
                            this.$statusBar.show()
                        } else {
                            this.$placeHolder.removeClass('element-invisible')
                        }
                        this.addFile(file)
                        this.setState('ready')
                        this.updateTotalProgress()
                    } else {
                        const {id, name, size} = file
                        if (this.tableUploadData.id) {
                            for (let i = 0; i < this.tableDataTotal.length; i++) {
                                if (this.tableDataTotal[i].id === this.tableUploadData.id) {
                                    let obj = {
                                        id: file.id,
                                        No: this.tableDataTotal[i].No,
                                        control: 1,
                                        name: file.name,
                                        progress: 0,
                                        size: fileSize,
                                        remark: '',
                                        url: file.fileUrl,
                                        previewImage: file.previewImage,
                                        extName: file.extName,
                                        mainFileId: file.mainFileId
                                    }
                                    this.tableDataTotal[i] = obj
                                    this.uploadFlag = true
                                    break
                                }
                            }
                        } else {
                            this.tableDataTotal.unshift({
                                id: file.id,
                                No: this.tableDataTotal.length + 1,
                                control: 1,
                                name,
                                progress: 0,
                                size: fileSize,
                                remark: '',
                                url: file.fileUrl,
                                previewImage: file.previewImage,
                                extName: file.ext,
                                mainFileId: file.mainFileId
                            })
                        }
                        this.getTablePageData(this.currentPage)
                        this.state = 'ready'
                    }
                }
            },
            _formatSize(size) {
                let fileSize = ''
                if (size < 1024 * 1000) {
                    fileSize = `${(size / 1024).toFixed(2)}KB`
                } else {
                    fileSize = `${(size / 1024 / 1000).toFixed(2)}MB`
                }
                return fileSize
            },
            // 文件从队列删除
            onFileDequeued(file) {
                if (!this.tableLayout) {
                    this.fileCount--
                    this.fileSize -= file.size
                    if (!this.fileCount) {
                        this.setState('pedding')
                    }
                    this.viewRemoveFile(file)
                    this.updateTotalProgress()
                }
            },
            onAllFile(type) {
                if (type === 'uploadFinished') this.$emit(EVENT_FINISHED, this.uploadFileList)
                if (!this.tableLayout) {
                    switch (type) {
                        case 'uploadFinished':
                            this.setState('confirm')
                            break
                        case 'startUpload':
                            this.setState('uploading')
                            break
                        case 'stopUpload':
                            this.setState('paused')
                            break
                    }
                }
            },
            //下载
            downFile(item) {
                var a = document.createElement('a')
                var e = document.createEvent('MouseEvents')  // 创建鼠标事件对象
                e.initEvent('click', false, false) // 初始化事件对象
                a.href = Setting.apiBaseURL + '/docservice' + item.url// 设置下载地址
                a.download = item.name // 设置下载文件名
                a.dispatchEvent(e) // 给指定的元素，执行事件click事件
            },
            //批量下载
            batchDownFiles() {
                if (this.$refs.table.$refs.table.getSelection().length > 0) {
                    this.$refs.table.$refs.table.getSelection().forEach(item => {
                        this.downFile(item)
                    })
                } else {
                    let config = {
                        title: '请选择文件！'
                    }
                    this.$Modal.warning(config)
                }

            },
            // 不管成功或者失败，文件上传完成时触发
            onUploadComplete(file) {
                //$(`#tableProgress${file.id}`).find('.progress').remove();
                $(`#${file.id}`).find('.progress').fadeOut();
                this.$emit('complete', file)
            },
            // 添加文件
            addFile(file) {
                const _this = this
                file.isShowIcon = false
                // 图片容器
                let $li = $(`<li class="file-item" id="${file.id}"><p class="title">${file.name}</p><p class="imgWrap"><bingo-file-icon v-if="${file.isShowIcon}" :type="${file.ext}"></bingo-file-icon></p><p class="progress"><span></span></p></li>`)
                //let $btns = $('<div class="file-panel"><span class="file-panel-item rotateLeft">下载</span><span class="file-panel-item cancel">删除</span><span class="file-panel-item rotateRight">向右旋转</span><span class="file-panel-item rotateLeft">向左旋转</span></div>').appendTo($li)
                let downBtn = '', deleteBtn = '', uploadBtn = '';
                if (this.authUpload) {
                    uploadBtn = '<span class="file-panel-item upload" id="oneUploadFile'+file.source.id+'"></a>'
                }
                if (this.authDown) {
                    //downBtn = $(`<a href="${Setting.apiBaseURL + '/docservice' + file.url + file.id}" download="${file.name}"><i class="ivu-icon ivu-icon-md-cloud-download"></i></a>`)
                    downBtn = '<a href='+Setting.apiBaseURL + '/docservice' + file.source.fileUrl + ' download = ' + file.name + ' class="file-panel-item"><i class="ivu-icon ivu-icon-md-cloud-download"></i></a>'
                }
                if (this.authDelete) {
                    deleteBtn = '<span class="file-panel-item cancel"><i class="ivu-icon ivu-icon-md-trash"></i></span>'
                }
                let $btns = $('<div class="file-panel">' + deleteBtn + downBtn + uploadBtn + '</div>').appendTo($li)
                let $prgress = $li.find('p.progress span')
                let $wrap = $li.find('p.imgWrap')
                let $info = $('<p class="error"></p>')
                let text = ''
                let imgSrc
                // 优化retina, 在retina下这个值是2
                let ratio = window.devicePixelRatio || 1
                // 缩略图大小
                let thumbnailWidth = 110 * ratio
                let thumbnailHeight = 110 * ratio
                let showError = function (code) {
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出'
                            break
                        case 'interrupt':
                            text = '上传暂停'
                            break
                        default:
                            text = '上传失败，请重试'
                            break
                    }
                    $info.text(text).appendTo($li)
                }
                if (file.getStatus() === 'invalid') {
                    showError(file.statusText)
                } else {
                    $wrap.text('预览中')
                    this[`uploader${this.randomNum}`].makeThumb(file, (error, src) => {
                        if (error) {
                            //$wrap.text('不能预览')
                            this.fileDetail.header = file.name
                            let officeMap = officeExtName
                            let extName = file.ext.toLowerCase()

                            let fileType  = officeMap.find(c=>c==extName);
                            let imgType   = imgExtName.find(c=>c==extName);

                            if(imgType){
                                /*this.showImageModal = true;
                                this.showBigImage = item.fileUrl*/
                                let img = $(`<img src="${file.source.previewImage}"/>`)
                                $wrap.empty().append(img)
                            } else{
                               // this.$refs.modal.warning("您选择的文件类型暂时不支持预览！")
                                /*this.fileDetail.url = this.serveOption.officeOnlineUrl + item.previewImage
                                window.open(this.fileDetail.url)*/
                                file.isShowIcon = true;
                            }
                        }
                        //imgSrc = src
                        file.previewUrl = src
                        // 添加图片
                        if (this._isSupportBase64()) {
                            //let img = $(`<img src="${src}"/>`)
                           // $wrap.empty().append(img)
                        } else {
                            //$wrap.text('预览出错')
                        }
                    }, thumbnailWidth, thumbnailHeight)

                    this.percentages[file.id] = [file.size, 0]
                    file.rotation = 0
                }

                // 文件状态变化
                /*file.on('statuschange', (cur, prev) => {
                    if (prev === 'progress') {
                        $prgress.hide().width(0)
                    } else if (prev === 'queued') {
                        $li.off('mouseenter mouseleave')
                        $btns.remove()
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        showError(file.statusText)
                        this.percentages[file.id][1] = 1
                    } else if (cur === 'interrupt') {
                        showError('interrupt')
                    } else if (cur === 'queued') {
                        $info.remove()
                        $prgress.css('display', 'block')
                        this.percentages[file.id][1] = 0
                    } else if (cur === 'progress') {
                        $info.remove()
                        $prgress.css('display', 'block')
                    } else if (cur === 'complete') {
                        $prgress.hide().width(0)
                        debugger
                        //$li.append('<span class="success"></span>')
                    }
                    $li.removeClass('state-' + prev).addClass('state-' + cur)
                })
*/
                $li.on('mouseenter', () => {
                    $btns.stop().animate({height: 30})
                    let onFileBtn = $('#oneUploadFile'+file.source.id)
                    if(!onFileBtn.children().length){
                        _this[`uploader${_this.randomNum}`].addButton({
                            id: `#oneUploadFile${file.source.id}`,
                            label: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>'
                        })
                    }
                })

                $li.on('mouseleave', () => {
                    $btns.stop().animate({height: 0})
                     //$('#oneUploadFile'+file.source.id).empty();
                })
                $btns.on('click', 'span', function () {
                    let index = $(this).index()
                    switch (index) {
                        case 0:
                            _this[`uploader${_this.randomNum}`].removeFile(file);
                            _this._deleteDocument(file.source.id);
                            break
                        case 1:
                            _this.downFile(file.source.fileUrl) // 下载功能
                            return
                        case 2:
                            debugger
                            _this.oldFile = file
                            //上传
                            //_this._addFileButton()
                           /* _this[`uploader${_this.randomNum}`].addButton({
                                id: `#oneUploadFile${file.source.id}`,
                                label: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>'
                            })*/
                            //file.rotation += 90
                            break
                        case 3:
                            //file.rotation -= 90
                            break
                    }
                    // css
                    if (_this._supportTransition()) {
                        let deg = `rotate(${file.rotation}deg)`
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        })
                    } else {
                        $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')')
                    }
                })
                $li.appendTo(this.$queue)
            },
            // 负责view的销毁
            viewRemoveFile(file) {
                let $li = $('#' + file.id)
                delete this.percentages[file.id]
                this.updateTotalProgress()
                $li.off().find('.file-panel').off().end().remove()
            },
            // 更新progress
            updateTotalProgress() {
                let loaded = 0
                let total = 0
                let spans = this.$progress.children()
                let percent
                $.each(this.percentages, (k, v) => {
                    total += v[0]
                    loaded += v[0] * v[1]
                })
                percent = total ? loaded / total : 0
                spans.eq(0).text(Math.round(percent * 100) + '%')
                spans.eq(1).css('width', Math.round(percent * 100) + '%')
                this.updateStatus()
            },
            // 更新状态
            updateStatus() {
                let text = ''
                let stats = this[`uploader${this.randomNum}`].getStats()
                // if (this.state === 'ready') {
                //     text = `选中${this.fileCount}张图片，共${WebUploader.formatSize(this.fileSize)}。`
                // } else if (this.state === 'confirm') {
                //     if (stats.uploadFailNum) {
                //         text = `已成功上传${stats.successNum}张照片至XX相册，${stats.uploadFailNum}张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>`
                //     }
                // } else {
                //     text = `共${this.fileCount}张（${WebUploader.formatSize(this.fileSize)}），已上传${stats.successNum}张`
                //     if (stats.uploadFailNum) {
                //         text += '，失败' + stats.uploadFailNum + '张'
                //         text += `，失败${stats.uploadFailNum}张`
                //     }
                // }
                // this.$info.html(text)
            },
            setState(val) {
                let stats
                if (val === this.state) {
                    return
                }
                this.state = val
                if (!this.tableLayout) {
                    this.$uploadBtn.removeClass('state-' + this.state)
                    this.$uploadBtn.addClass('state-' + val)
                    switch (this.state) {
                        case 'pedding':
                            this.$placeHolder.removeClass('element-invisible')
                            this.$queue.hide()
                            this.$statusBar.addClass('element-invisible')
                            this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'ready':
                            this.$placeHolder.addClass('element-invisible')
                            this.$filePicker2.removeClass('element-invisible')
                            this.$queue.show()
                            this.$statusBar.removeClass('element-invisible')
                            this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'uploading':
                            this.$filePicker2.addClass('element-invisible')
                            this.$progress.show()
                            this.$uploadBtn.text('暂停上传')
                            break
                        case 'paused':
                            this.$progress.show()
                            this.$uploadBtn.text('继续上传')
                            break
                        case 'confirm':
                            this.$progress.hide()
                            this.$filePicker2.removeClass('element-invisible')
                            this.$uploadBtn.text('开始上传')
                            stats = this[`uploader${this.randomNum}`].getStats()
                            if (stats.successNum && !stats.uploadFailNum) {
                                this.setState('finish')
                                return
                            }
                            break
                        case 'finish':
                            stats = this[`uploader${this.randomNum}`].getStats()
                            if (stats.successNum) {
                            } else {
                                // 没有成功的图片，重设
                                this.state = 'done'
                            }
                            break
                    }
                    this.updateStatus()
                } else {
                    switch (this.state) {
                        case 'pedding':
                            this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'ready':
                            this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'uploading':
                            this.tableUploadBtn = '暂停上传'
                            break
                        case 'paused':
                            this.tableUploadBtn = '继续上传'
                            break
                        case 'confirm':
                            this.tableUploadBtn = '开始上传'
                            stats = this[`uploader${this.randomNum}`].getStats()
                            if (stats.successNum && !stats.uploadFailNum) {
                                this.setState('finish')
                                return
                            }
                            break
                        case 'finish':
                            stats = this[`uploader${this.randomNum}`].getStats()
                            if (stats.successNum) {
                            } else {
                                // 没有成功的图片，重设
                                this.state = 'done'
                            }
                            break
                    }
                }
            },
            // 文件大小
            getFileSizeTitle(fileByte) {
                var fileSizeByte = fileByte
                var fileSizeMsg = ''
                if (fileSizeByte < 1048576) fileSizeMsg = `${(fileSizeByte / 1024).toFixed(2)}KB`
                else if (fileSizeByte === 1048576) fileSizeMsg = '1MB'
                else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = `${(fileSizeByte / (1024 * 1024)).toFixed(2)}MB`
                else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1GB'
                else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = `${(fileSizeByte / (1024 * 1024 * 1024)).toFixed(2)}GB`
                else fileSizeMsg = '文件超过1TB'
                return fileSizeMsg
            },
            // 上传
            upload(file) {
                this[`uploader${this.randomNum}`].upload(file)
            },
            // 暂停
            stop(file) {
                this[`uploader${this.randomNum}`].stop(file)
            },
            // 取消并中断文件上传
            cancelFile(file) {
                this[`uploader${this.randomNum}`].cancelFile(file)
            },
            // 在队列中移除文件
            _removeFile(file, bool) {
                // 取消并中断文件上传
                this[`uploader${this.randomNum}`].cancelFile(file)
                // 在队列中移除文件
                this[`uploader${this.randomNum}`].removeFile(file, bool);
                this._deleteDocument(file.source.id);
            },
            //刷新
            refreshTable() {
                if (this.tableLayout) {
                    this.tableDataTotal = [];
                    this.tableCheckBox = [];
                    this.tableData = [];
                    this._getFoldersList()
                }
            },
            // 单文件上传删除
            removeTableOldFile(row) {
                let id = row.id;
                if (this.tableLayout) {
                    this._deleteDocument(id);
                }
            },
            // 删除
            removeTableFile(params) {
                this.$Modal.confirm({
                    title: '是否确认删除？',
                    onOk: () => {
                        let id = params.row.id;
                        let index = params.index;
                        if (this.tableLayout) {
                            this.tableDataTotal.splice(index, 1)
                            this.getTablePageData(this.currentPage)
                            this._deleteDocument(id);
                        }
                    }
                })
            },
            //批量删除
            removeTableAllFile() {
                this.$Modal.confirm({
                    title: '是否确认删除？',
                    onOk: () => {
                        let that = this;
                        let idList = [];
                        that.tableCheckBox.forEach((item) => {
                            idList.push(item.id)
                        })
                        this.serveOption.deleteMultipleDocument(idList).then((res) => {
                            that.tableDataTotal.splice(0, that.tableDataTotal.length);
                            that.getTablePageData(that.currentPage)
                            that._getFoldersList()
                        })
                    }
                })
            },
            // getFile
            getFileObj() {
                let files = this[`uploader${this.randomNum}`].getFiles()
            },
            // 获取上传成功的文件
            getUploadFiles() {
                return this.uploadFileList
            },
            // 获取类型
            getAccept(accept) {
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
            // 文件发送之前执行,整个文件发送之前
            _beforeSendFileHook(file) {
                let deferred = WebUploader.Deferred()
                this.$emit('before-send-file', file, deferred)
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
                        if (isExist) {
                            return deferred.resolved()
                        }
                    })
                return deferred.promise()
            },
            // 在文件所有分片都上传完后，且服务端没有错误返回后执行
            async _afterSendFileHook(file) {
                let deferred = WebUploader.Deferred()
                let item = file.item
                let fileModel = item.model
                let mergeData = {
                    uploadId: fileModel.uploadId,
                    documentId: fileModel.documentId,
                    isMain: true,
                    id: fileModel.id,
                    name: fileModel.name,
                    extName: file.ext,
                    previewUrl: file.previewUrl,
                    folderId: fileModel.folderId,
                    size: file.size
                }
                await this.serveOption.uploadFileMerge(mergeData).then((res) => {
                    if (res) {
                        item.percentage = 100
                        this.$emit(EVENT_SUCCESS, res)
                        file.WUFileId = file.id
                        file.url = res.downloadUrl
                        // 上传成功后赋值url路径
                        for (let i = 0; i < this.tableDataTotal.length; i++) {
                            if (this.tableDataTotal[i].id === file.WUFileId && this.tableDataTotal[i].url === '') {
                                this.tableDataTotal[i].url = file.url
                                break
                            }
                        }
                        let uploadFile = Object.assign(file, res)
                        this.uploadFileList.push(uploadFile)
                    }
                })
                return deferred.promise()
            },
            // 是否支持webuploader
            _isSupport() {
                if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {
                    // flash 安装了但是版本过低。
                    if (this._flashVersion()) {
                        (function (container) {
                            window['expressinstallcallback'] = function (state) {
                                switch (state) {
                                    case 'Download.Cancelled':
                                        alert('您取消了更新！')
                                        break
                                    case 'Download.Failed':
                                        alert('安装失败')
                                        break
                                    default:
                                        alert('安装已成功，请刷新！')
                                        break
                                }
                                delete window['expressinstallcallback']
                            }

                            const swf = '.lib//expressInstall.swf'
                            // insert flash object
                            let html = '<object type="application/' +
                                'x-shockwave-flash" data="' + swf + '" '

                            if (WebUploader.browser.ie) {
                                html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
                            }

                            html += 'width="100%" height="100%" style="outline:0">' +
                                '<param name="movie" value="' + swf + '" />' +
                                '<param name="wmode" value="transparent" />' +
                                '<param name="allowscriptaccess" value="always" />' +
                                '</object>'

                            container.html(html)
                        })(this.$wrap)
                    } else {
                        this.$wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>')
                    }
                    return true
                } else if (!WebUploader.Uploader.support()) {
                    alert('Web Uploader 不支持您的浏览器！')
                    return false
                }
            },
            // 浏览器是否支持
            _flashVersion() {
                let version
                try {
                    version = navigator.plugins['Shockwave Flash']
                    version = version.description
                } catch (ex) {
                    try {
                        /* eslint-disable */
                        version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                            .GetVariable('$version')
                    } catch (ex2) {
                        version = '0.0'
                    }
                }
                version = version.match(/\d+/g)
                return parseFloat(version[0] + '.' + version[1], 10)
            },
            // 是否支持 transition
            _supportTransition() {
                let s = document.createElement('p').style
                let r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s
                s = null
                return r
            },
            // 是否支持base64
            _isSupportBase64() {
                let data = new Image()
                let support = true
                data.onload = data.onerror = function () {
                    if (this.width !== 1 || this.height !== 1) {
                        support = false
                    }
                }
                data.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
                return support
            },
            // 获取目录
            _getFolders() {
                this.serveOption.getFolders().then((res) => {
                    console.log(res)
                })
            },
            //获取文件夹列表 ，如果folderId存在，则查询；不存在的话，创建；
            _getFoldersList() {
                let id = this.serveOption.folderId;
                this.serveOption.getFoldersList(id).then((res) => {
                    //let currentIdIndex = res.findIndex(item => item.id == this.serveOption.folderId);
                    if (res.length) {
                        this._uploadGetContent()
                    } else {
                        this._newSubFolders();
                    }
                })
            },
            // 创建目录
            _newSubFolders() {
                let parentId, name = '';
                if (this.serveOption.parentId != undefined && this.serveOption.parentId != null) {
                    parentId = this.serveOption.parentId
                } else {
                    parentId = 'e0001'
                }

                if (this.serveOption.name != undefined && this.serveOption.name != null) {
                    name = this.serveOption.name
                } else {
                    name = parentId
                }

                let data = {
                    id: this.serveOption.folderId,
                    name: name,
                    parentId: parentId,
                    rootId: 'e0001',//rootId: e0001  name:ematrix
                    systemId: this.serveOption.systemId
                }
                this.serveOption.newSubFolders(data).then((res) => {
                    console.log(res)
                })
            },
            // 获取文件目录
            _uploadGetContent() {
                let that = this;
                if (this.$refs.table) {
                    this.$refs.table.loading = true
                }
                const data = {
                    folderId: that.serveOption.folderId,
                    systemId: that.serveOption.systemId,
                    offset: 1,
                    limit: 100
                }
                //that._getFoldersList()
                that.serveOption.uploadGetContent(data).then((res) => {
                    if (this.$refs.table) {
                        this.$refs.table.loading = false
                    }
                    /*if(that.isOneFile){
                        this._getFileListFirst(res.documents)
                    } else {*/
                        res.documents.forEach((item) => {
                            this._getFileListFirst(item)
                            this._addFileButton(item.id);
                        })
                   // }

                })
            },
            //按id逻辑删除实体
            _deleteFilesId(id) {
                console.log('id==========' + id)
                this.serveOption.deleteFilesId(id).then((res) => {
                    console.log(res)
                })
            },
            //删除单文档
            _deleteDocument(id) {
                this.serveOption.deleteDocument(id).then((res) => {
                    console.log('删除成功' + res)
                })
            },
            //
            _deleteMultipleDocument(id) {

            },
            _getFileListFirst(file) {
                if (this.tableLayout) { // 列表形态
                    const {id, name, size} = file
                    let fileSize = size
                    if (fileSize < 1024 * 1000) {
                        fileSize = `${(size / 1024).toFixed(2)}KB`
                    } else {
                        fileSize = `${(size / 1024 / 1000).toFixed(2)}MB`
                    }
                    this.tableDataTotal.push({
                        id: file.id,
                        No: this.tableDataTotal.length + 1,
                        control: 1,
                        name,
                        size: fileSize,
                        remark: '',
                        url: file.fileUrl,
                        progress: 1,
                        previewImage: file.previewImage,
                        extName: file.extName,
                        mainFileId: file.mainFileId
                    });
                    this.getTablePageData(this.currentPage)

                } else { // 拖拽形态
                    this.fileCount++
                    this.fileSize += file.size
                    if (this.fileCount === 1) {
                        this.$placeHolder.addClass('element-invisible')
                        this.$statusBar.show()
                    }
                    // 将查询到的数据状态置成已完成
                    let oldFile = new WebUploader.File(file);
                    this.addFile(oldFile)
                    this.setState('ready')
                    this.updateTotalProgress()
                }
            },
            //updateFile
            _updateFile(file) {
                this.serveOption.updateFile(file).then((res) => {
                    console.log(res)
                })
            },
            _addFileButton(id) {
                this.$nextTick(() => {
                    this[`uploader${this.randomNum}`].addButton({
                        id: `#uploadFile${id}`,
                        innerHTML: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>',
                        multiple: false
                    })
                })
            },
            // 显示文件详情
            showFileDetail(item) {
                this.showBigImage = ''
                this.showAudio = {}
                this.showVideo = {}

                this.fileDetail.header = item.name
                let officeMap = officeExtName
                let extName = item.extName.toLowerCase()

                let fileType = officeMap.find(c => c == extName);
                let imgType = imgExtName.find(c => c == extName);

                if (fileType) {
                    this.fileDetail.url = this.serveOption.officeOnlineUrl + item.previewImage
                    window.open(this.fileDetail.url)
                } else if (imgType) {
                    this.showImageModal = true;
                    this.showBigImage = Setting.apiBaseURL + '/docservice' + item.url
                } else {
                    this.$refs.modal.warning('您选择的文件类型暂时不支持预览！')
                }
            },
            //
            ok() {

            },
            //
            onSelect(selection, row) {
                console.log('selection======' + selection)
                console.log('row============' + row)
                this.tableCheckBox = selection
            },
            onSelectCancel(selection) {
                console.log('cannel selection======' + selection)
                console.log('cannle row============' + row)
                this.tableCheckBox = selection
            },
            onSelectAll(status) {
                console.log(status)
                this.tableCheckBox = status
            },
            onSelectAllCancel(status) {
                console.log(status)
                this.tableCheckBox = status
            },
            onSelectionChange(status) {
                console.log('改变时触发=====' + status)
                this.tableCheckBox = status
            }
        }
    }
</script>
<style lang="less">
    .uploader-wrapper {
        > div, > button {
            display: inline-block;
            float: left;
        }

        .upload-table {
            .ivu-table-cell {
                height: auto;
            }

            .uploadBtn, .deleteBtn, .downloadBtn {
                display: inline-block;
                height: 32px;
                line-height: 32px;
                margin: 0 0 0 10px;
                padding: 0 15px;
                background: #0086e2;
                border-color: #0077c8;
                font-size: 14px;
                box-sizing: content-box;
                position: relative;
                cursor: pointer;
                color: #fff;
                text-align: center;
                border-radius: 3px;
                overflow: hidden;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            }

            .uploadBtn {
                margin-left: 0;
                margin-right: 6px;
            }

            .progress-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;

                .progress {
                    position: relative;
                    display: inline-block;
                    border: 1px solid #1483d8;
                    height: 14px;
                    line-height: 14px;
                    font-size: 12px;
                    width: 100%;
                    background: #fff;
                    border-radius: 4px;

                    .progress-text {
                        position: relative;
                        z-index: 10;
                        color: #fff !important;
                    }

                    .progress-inner {
                        display: inline-block;
                        height: 14px;
                        width: 0;
                        left: 0;
                        top: -1px;
                        background: #1483d8;
                        position: absolute;
                        border-radius: 4px;
                    }
                }
            }
        }

        .table-file-picker {
            display: inline-block;
            height: 32px;

            .webuploader-pick {
                height: 32px;
                line-height: 32px;
                margin: 0;
                padding: 0 15px;
                background-color: #0086e2;
                border-color: #0077c8;
                font-size: 14px;
                margin-right: 6px;
            }
        }

        .uploader {
            margin-top: 10px;
            border: 1px solid #dadada;
            color: #838383;
            font-size: 12px;
            background-color: #FFF;
        }

        .queueList {
            margin: 20px;

            .placeholder {
                position: relative;
                box-sizing: content-box;
                padding-top: 53px;
                min-height: 110px;
                text-align: center;
                border: 3px dashed #e6e6e6;
                /*background: url(lib/imags/image.png) center 93px no-repeat;*/
                color: #cccccc;
                font-size: 18px;
            }

            div.file-panel {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                background: rgba(0, 0, 0, 0.5);
                overflow: hidden;
                z-index: 300;

                .file-panel-item {
                    float: right;
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    color: #fff;
                    font-size: 16px;
                    /*text-indent: -9999px;
                    overflow: hidden;*/
                    background: none;
                    cursor: pointer;

                    /*&.cancel {
                        background-position: -48px -24px;
                    }

                    &.rotateRight {
                        background-position: -24px -24px;
                    }

                    &.rotateLeft {
                        background-position: 0 -24px;
                    }*/
                }

            }

            .filelist {
                max-height: 130px;
                overflow-x: hidden;
                overflow-y: auto;

                li.file-item {
                    position: relative;
                    display: inline;
                    float: left;
                    margin: 0 8px 8px 0;
                    width: 110px;
                    height: 110px;
                    background: url(lib/imags/bg.png) no-repeat;
                    text-align: center;
                    overflow: hidden;
                    font-size: 12px;
                }

                p.title {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    top: 5px;
                    text-indent: 5px;
                    text-align: left;
                }

                p.imgWrap {
                    position: relative;
                    z-index: 2;
                    line-height: 110px;
                    vertical-align: middle;
                    overflow: hidden;
                    width: 110px;
                    height: 110px;
                    transform-origin: 50% 50%;
                    transition: 200ms ease-out;
                }

                p.error {
                    background: #f43838;
                    color: #fff;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 28px;
                    line-height: 28px;
                    width: 100%;
                    z-index: 100;
                }

                p.progress {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    height: 8px;
                    overflow: hidden;
                    z-index: 50;

                    span {
                        display: none;
                        overflow: hidden;
                        width: 0;
                        height: 100%;
                        background: #1483d8 url(lib/imags/progress.png) repeat-x;
                        transition: width 200ms linear;
                        -webkit-transform: translateZ(0);
                    }
                }

                span.upload-state-done {
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 40px;
                    width: 100%;
                    z-index: 2;
                    background: url(lib/imags/success.png) no-repeat right bottom;
                }
            }
        }

        .statusBar {
            height: 63px;
            border-top: 1px solid #dadada;
            padding: 0 20px;
            line-height: 63px;
            vertical-align: middle;
            position: relative;

            .progress {
                border: 1px solid #1483d8;
                width: 198px;
                background: #fff;
                height: 19px;
                position: relative;
                display: inline-block;
                text-align: center;
                line-height: 20px;
                color: #6dbfff;
                margin-right: 10px;

                .text {
                    position: relative;
                    z-index: 10;
                }

                .percentage {
                    width: 0;
                    height: 100%;
                    left: -1px;
                    top: 0;
                    background: #1483d8;
                    position: absolute;
                }
            }

            .info {
                display: inline-block;
                font-size: 14px;
                color: #666666;
            }

            .btns {
                position: absolute;
                top: 10px;
                right: 20px;
                line-height: 40px;

                .uploadBtn, .webuploader-pick {
                    display: inline-block;
                    float: left;
                    padding: 0 18px;
                    margin: 0 0 0 10px;
                    background: #ffffff;
                    border: 1px solid #cfcfcf;
                    color: #565656;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 40px;
                }

                .file-picker2 {
                    display: inline-block;
                    float: left;
                }

                .uploadBtn {
                    background: #00b7ee;
                    color: #fff;
                    border-color: transparent;
                }
            }
        }



        .element-invisible {
            position: absolute !important;
            clip: rect(1px 1px 1px 1px);
            clip: rect(1px, 1px, 1px, 1px);
            top:0;
            left:0;
            z-index: 100;
        }

        .webuploader-pick {
            box-sizing: content-box;
            position: relative;
            display: inline-block;
            cursor: pointer;
            background: #00b7ee;
            color: #fff;
            text-align: center;
            border-radius: 3px;
            overflow: hidden;
            font-size: 18px;
            line-height: 44px;
            padding: 0 30px;
            margin: 20px auto;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        }

        .webuploader-element-invisible {
            position: absolute !important;
            clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
            clip: rect(1px, 1px, 1px, 1px);
        }

        .webuploader-pick-hover {
            background: #00a2d4;
        }

        .webuploader-pick-disable {
            opacity: 0.6;
            pointer-events: none;
        }

        .uploader-table-toolbar {
            display: inline-block;
            float: left;
            height: 32px;

            > div, > button {
                display: inline-block;
                float: left;
            }
        }
        .oneQueueList { // 单文件
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
            .filelist{
                height: 110px;
                overflow: hidden;
            }
            .placeholder {
                width: 100%;
                height: 100%;
                padding: 0;
                min-height: auto;
                position: absolute;
                top:0;
                left:0;
                div {
                    width: 100%;
                    height: 100%;
                }
            }
            .webuploader-pick {
                color: #e6e6e6;
                font-size: 80px;
                box-shadow: none;
                background: none;
                margin: 0;
                padding: 0;
                line-height: 100%;
            }
            .file-panel{
                .webuploader-pick {
                    margin: 0 5px 0 0;
                    background: transparent;
                    border-color: transparent;
                    color: #fff;
                    height: 24px;
                    line-height: 24px;
                    box-shadow: none;
                    padding: 0;
                    font-size: 16px;
                    float: right;
                }
            }
        }
    }

    .bingoFileIcon {
        margin-right: 5px;
    }

    .tableUpdateBtn {
        display: inline-block;

        .webuploader-pick {
            margin: -2px 0 0 0;
            background: transparent;
            border-color: transparent;
            color: #0077c8;
            height: 22px;
            line-height: 22px;
            font-size: 22px;
            box-shadow: none;
            padding: 0;
        }
    }

    td > div.ivu-table-cell > div > a {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        padding: 5px 10px 0 10px;
        overflow: hidden;
        i{
            font-size: 22px;
        }
    }
    td > div.ivu-table-cell > div > a.webuploader-container{
        .webuploader-pick{
            padding:0;
            margin:0;
            line-height: 22px;
            color: #0077c8;
            background:transparent;
        }
    }


    .ivu-table {
        td {
            .progressOver {
                margin: 0 -18px;
                height: 36px;
                position: relative;
                a {
                    display: block;
                    height: 36px;
                    line-height: 36px;
                    padding: 0 18px;
                }
                .progress {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;

                    span {
                        display: block;
                        overflow: hidden;
                        width: 0;
                        height: 100%;
                        background: rgba(132, 189, 0, 0.15);
                        transition: width 200ms linear;
                        -webkit-transform: translateZ(0);
                    }
                }
            }
            .upload-state-done {
                .progress:before {
                    font-family: "Ionicons";
                    content: "\F375";
                    font-size: 22px;
                    position: absolute;
                    right: 10px;
                    top: 0;
                    color: #84bd00;
                }
            }
        }
    }


    .file-detail {
        height: 100%;

        iframe {
            height: 100%;
        }
    }
</style>
