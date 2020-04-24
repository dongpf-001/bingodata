<!-- 父子级目录以'-'相连，第一级子目录必须是模块名称，比如tpb,organization
     bmsa-ui-001
     organization-department-001
     planCenter-statics-doc
-->
<template>
    <div class="uploader-wrapper" :class="{'showNumUploader': showNum}" :style="{width: width}">
        <div :id="`uploader${randomNum}`" class="cardList" v-if="!tableLayout">
            <div class="queueList" :style="{height: listHeight +'px'}">
                <Spin fix v-if="spinShow"></Spin>
                <ul class="filelist" v-show="!spinShow">
                    <li class="placeholder" v-show="authUpload && isShowUploadBtn">
                        <Button :id="`listFilePicker${randomNum}`"></Button>
                    </li>
                    <li class="file-item" v-for="(item, key) in listUploadFile" :key="key" :id="item.documentId+randomNum" @mouseover="onLiMouseOver($event, item)" @mouseout="onLiMouseOut($event)">
                        <img :src="item.previewImage" v-if="item.isImage" />
                        <bingo-file-icon v-if="!item.isImage" :type="item.extName" width="60px" height="60px"></bingo-file-icon>
                        <p class="text">{{item.name}}</p>
                        <div class="btn-group updown">
                            <Button type="text" v-if="authSee" @click="showFileDetail(item)" icon="ios-eye"><span>查看</span></Button>
                            <Button type="text" v-if="authDelete" @click="removeDocument(item)" icon="md-trash"><span>删除</span></Button>
                            <a :href="item.download" :download="item.name"><Icon type="md-cloud-download" /><span>下载</span></a>
                            <Button type="text" v-if="authUpload" class="uploadBtn" @click="uploadOneBtnClick(item)" icon="md-cloud-upload"><span>上传</span></Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div :id="`uploader${randomNum}`" class="tableList" v-if="tableLayout">
            <div >
                <bingo-table :data="tableData" :columns="columns" :height=height :draggable="false"
                            :toolbar="true" :layoutShow = "false" :pageSetting="model.pageSetting" :showOpenButton="showOpenButton"
                       @on-select="onSelect" :showDelete="false" :showNew="false" :showRefresh="false" ref="table"
                       @on-select-all="onSelectAll" no-data-text=""
                       @on-select-all-cancel="onSelectAllCancel"
                       @on-select-cancel="onSelectCancel"
                       @on-selection-change="onSelectionChange"
                       @on-drag-drop="onDragDrop">
                    <template slot-scope="{ row }" slot="name">
                        <div class="image">
                            <img :src="row.previewImage" v-if="row.isImage" />
                            <bingo-file-icon v-if="!row.isImage" :type="row.extName" width="30px" height="30px"></bingo-file-icon>
                        </div>
                        <p class="passOver" :id="row.id">{{row.name}}</p>
                    </template>
                    <template slot-scope="{row}" slot="modifyTime">
                        <Time :time="row.modifyTime" v-if="row.modifyTime" />
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Tooltip content="上传">
                        <Button type="text" v-if="authUpload" class="actionBtn uploadBtn" :id="`uploadBtn${row.documentId}`" @click="uploadOneBtnClick(row)" icon="md-cloud-upload"><span>上传</span></Button>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip content="下载">
                        <a :href="row.download" :download="row.name" class="actionBtn"><Icon type="md-cloud-download" /><span>下载</span></a>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip content="删除">
                        <Button type="text" v-if="authDelete" class="actionBtn" @click="removeDocument(row)" icon="md-trash"><span>删除</span></Button>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip content="查看">
                        <Button type="text" v-if="authSee" class="actionBtn" @click="showFileDetail(row)" icon="ios-eye"><span>查看</span></Button>
                        </Tooltip>
                    </template>
                    <span class="uploader-table-toolbar" name="toolbar">
                        <div :id="`tableFilePicker${randomNum}`" class="table-file-picker ivu-btn ivu-btn-primary" v-if="authUpload"></div>
                        <div @click="uploadBtnClick" class="uploadBtn" v-show="tableUploadBtnFlag && !autoUpload">{{tableUploadBtn}}</div>
                        <Button @click="refreshTable" icon='md-refresh' type='primary'>{{$t('page.common.refresh')}}</Button>
                        <Button @click="deleteMultipleDocument()" icon='md-trash' type='primary' v-if="authDelete">{{$t('page.common.delete')}}</Button>
                        <Button @click="batchDownFiles()" icon='md-cloud-download' type='primary' v-if="authDown">{{$t('page.common.download')}}</Button>
                    </span>
                </bingo-table>
            </div>
        </div>
        <Modal footer-hide v-model="showImageModal">
            <img :src="showBigImage" style="width: 100%">
        </Modal>
        <bingo-alert ref="alert" :modalMsg="modalMsg1" @on-ok="ok"></bingo-alert>
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
    import bingoAlert from '@/components-api/bingo-alert/index.vue';
    //import bingoMessage from '@/components-api/bingo-message'
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
            bingoTable, Api, backUploader, bingoFileIcon, bingoModal, bingoAlert
        },
        props: {
            serveOption: {
                type: Object,
                required: true
            },
            autoUpload: { // 是否自动上传
                type: Boolean,
                default: true
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
            showOpenButton:{
                type: Boolean,
                default: true
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
                default: ()=>{}
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
            //控制显示数量，默认全部显示
            showNum: {
                type: Number,
                default: 0
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
            },
            //列表形态显示几行出滚动条，默认显示一行
            row: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                token: token,
                spinShow: true,
                listHeight : this.row * 120,
                apiBaseURL:Setting.apiBaseURL,
                uploadFileList: [],
                uploader: null,
                cls:'',
                label:'',
                layout: '',
                width: '100%',
                isShowUploadBtn: true,
                randomNum: Math.floor(Math.random() * 1000000),
                currentPage: 1,
                tableUploadBtnFlag: false,
                tableUploadBtn: '开始上传',
                deleteBtn: '删除',
                downloadBtn: '下载',
                tableData: [],
                tableDataTotal: [],
                oldUploadData: {}, // 单文件上传的数据
                oldIndex:0,
                tableCheckBox: [],
                uploading: true,
                listUploadFile:[],
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
                        size: 'large',
                        align: 'center'
                    },
                    {
                        type: 'selection',
                        width: 55,
                    },
                    {
                        title: '名称',
                        align: 'left',
                        slot: 'name',
                        resizable: true,
                    },
                    {
                        title: '修改日期',
                        slot: 'modifyTime',
                        width: 120
                    },
                    {
                        title: '文件大小',
                        key: 'size',
                        width: 130
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 180,
                    }
                ],
                showImageModal: false,
                showBigImage: '',
                oldFile:'',//单文件上传时要删除的文件
                deleteDocumetId:'', //要删除的文档保存在这里
                folderList: [],
                checkAll: false,
                checkAllGroup: [],
                checkFileParams: [],
                checkFoladParams: [],
                checkFileData:[],
                checkFolderData:[],
                isMultiple:false
            }
        },
        watch: {
            tableDataTotal(val) {
                this.tableUploadBtnFlag = !!val.length
            },
            authDown: function (val, old) {
            },
            authUpload:{
                handler(newV,oldV) {
                    //console.log(newV,oldV)
                },
                deep:true
            },
            authRename: function (val, old) {
            },
            authDelete:{
                handler(newV,oldV) {
                    //console.log(newV,oldV)
                },
                deep:true
            },
            authSee: function (val, old) {
            }
        },
        computed: {
            model: function () {
                return {
                    toolbar: true,
                    border: true,
                    page: false,
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
                    cls: `#listFilePicker${this.randomNum}`,
                    label: '+'
                }
                let tablePicker = {
                    cls: `#tableFilePicker${this.randomNum}`,
                    //innerHTML:'<button type="button" class="ivu-btn ivu-btn-primary"></button>',
                    label: '选择文件'
                }
                return this.tableLayout ? tablePicker : ListPicker
            },
            // 列表没有文件提示
            noDataMsg() {
                return this.folderDetail.parentId === rootFolderId ? rootNoDataTxt : noDataTxt
            },
            // 全选按钮-禁止
            checkDisabled() {
                return !this.fileList.length && !this.folderList.length
            },
            // 文件数量
            checkFileCount() {
                let count = 0
                this.checkAllGroup.forEach((item) => {
                    //if (item.split('.')[0] === 'file') count += 1
                    if (item.typeId === 'file') count += 1
                })
                return count ? `${count} 个文件` : ''
            },
            // 文件夹数量
            checkFolderCount() {
                let count = 0
                this.checkAllGroup.forEach((item) => {
                    //if (item.split('.')[0] === 'folder') count += 1
                    if (item.typeId === 'folder') count += 1
                })
                return count ? `${count} 个文件夹` : ''
            },
        },
        mounted() {
            if(this.showNum){
                if(!this.tableLayout){
                    this.width = this.showNum * 130 + 15 + 'px'
                }
            }
            this.init()
            this.initServeOption()
            this.register()
            this.initWebUploader()
            this._getFoldersList()
        },
        methods: {
            // 初始化dom
            init() {
                // 容器
                this.$wrap = $(`#uploader${this.randomNum}`)
                // 图片容器
                //this.$queue = $('<ul class="filelist"></ul>').appendTo(this.$wrap.find('.queueList'))
                // 状态栏，包括进度和控制按钮
                //this.$statusBar = this.$wrap.find('.statusBar')
                // 文件总体选择信息。
                //this.$info = this.$statusBar.find('.info')
                // 上传按钮
                //this.$uploadBtn = this.$wrap.find('.uploadBtn')
                // 批量删除按钮
                //this.$deleteBtn = this.$wrap.find('.deleteBtn')
                // 批量下载按钮
                //this.$downloadBtn = this.$wrap.find('.downloadBtn')
                // 状态栏，包括进度和控制按钮
                //this.$placeHolder = this.$wrap.find('.placeholder')
                // 进度条
                //this.$progress = this.$statusBar.find('.progress').hide()
                // 添加的文件数量
                this.fileCount = 0
                // 添加的文件总大小
                this.fileSize = 0
                // 进度条
                this.percentages = {}
                // 可能有pedding, ready, uploading, confirm, done.
                this.state = 'pedding'
                // 设置拖拽
                /*if (!this.tableLayout) {
                    this.uploaderPaste = `#uploader${this.randomNum}`
                    this.uploaderDnd = `#uploader${this.randomNum} .queueList`
                } else {
                    this.uploaderPaste = ''
                    this.uploaderDnd = ''
                }*/
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
                    //fileNumLimit: this.fileNumLimit,
                    // 限制单个上传图片的大小
                    fileSingleSizeLimit: this.fileSingleSizeLimit * 1024 * 1000,
                    // 上传所需参数
                    formData: this.formData,
                    // 分片上传
                    chunked: true,
                    // 分片大小, 默认大小为5M
                    chunkSize: 5242880,
                    // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
                    duplicate: true, //允许上传相同文件
                    //头部信息携带token
                    headers: {
                        'Authorization': util.cookies.get('token')
                    }
                })

                // 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证
                this[`uploader${this.randomNum}`].on('dndAccept', this.onDndAccept)

                //当文件被加入队列之前触发
                this[`uploader${this.randomNum}`].on('beforeFileQueued', this.onBeforeFileQueued)

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
                /*if (this.$uploadBtn.hasClass('disabled')) {
                    return false
                }*/
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
                if (this.page) {
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
                    /*if (this.tableLayout) {
                        this.removeTableOldFile(this.tableUploadData) // 将源文件删除
                        this.tableUploadData = {}
                    } else {

                    }*/
                    this.uploadFlag = false
                }
                this.file = file
                this.keyGenerator(file)
            },
            // 上传过程中触发，携带上传进度。
            onUploadProgress(file, percentage) {
                var $li = ''
                if (this.oldUploadData.id) {
                    $li = $( '#'+this.oldUploadData.documentId+this.randomNum )
                } else {
                    $li = $('#'+file.id+this.randomNum)
                }
                var $percent = $li.find('.progress .progress-bar');
                // 避免重复创建
                if ( !$percent.length ) {
                    $percent = $('<div class="progress">' +
                        '<div class="progress-bar" role="progressbar" style="width: 0%">' +  //<i class="ivu-icon ivu-icon-ios-checkmark-circle"></i>
                        '</div><div class="per">0%</div>' +
                        '</div>').appendTo( $li ).find('.progress-bar');
                }
                $li.siblings('.file-status').text('上传中...');
                $li.find('.per').text((percentage * 100).toFixed(2) + '%');
                $percent.css( 'width', percentage * 100 + '%' );
            },
            // 当文件上传出错时触发
            onUploadError(file) {
                this.$emit(EVENT_UPLOAD_ERROR, file)
            },
            // 当validate不通过时，会以派送错误事件的形式通知调用者
            onError(type) {
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
                this.$BMessage.warning(errorMessage)
            },
            // 当文件上传成功时触发
            onUploadSuccess(file, res) {
                if (res._raw === '分片上传完成') {
                    this.$emit('success', file)
                }
            },
            // 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证
            // 不管成功或者失败，文件上传完成时触发
            onUploadComplete(file) {
                let $li = '';
                if (this.oldUploadData.id) {
                    $li = $( '#'+this.oldUploadData.documentId+this.randomNum )
                } else {
                    $li = $('#'+file.id+this.randomNum)
                }
                $li.find('.progress').remove();
                this.oldUploadData = {}
                this.isShowUploadListBtn();
                this.$emit('complete', file)
            },
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
            //文件添加到队列之前
            onBeforeFileQueued(file){
                let that = this;
                let name = file.name.substring(0, file.name.lastIndexOf('.'))
                if (file.size && name.length < 100){
                    return true
                } else {
                    if(name.length >= 100){
                        this.$BMessage.warning('您上传的文件名称过长，请不要超过100个字符！')
                    }
                    if(file.size == 0){
                        this.$BMessage.warning('您上传一个文件大小为0字节的文件，请重新上传！')
                    }
                    return false
                }
            },
            // 文件添加到队列
            onFileQueued(file) {
                let that = this;
                let fileSize = this.formatSize(file.size);
                if(that.oldUploadData.id){
                    file.documentId = that.oldUploadData.documentId;
                } else {
                    file.documentId = ''
                }
                if (this.tableLayout) {
                    this[`uploader${this.randomNum}`].makeThumb(file, (error, src) => {
                        let isImage = false
                        if (error) {
                            file.extName = file.ext
                            file.isImage = false
                            let option = {
                                id: file.id,
                                name:file.name,
                                progress: 0,
                                size: fileSize,
                                remark: '',
                                url: file.fileUrl,
                                previewImage: file.previewImage,
                                extName: file.ext,
                                percent:0,
                                isImage: file.isImage,
                                mainFileId: file.mainFileId,
                                documentId: file.documentId
                            }
                            this.addOneTableFile(option)
                            return
                        }
                        file.previewUrl = src
                        file.previewImage = src
                        file.isImage = true
                        file.percent = 0
                        file.extName = file.ext
                        file.edit = false

                        let option = {
                            id: file.id,
                            No: this.tableDataTotal.length + 1,
                            control: 1,
                            name:file.name,
                            progress: 0,
                            size: fileSize,
                            remark: '',
                            url: file.fileUrl,
                            previewImage: file.previewImage,
                            extName: file.ext,
                            percent:0,
                            isImage: file.isImage,
                            mainFileId: file.mainFileId,
                            documentId: file.documentId
                        }
                        this.addOneTableFile(option)
                    }, 100, 100)
                } else {
                    this.addFile(file)
                }
            },
            // 文件从队列删除
            onFileDequeued(file) {
                if (!this.tableLayout) {
                    /*this.fileCount--
                    this.fileSize -= file.size
                    if (!this.fileCount) {
                        this.setState('pedding')
                    }*/

                }
                this.viewRemoveFile(file)
                this.updateTotalProgress()
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
                a.href = this.FileUrl(item.url)// 设置下载地址
                a.download = item.name // 设置下载文件名
                a.dispatchEvent(e) // 给指定的元素，执行事件click事件
            },
            //批量下载
            batchDownFiles() {
                if(this.tableCheckBox.length == 0){
                    this.$BMessage.warning('请选择文件，再进行下载！')
                } else {
                    this.tableCheckBox.forEach(item => {
                        this.downFile(item)
                    })
                }
            },
            formatSize(size) {
                let fileSize = ''
                if (size < 1024 * 1000) {
                    fileSize = `${(size / 1024).toFixed(2)}KB`
                } else {
                    fileSize = `${(size / 1024 / 1000).toFixed(2)}MB`
                }
                return fileSize
            },
            // 添加文件
            addFile(file) {
                let that = this;
                // 优化retina, 在retina下这个值是2
                let ratio = window.devicePixelRatio || 1
                // 缩略图大小
                let thumbnailWidth = 100
                let thumbnailHeight = 100
                this[`uploader${this.randomNum}`].makeThumb(file, (error, src) => {
                    if (error) {
                        file.extName = file.ext
                        file.isImage = false
                        file.percent = 0
                        file.download = file.previewImag
                        that.addOneListFile(file)
                        return
                    }
                    file.previewUrl = src
                    file.previewImage = src
                    file.isImage = true
                    file.percent = 0
                    file.extName = file.ext
                    file.download = file.previewImage
                    that.addOneListFile(file)
                }, thumbnailWidth, thumbnailHeight)
                this.isShowUploadListBtn()

            },
            // 单文件上传
            addOneTableFile(option){
                let that = this
                if (that.oldUploadData.id) {
                    let selectId = '';
                    this.tableDataTotal.forEach(function (item, index) {
                        if(item.documentId == that.oldUploadData.documentId) {
                            selectId = index;
                            return
                        }
                    })
                    option.modifyTime = that.timeModify()
                    that.oldIndex = selectId
                    that.tableDataTotal.splice(selectId, 1, option)
                    that.oldUploadData={}
                } else {
                    option.createTime = option.modifyTime = (new Date()).getTime()
                    that.tableDataTotal.unshift(option)
                }
                this.tableData = this.tableDataTotal
            },
            addOneListFile(option){
                let that = this
                if (that.oldUploadData.id) {
                    let selectId = '';
                    this.listUploadFile.forEach(function (item, index) {
                        if(item.documentId == that.oldUploadData.documentId) {
                            selectId = index;
                            return
                        }
                    })
                    option.modifyTime = that.timeModify()
                    that.oldIndex = selectId
                    that.listUploadFile.splice(selectId, 1, option)
                } else {
                    option.createTime = option.modifyTime = that.timeModify()
                    that.listUploadFile.unshift(option)
                }
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
                    //this.$uploadBtn.removeClass('state-' + this.state)
                    //this.$uploadBtn.addClass('state-' + val)
                    switch (this.state) {
                        case 'pedding':
                            //this.$placeHolder.removeClass('element-invisible')
                            //this.$queue.hide()
                            //this.$statusBar.addClass('element-invisible')
                            //this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'ready':
                            //this.$placeHolder.addClass('element-invisible')
                            //this.$filePicker2.removeClass('element-invisible')
                            //this.$queue.show()
                            //this.$statusBar.removeClass('element-invisible')
                            this[`uploader${this.randomNum}`].refresh()
                            break
                        case 'uploading':
                            //this.$filePicker2.addClass('element-invisible')
                            //this.$progress.show()
                            //this.$uploadBtn.text('暂停上传')

                            break
                        case 'paused':
                            //this.$progress.show()
                            //this.$uploadBtn.text('继续上传')
                            break
                        case 'confirm':
                            //this.$progress.hide()
                            //this.$filePicker2.removeClass('element-invisible')
                            //this.$uploadBtn.text('开始上传')
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
                console.log('upload-----------' + this.tableLayout)
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
                    //this.uploading = true;
                    this.$refs.table.loading= true
                    this.tableDataTotal = [];
                    this.tableCheckBox = [];
                    this.tableData = [];
                    this._getFoldersList()
                }
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
                            title: 'Images',
                            exteensions: 'gif,jpg,jpeg,bmp,png',
                            mimeTypes: 'image/*'
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
                    name: file.name,
                    documentId: this.oldUploadData.documentId
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
                let documentId = this.oldUploadData.id
                let isExist = false
                let chunkData = {
                    uploadId: uploadId,
                    chunkNumber: chunkNumber,
                    documentId:documentId
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
                let that = this;
                let deferred = WebUploader.Deferred()
                let item = file.item
                let fileModel = item.model
                if(that.oldUploadData.id){
                    file.documentId = that.oldUploadData.documentId;
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
                    previewUrl: file.previewUrl,
                    folderId: fileModel.folderId,
                    size: file.size
                }

                await this.serveOption.uploadFileMerge(mergeData).then((res) => {
                    if (res) {
                        item.percentage = 100
                        this.$emit(EVENT_SUCCESS, res)
                        //file.WUFileId = file.id
                        //file.download = that.FileUrl(res.downloadUrl)
                        if (that.tableLayout) {
                            //let index = this.tableDataTotal.findIndex(el => el.id === file.id)
                            //this.tableDataTotal.splice(index, 1)
                            if(that.oldUploadData.id){
                                that.tableDataTotal[that.oldIndex].id = res.documentId;
                                that.tableDataTotal[that.oldIndex].documentId = res.documentId;
                                that.tableDataTotal[that.oldIndex].download = file.download;
                                that.tableDataTotal[that.oldIndex].fileUrl = res.downloadUrl;
                                that.tableDataTotal[that.oldIndex].previewImage = res.previewUrl;
                            } else {
                                let index = that.tableDataTotal.findIndex(el => el.id === file.id)
                                that.tableDataTotal[index].id = res.documentId;
                                that.tableDataTotal[index].documentId = res.documentId;
                                that.tableDataTotal[index].download = file.download;
                                that.tableDataTotal[index].fileUrl = res.downloadUrl;
                                that.tableDataTotal[index].previewImage = res.previewUrl;
                            }

                        } else {
                            this.listUploadFile[this.oldIndex].id = res.documentId;
                            this.listUploadFile[this.oldIndex].documentId = res.documentId;
                            this.listUploadFile[this.oldIndex].download = file.download;
                            this.listUploadFile[this.oldIndex].fileUrl = res.downloadUrl;
                            this.listUploadFile[this.oldIndex].previewImage = res.previewUrl;
                        }
                        let uploadFile = Object.assign(file, res)
                        console.log(uploadFile)
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
                let parentId, name = '', that = this;
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
                    that.spinShow = false
                    console.log('创建文件夹成功！')
                })
            },
            // 获取文件目录
            _uploadGetContent() {
                let that = this;
                this.checkAllGroupList = []
                this.checkAllGroup = []
                const data = {
                    folderId: that.serveOption.folderId,
                    systemId: that.serveOption.systemId,
                    offset: 1,
                    limit: 100
                }
                that.serveOption.uploadGetContent(data).then((res) => {
                    if (that.$refs.table) {
                        //this.uploading = false
                        that.$refs.table.loading = false
                    } else {
                        that.spinShow = false
                    }
                    if (res.subFolders && res.subFolders.length) {
                        this.folderList = res.subFolders
                        this.folderList.forEach((item) => {
                            item.typeId = `folder.${item.id}`
                            this.checkAllGroupList.push(`folder.${item.id}`)
                        })
                    }
                    if (res.documents && res.documents.length) {
                        this.fileList = res.documents
                        res.documents.forEach((item) => {
                            that.fileInitList(item)
                        })
                    }
                })
            },
            //删除单文档
            /*removeOldDocument(id) {
                this.serveOption.deleteDocument(id).then((res) => {
                    if (res) {
                        console.log("旧文件删除，新文件更新成功")
                        this.oldUploadData = {}
                    }
                })
            },*/
            removeDocument(item) {
                this.modalMsg1 = {
                    title: '删除确认',
                    content: '确认要删除名称为 ' + item.name + ' 的文件吗？',
                    loading: true,
                    duration: '3'
                }
                if(item.documentId != undefined){
                    this.deleteDocumetId = item.documentId;
                } else {
                    this.deleteDocumetId = item.id;
                }
                this.$nextTick(() => {
                    //this.$BAlert.delete(this.modalMsg1)
                    this.$refs.alert.confirmAuto();
                })
            },
            removeDocumentOK(){
                let that = this
                let id = this.deleteDocumetId
                this.serveOption.deleteDocument(id).then((res) => {
                    if(res){
                        this.$refs.alert.onCanel();
                        if(this.tableLayout){
                            let index = this.tableDataTotal.findIndex(el => el.documentId === id)
                            this.tableDataTotal.splice(index, 1)
                        } else {
                            let index = that.listUploadFile.findIndex(el => el.documentId === id)
                            that.listUploadFile.splice(index, 1)
                            that.isShowUploadListBtn()
                        }
                        this.$Message.success('您已成功删除文件！')
                    }
                })
            },
            //批量删除
            deleteMultipleDocument() {
                this.isMultiple = true;
                if(this.tableCheckBox.length == 0){
                    this.$BMessage.warning('请选择文件，再进行删除！')
                } else {
                    this.modalMsg1 = {
                        title: '删除确认',
                        content: '确认要删除这 ' + this.tableCheckBox.length + ' 个文件吗？',
                        loading: true,
                        duration: '3',
                        onOk:function () {

                        }
                    }

                    this.$nextTick(() => {
                        this.$refs.alert.confirmAuto();
                        //this.$BAlert.delete(this.modalMsg1)
                    })
                }
            },
            deleteMultipleDocumentOk() {
                let that = this;
                let idList = [];
                that.tableCheckBox.forEach((item) => {
                    idList.push(item.documentId)
                })
                this.serveOption.deleteMultipleDocument(idList).then((res) => {
                    if(res){
                        that.$refs.alert.onCanel();
                        that.uploading = true;
                        that.refreshTable();
                        this.$Message.success('您已成功删除文件！')
                    }
                })
            },
            //拼下载地址
            FileUrl(url){
                return Setting.apiBaseURL + '/docservice' + url
            },
            //初始化列表
            fileInitList(file) {
                let docType = this.FileType(file.extName)
                let fileSize = this.formatSize(file.size)
                switch (docType) {
                    case 'doc':
                        file.isImage = false
                        file.see = ''
                        break;
                    case 'image':
                        file.isImage = true
                        file.see = ''
                        break;
                    default:
                        file.isImage = false
                }
                file.edit = false
                file.download = this.FileUrl(file.fileUrl)
                file.documentId  = file.id
                if (this.tableLayout) {
                    this.uploading = false;
                    this.tableDataTotal.push({
                        id: file.mainFileId,
                        documentId: file.id,
                        No: this.tableDataTotal.length + 1,
                        control: 1,
                        name:file.name,
                        size: fileSize,
                        remark: '',
                        url: file.fileUrl,
                        fileUrl:file.fileUrl,
                        isImage: file.isImage,
                        progress: 1,
                        download: file.download,
                        previewImage: file.previewImage,
                        extName: file.extName,
                        mainFileId: file.mainFileId,
                        modifyTime: new Date(file.modifyTime),
                        edit: false
                    });
                    this.getTablePageData(this.currentPage)
                    this.$nextTick(() => {
                        this[`uploader${this.randomNum}`].addButton({
                            id: "#uploadBtn"+file.documentId,
                            innerHTML: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>',
                            multiple: false
                        })
                    })
                } else {
                    // 将查询到的数据状态置成已完成
                    this.spinShow = false;
                    this.listUploadFile.push(file);
                    this.isShowUploadListBtn();
                    //let oldFile = new WebUploader.File(file);
                    //this.addFile(oldFile)
                }
            },
            //updateFile
            _updateFile(file) {
                this.serveOption.updateFile(file).then((res) => {
                    //console.log(res)
                })
            },
            _addFileButton(id) {
                this.$nextTick(() => {
                    this[`uploader${this.randomNum}`].addButton({
                        id: `#uploaderListOne-${id}`,
                        innerHTML: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>',
                        multiple: false
                    })
                })
            },
            // 显示文件详情
            showFileDetail(item) {
                this.showBigImage = ''
                //this.showAudio = {}
                //this.showVideo = {}
                //this.fileDetail.header = item.name
                let docType = this.FileType(item.extName)
                switch (docType) {
                    case 'doc':
                        this.fileDetail.url = this.serveOption.officeOnlineUrl + item.previewImage
                        window.open(this.fileDetail.url)
                        break;
                    case 'image':
                        this.showImageModal = true;
                        this.showBigImage = this.FileUrl(item.fileUrl)
                        break;
                    default:
                        this.$BMessage.warning('您选择的文件类型暂时不支持预览！')
                }
            },
            //是否显示上传按钮
            isShowUploadListBtn (){
                this.$nextTick(() => {
                    //if (this.authUpload) {
                        if (this.showNum) {
                            let listNum = this.listUploadFile.length
                            this.isShowUploadBtn = false
                            if(listNum < this.showNum){
                                this.isShowUploadBtn = true
                            }
                            /*if (listNum > this.showNum) {
                                this.isShowUploadBtn = false
                                this.listUploadFile.splice(this.showNum, this.listUploadFile.length - this.showNum)
                            } else if (listNum == this.showNum) {
                                this.isShowUploadBtn = false
                            } else {
                                this.isShowUploadBtn = true
                            }*/
                        }
                    //}
                })
            },
            //是否是支持类型的文件
            FileType(ext){
                let extName = ext.toLowerCase()
                let fileType = officeExtName.find(c => c == extName);
                let imgType = imgExtName.find(c => c == extName);

                if(imgType){
                    //this.isImage = true
                    return 'image'
                } else if(fileType){
                    //this.isImage = false
                    return 'doc'
                } else {
                    //this.isImage = false
                    return 'noType'
                }
            },
            // 开始上传按钮
            uploadOneBtnClick(item) {//单个文件上传按钮
                this.oldUploadData = {}
                this.oldUploadData = item
                if (this.state === 'ready') {
                    this[`uploader${this.randomNum}`].upload()
                } else if (this.state === 'paused') {
                    this[`uploader${this.randomNum}`].upload(this.file)
                } else if (this.state === 'uploading') {
                    this[`uploader${this.randomNum}`].stop(true, this.file)
                    this.setState('paused')
                }
            },
            //重命名
            uploadRename(file){
                this.$BMessage.success("这是一条普通消息");
            },
            //list 形态 单文件操作
            onLiMouseOver(e, item){
                let $updown = $(e.currentTarget).find(".updown");
                let $uploadBtn = $updown.find(".uploadBtn")
                let $webupload = $uploadBtn.find('.webuploader-pick')
                $updown.stop().animate({height: 30})
                if(!$webupload.length){
                    this.$nextTick(() => {
                        this[`uploader${this.randomNum}`].addButton({
                            id: $uploadBtn,
                            innerHTML: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>',
                            multiple: false
                        })
                    })
                }
            },
            onLiMouseOut(e){
                let $updown = $(e.currentTarget).find(".updown")
                $updown.stop().animate({height: 0})
            },
            //
            ok() {
                let that = this
                if(this.isMultiple){
                    this.deleteMultipleDocumentOk()  //批量删除
                } else {
                    this.removeDocumentOK() //单文件删除
                }
            },
            //
            //全选
            handleCheckAll() {
                let that = this;
                this.checkFileParams = []
                this.checkAll = !this.checkAll
                if (this.checkAll) {
                    this.checkAllGroup = this.checkAllGroupList
                    this.checkAll = true
                    this.fileList.forEach(function (item) {
                        if(item.typeId === 'file'){
                            that.checkAllGroup.forEach(function (item1) {
                                if(item.id == item1){
                                    that.checkFileParams.push(item);
                                }
                            })
                        } else {
                            that.checkAllGroup.forEach(function (item1) {
                                if(item.id == item1){
                                    that.checkFoladParams.push(item);
                                }
                            })

                        }
                    })
                } else {
                    this.checkAllGroup = []
                }
            },
            // 选择框
            checkAllGroupChange(data) {
                let that = this;
                that.checkFileParams = [];
                if (data.length === this.checkAllGroupList.length) {
                    this.checkAll = true
                } else if (data.length > 0) {
                    this.checkAll = false
                    data.forEach(function (item) {
                        let type = item.split('.')[0]
                        let id   = item.split('.')[1]
                        if(type === 'file'){
                            let indexFile = that.fileList.findIndex(el => el.id === id)
                            that.checkFileData.push(id)
                            that.checkFileParams.push(that.fileList[indexFile]);
                        } else {
                            let indexFolder = that.folderList.findIndex(el => el.id === id)
                            that.checkFolderData.push(id)
                            that.checkFoladParams.push(that.folderList[indexFolder]);
                        }
                    })
                } else {
                    this.checkAll = false
                    that.checkFileParams = [];
                }
            },
            // 拖动
            onDragDrop (a, b) {
                this.tableData.splice(b, 1, ...this.tableData.splice(a, 1, this.tableData[b]));
            },
            onSelect(selection, row) {
                this.tableCheckBox.push(selection)
            },
            onSelectCancel(selection) {
                this.tableCheckBox = selection
            },
            onSelectAll(status) {
                this.tableCheckBox = status
            },
            onSelectAllCancel(status) {
                this.tableCheckBox = status
            },
            onSelectionChange(status) {
                this.tableCheckBox = status
            },
            // 新建文件夹
            addNewFolder() {
                this.newFolderFlag = true
                this.$nextTick(() => {
                    this.$refs.newFolderInput.focus()
                })
            },
            // enter新建文件夹
            enterNewFolder(e) {
                if (!this.newFolderName) {
                    this.newFolderFlag = false
                    return
                }
                let data = this.folderDetail
                data.parentId = this.folderDetail.id
                data.id = this._setFolderId()
                data.createTime = this._getCurrentTime()
                data.modifyTime = this._getCurrentTime()
                data.name = this.newFolderName
                data.creatorId = this.$user.userId
                data.creator = this.$user.name
                data.edit = false
                this._uploadNewFolder(data)
            },
            // 修改文件夹名称
            renameFolder(folder){
                this.$set(folder, 'edit', true)
                this.$nextTick(() => {
                    this.$refs[`fileInput${folder.id}`][0].focus()
                })
            },
            //修改显示时间形式
            timeModify(){
               return (new Date()).getTime() - 86400 * 3 * 1000
            }
        }
    }
</script>
<style lang="less">
</style>
