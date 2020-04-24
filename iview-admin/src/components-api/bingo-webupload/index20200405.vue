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
                    <li class="placeholder" v-show="isShowUploadBtn">
                        <Button :id="`listFilePicker${randomNum}`"></Button>
                    </li>
                    <li class="file-item" v-for="(item, key) in listUploadFile" :key="key" @mouseover="onLiMouseOver($event, item)" @mouseout="onLiMouseOut($event)">
                        <div class="text" v-if="item.text != ''">{{item.text}}</div>
                        <img :src="item.previewImage" v-if="item.isImage" />
                        <bingo-file-icon v-if="!item.isImage" :type="item.extName" width="60px" height="60px"></bingo-file-icon>
                        <p>{{item.name}}</p>
                        <Progress :percent="item.percent" v-if="item.percent" hide-info :stroke-width="5" />
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
            <!--<Checkbox
                    class="file-handel-checkbox"
                    size="large"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">
            </Checkbox>
            <div class="tableBox" :style="{height: height +'px'}">
                <Spin fix v-if="spinShow"></Spin>
                <ul v-show="!spinShow" class="tableList">
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <li v-for="(item, key) in listUploadFile" :key="key"  @on-drag-drop="onDragDrop">
                        <Button icon="ios-reorder" class="dragBtn"></Button>
                        <Checkbox size="large" class="file-item-label" :label="`file.${item.id}`"></Checkbox>
                        <img :src="item.previewImage" v-if="item.isImage" />
                        <bingo-file-icon v-if="!item.isImage" :type="item.extName" width="24px" height="24px"></bingo-file-icon>
                        <Ellipsis :text="item.name" :lines="1" full-width-recognition tooltip />
                        <div class="btn-group">
                            <Button type="text" v-if="authUpload" class="uploadBtn" @click="uploadOneBtnClick(item)" icon="md-cloud-upload"><span>上传</span></Button>
                            <a :href="item.download" :download="item.name"><Icon type="md-cloud-download" /><span>下载</span></a>
                            <Button type="text" v-if="authSee" icon="md-create"><span>重命名</span></Button>
                            <Button type="text" v-if="authSee" @click="showFileDetail(item)" icon="ios-eye"><span>查看</span></Button>
                            <Button type="text" v-if="authDelete" @click="removeDocument(item)" icon="md-trash"><span>删除</span></Button>

                        </div>
                    </li>
                    </CheckboxGroup>
                </ul>
            </div>-->
            <div class="i-table-no-border">
                <header>
                    <Breadcrumb separator=">">
                        <BreadcrumbItem to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
                        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
                    </Breadcrumb>
                    <div v-show="tableCheckBox.length" class="file-handler">   <!---->
                        <span class="select-num-hint">已选择 {{tableCheckBox.length}} 项</span>
                        <a class="batch-handler" @click.stop="batchDownFiles" v-show="authDown">
                            <Icon type="md-cloud-download"/>
                            下载
                        </a>
                        <a class="batch-handler" @click.stop="deleteMultipleDocument" v-show="authDelete">
                            <Icon type="ios-trash-outline"/>
                            删除
                        </a>
                    </div>
                    <a class="file-header-crate" @click="addNewFolder">
                        <Icon class="icon" type="md-add-circle"/>
                        创建文件夹</a>
                </header>
                <Table :data="tableData" :columns="columns" :height=height :loading="uploading" :draggable="true" @on-drag-drop="onDragDrop"
                   @getData="getTablePageData"
                   @on-select="onSelect"
                   @on-select-all="onSelectAll"
                   @on-select-all-cancel="onSelectAllCancel"
                   @on-select-cancel="onSelectCancel"
                   @on-selection-change="onSelectionChange">
                <template slot="move">
                    <Icon type="md-menu" class="dashboard-workplace-todo-move" title="拖拽排序" />
                </template>
                <template slot-scope="{ row }" slot="name">
                    <p class="passOver">{{row.name}}<Progress :percent="row.percent" hide-info :stroke-width="3" /></p>
                </template>
                <template slot-scope="{ row }" slot="image">
                    <img :src="row.previewImage" v-if="row.isImage" />
                    <bingo-file-icon v-if="!row.isImage" :type="row.extName" width="30px" height="30px"></bingo-file-icon>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" v-if="authUpload" class="actionBtn uploadBtn" :id="`uploadBtn${row.id}`" @click="uploadOneBtnClick(row)" icon="md-cloud-upload"><span>上传</span></Button>
                    <Divider type="vertical" />
                    <a :href="row.download" :download="row.name" class="actionBtn"><Icon type="md-cloud-download" /><span>下载</span></a>
                    <Divider type="vertical" />
                    <Button type="text" v-if="authRename" class="actionBtn" @click="uploadRename(row)" icon="md-create"><span>重命名</span></Button>
                    <Divider type="vertical" />
                    <Button type="text" v-if="authDelete" class="actionBtn" @click="removeDocument(row)" icon="md-trash"><span>删除</span></Button>
                    <Divider type="vertical" />
                    <Button type="text" v-if="authSee" class="actionBtn" @click="showFileDetail(row)" icon="ios-eye"><span>查看</span></Button>
                </template>
            </Table>
            </div>
            <!--<bingoTable
                    :border="model.border"
                    :columns="columns"
                    :data="tableData"
                    :height=height
                    :page="page"
                    :pageSetting="model.pageSetting"
                    :layoutShow="false"
                    :showDelete="false"
                    :showNew="false"
                    :showRefresh="false"
                    :size="model.size"
                    :toolbar="model.toolbar"
                    :draggable="true"
                    @on-drag-drop="onDragDrop"
                    @getData="getTablePageData"
                    @on-select="onSelect"
                    @on-select-all="onSelectAll"
                    @on-select-all-cancel="onSelectAllCancel"
                    @on-select-cancel="onSelectCancel"
                    @on-selection-change="onSelectionChange"
                    class="upload-table"
                    ref="table">
                <template slot="move">
                    <Icon type="md-menu" class="dashboard-workplace-todo-move" title="拖拽排序" />
                </template>
                <template slot-scope="{ row }" slot="user">
                    <AvatarList :list="row.listUploadFile" size="small" />
                </template>
                <span class="uploader-table-toolbar" name="toolbar">
                    <Button type='primary' :id="`tableFilePicker${randomNum}`" class="table-file-picker" v-if="authUpload"></Button>
                    <div @click="uploadBtnClick()" class="uploadBtn" v-show="tableUploadBtnFlag && !autoUpload">{{tableUploadBtn}}</div>
                    <Button @click="refreshTable" icon='md-refresh'
                            type='primary'>{{$t('page.common.refresh')}}</Button>
                    <Button @click="removeTableAllFile()" icon='md-trash' type='primary' v-if="authDelete">{{$t('page.common.delete')}}</Button>
                    <Button @click="batchDownFiles()" icon='md-cloud-download' type='primary' v-if="authDown">{{$t('page.common.download')}}</Button>
                </span>
            </bingoTable>-->
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
    import bingoAlert from '@/components-api/bingo-alert'
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
                        title: ' ',
                        width: 20,
                        slot: 'move'
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 55,
                        size: 'large',
                        align: 'center'
                    },
                    {
                        type: 'selection',
                        width: 55,
                        align: 'center',
                    },
                    {
                        title: '',
                        width: 50,
                        slot: 'image'
                    },
                    {
                        title: '名称',
                        align: 'left',
                        slot: 'name',
                        resizable: true,
                        /*render: (h, params) => {
                            return h('div', {
                                class:'progressOver',
                                    attrs: {
                                        id: `tableProgress${this.tableData[params.index].id}`
                                    }
                                },
                                [
                                    h('a', {
                                        attrs: {
                                            href: Setting.apiBaseURL + '/docservice' + params.row.url,
                                            download: params.row.name,
                                        }
                                    }, [
                                        /!*h(bingoFileIcon, {
                                            props: {  // 自定义组件的属性
                                                type: params.row.extName,
                                                width: '14px',
                                                height: '14px'
                                            },
                                            class: 'bingoFileIcon',
                                            on: {}
                                        }),*!/
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
                        }*/
                    },
                    {
                        title: '文件大小',
                        key: 'size',
                        align: 'center',
                        width: 130
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: 220,
                    }
                   /* {
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
                                                that.removeDocument(params.row)
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
                    }*/
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
            console.log('listUploadFile=='+ this.listUploadFile)
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
                    if (this.tableLayout) {
                        this.removeTableOldFile(this.tableUploadData) // 将源文件删除
                        this.tableUploadData = {}
                    } else {

                    }
                    this.uploadFlag = false
                }
                this.file = file
                this.keyGenerator(file)
            },
            // 上传过程中触发，携带上传进度。
            onUploadProgress(file, percentage) {
                if (this.tableLayout) {

                } else {
                    file.text = '上传中'
                }
                file.percent = percentage * 100
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
                this.$Message.error(errorMessage)
            },
            // 当文件上传成功时触发
            onUploadSuccess(file, res) {
                file.text = '上传成功'
                if (this.oldUploadData.id) {
                    this.removeOldDocument(this.oldUploadData.id)
                }
                if (res._raw === '分片上传完成') {
                    this.$emit('success', file)
                }
            },
            // 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证
            // 不管成功或者失败，文件上传完成时触发
            onUploadComplete(file) {
                file.percent = 0
                if (this.tableLayout) {
                    $(`#tableProgress${file.id}`).addClass('upload-state-done');
                } else {
                    file.text = ''

                    this.listUploadFile.splice(1, file);
                }
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
            // 文件添加到队列
            onFileQueued(file) {
                let that = this;
                if (file.size) {
                    let fileSize = this.formatSize(file.size);

                    if (this.tableLayout) {
                        this[`uploader${this.randomNum}`].makeThumb(file, (error, src) => {
                            let isImage = false
                            if (error) {
                                file.text = '预览文件'
                                file.extName = file.ext
                                file.isImage = false
                                return
                            }
                            file.text = '等待上传...'
                            file.previewUrl = src
                            file.previewImage = src
                            file.isImage = true
                            file.percent = 1
                            file.extName = file.ext

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
                                isImage: isImage,
                                mainFileId: file.mainFileId
                            }
                            if (this.oldUploadData.id) {
                                let selectId = '';
                                this.tableDataTotal.forEach(function (item, index) {
                                    if(item.id == that.oldUploadData.id) {
                                        selectId = index;
                                        return
                                    }
                                })
                                this.oldIndex = selectId
                                this.tableDataTotal.splice(selectId, 1, file)
                                console.log(selectId)
                                console.log(this.tableDataTotal)
                                this.oldUploadData={}
                            } else {
                                this.tableDataTotal.unshift(file)
                            }
                        }, 100, 100)

                    } else {
                        file.text = '等待上传'
                        this.addFile(file)
                        file.download = file.previewImage
                        if (this.oldUploadData.id) {
                            let index = this.listUploadFile.indexOf(this.oldUploadData);
                            this.oldIndex = index
                            this.listUploadFile.splice(index, 1, file)
                            this.oldUploadData={}
                        } else {
                            this.listUploadFile.unshift(file);
                        }
                        this.isShowUploadListBtn()
                    }
                    /*if (this.tableLayout) {
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

                    } else {
                        this.addFile(file)
                        this.listUploadFile.unshift(file);
                        //this.updateTotalProgress()
                    }*/
                    this.state = 'ready'
                }
            },
            // 文件从队列删除
            onFileDequeued(file) {
                console.log('filedequeued-----------' + this.tableLayout)
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
                a.href = this.FileUrl(item.url)// 设置下载地址
                a.download = item.name // 设置下载文件名
                a.dispatchEvent(e) // 给指定的元素，执行事件click事件
            },
            //批量下载
            batchDownFiles() {
                this.tableCheckBox.forEach(item => {
                    this.downFile(item)
                })
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
                let isThumbnail = false  //是否有走过缩略图，走过才渲染
                /*let showError = function (code) {
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
                }*/
                this[`uploader${this.randomNum}`].makeThumb(file, (error, src) => {
                    if (error) {
                        file.text = '预览文件'
                        file.extName = file.ext
                        file.isImage = false
                        return
                    }
                    file.text = '等待上传...'
                    file.previewUrl = src
                    file.previewImage = src
                    file.isImage = true
                    file.percent = 1
                    file.extName = file.ext
                    /*if (this.oldUploadData.id) {
                        if(that.tableLayout){
                            let index = this.tableDataTotal.indexOf(this.oldUploadData);
                            this.tableDataTotal.splice(index, 1, file)
                        } else {
                            let index = this.listUploadFile.indexOf(this.oldUploadData);
                            this.listUploadFile.splice(index, 1, file)
                        }
                    }*/
                }, thumbnailWidth, thumbnailHeight)

                // 文件状态变化
                file.on('statuschange', (cur, prev) => {
                    if (prev === 'progress') {
                        file.percent = 1
                        //$prgress.hide().width(0)
                    } else if (prev === 'queued') {
                        //$li.off('mouseenter mouseleave')
                        //$btns.remove()
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        //showError(file.statusText)
                        //this.percentages[file.id][1] = 1
                    } else if (cur === 'interrupt') {
                        // showError('interrupt')
                    } else if (cur === 'queued') {
                        // $info.remove()
                        // $prgress.css('display', 'block')
                        //this.percentages[file.id][1] = 0
                    } else if (cur === 'progress') {
                        //$info.remove()
                        //$prgress.css('display', 'block')
                    } else if (cur === 'complete') {
                        file.text = ''
                        debugger
                        //$li.append('<span class="success"></span>')
                    }
                })

                if (file.getStatus() === 'invalid') {

                } else {

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
                    this.uploading = true;
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
                console.log('beforeSendFile-----------' + this.tableLayout)
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
                let that = this;
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
                        file.download = that.FileUrl(res.downloadUrl)
                        if (that.tableLayout) {
                            this.tableDataTotal[this.oldIndex].id = res.documentId;

                        } else {
                            this.listUploadFile[this.oldIndex].id = res.documentId
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
                        this.uploading = false
                        that.$refs.table.loading = false
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
            removeOldDocument(id) {
                this.serveOption.deleteDocument(id).then((res) => {
                    if (res) {
                        console.log("旧文件删除，新文件更新成功")
                        this.oldUploadData = {}
                    }
                })
            },
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
                    this.$refs.alert.confirmAuto()
                })
            },
            removeDocumentOK(){
                let id = this.deleteDocumetId
                this.serveOption.deleteDocument(id).then((res) => {
                    if(res){
                        this.$refs.alert.onCanel();
                        if(this.tableLayout){
                            let index = this.tableDataTotal.findIndex(el => el.id === id)
                            this.tableDataTotal.splice(index, 1)
                        } else {
                            let index = that.listUploadFile.findIndex(el => el.id === id)
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
                this.modalMsg1 = {
                    title: '删除确认',
                    content: '确认要删除这 ' + this.tableCheckBox.length + ' 个文件吗？',
                    loading: true,
                    duration: '3'
                }
                this.$nextTick(() => {
                    this.$refs.alert.confirmAuto()
                })
            },
            deleteMultipleDocumentOk() {
                let that = this;
                let idList = [];
                that.tableCheckBox.forEach((item) => {
                    idList.push(item.id)
                })
                this.serveOption.deleteMultipleDocument(idList).then((res) => {
                    if(res){
                        that.$refs.alert.onCanel();
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
                file.download = this.FileUrl(file.fileUrl)
                if (this.tableLayout) {
                    this.uploading = false;
                    console.log("初始化文件列表")
                    this.tableDataTotal.push({
                        id: file.id,
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
                        mainFileId: file.mainFileId
                    });
                    this.getTablePageData(this.currentPage)
                    this.$nextTick(() => {
                        this[`uploader${this.randomNum}`].addButton({
                            id: "#uploadBtn"+file.id,
                            innerHTML: '<i class="ivu-icon ivu-icon-md-cloud-upload"></i>',
                            multiple: false
                        })
                    })
                } else {
                    // 将查询到的数据状态置成已完成
                    this.spinShow = false;
                    file.text = ''
                    this.listUploadFile.push(file);
                    this.isShowUploadListBtn();
                    //let oldFile = new WebUploader.File(file);
                    //this.addFile(oldFile)
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
                        this.$refs.modal.warning('您选择的文件类型暂时不支持预览！')
                }
            },
            //是否显示上传按钮
            isShowUploadListBtn (){
                if(this.authUpload){
                    if(this.showNum){
                        let listNum = this.listUploadFile.length
                        if (listNum > this.showNum) {
                            this.listUploadFile.splice(this.showNum, this.listUploadFile.length - this.showNum)
                        } else if (listNum == this.showNum) {
                            this.isShowUploadBtn = false
                        } else {
                            this.isShowUploadBtn = true
                        }
                    }
                }
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
            uploadRename(){

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
                console.log(a)
                console.log(b)
                this.tableData.splice(b, 1, ...this.tableData.splice(a, 1, this.tableData[b]));
            },
            onSelect(selection, row) {
                console.log('selection======' + selection)
                console.log('row============' + row)
                this.tableCheckBox.push(selection)
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
        }
    }
</script>
<style lang="less">
</style>
