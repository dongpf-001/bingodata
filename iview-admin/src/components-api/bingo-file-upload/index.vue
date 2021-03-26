<template>
    <div class="bingo-file-upload" :style='{height: height}'>
        <header class="file-header">
            <!--默认文件夹-->
            <p class="file-header-title" v-show="folderRootName">{{folderRootName}}</p>
            <div class="file-header-title" v-show="!folderRootName">
                <div class="ivu-breadcrumb" ref="fileHeaderTitle">
                    <span @click="goBackFolder(item.id, index)" v-for="(item, index) in folderNameList" :key="item.id">
                        <span class="ivu-breadcrumb-item-link">{{item.name}}</span> <span
                            class="ivu-breadcrumb-item-separator">&gt;</span>
                    </span>
                </div>
            </div>
            <div class="file-header-handler" v-show="authUpload">
                <a class="file-header-crate" @click="addNewFolder">
                    <Icon class="icon" type="md-add-circle"/>
                    创建文件夹</a>
                <a class="file-header-upload">
                    <span id="fileUploadBtn"></span>
                </a>
            </div>
        </header>
        <div class="file-handel">
            <Checkbox
                    class="file-handel-checkbox"
                    size="large"
                    :disabled="checkDisabled"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">
            </Checkbox>
            <div v-show="!checkAllGroup.length" class="file-info">
                <a class="file-info-item file-info-name">名称</a>
                <a class="file-info-item file-info-size">大小</a>
                <span class="file-info-author">创建人</span>
                <a class="file-info-item file-info-update">创建日期</a>
            </div>
            <div v-show="checkAllGroup.length" class="file-handler">
                <span class="select-num-hint">已选择 {{checkAllGroup.length}} 项</span>
                <a class="batch-handler" @click.stop="batchDownFiles" v-show="authDown">
                    <Icon type="md-cloud-download"/>
                    下载
                </a>
                <a class="batch-handler" @click.stop="deleteMultiple" v-show="authDelete">
                    <Icon type="ios-trash-outline"/>
                    删除
                </a>
            </div>
        </div>
        <div class="file-content-wrapper">
            <ul class="file-list">
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <!--新增文件夹-->
                    <li class="file-item" v-show="newFolderFlag">
                        <Checkbox size="large" class="file-item-label" disabled></Checkbox>
                        <div class="file-item-display">
                            <div class="file-item-content">
                                <div class="file-item-info">
                                    <Icon type="ios-folder"/>
                                    <Input class="file-item-title"
                                           :maxlength="100"
                                           @click.native.stop
                                           ref="newFolderInput"
                                           v-model="newFolderName" placeholder="按 Enter 新建文件夹"
                                           @blur.native.capture="enterNewFolder"
                                           @keyup.enter.native.capture="enterNewFolder"/>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--文件夹-->
                    <!--<li class="file-item" @click="goFolder(item)" v-for="item in folderList" :key="item.id">-->
                    <li class="file-item" v-for="item in folderList" :key="item.id">
                        <Checkbox @click.native.stop size="large" class="file-item-label" :label="`folder.${item.id}`"
                                  disabled></Checkbox>
                        <div class="file-item-display">
                            <div class="file-item-content">
                                <div class="file-item-info">
                                    <div class="img-wrapper">
                                        <Icon type="ios-folder"/>
                                    </div>
                                    <Tooltip :disabled="!item.name" v-if="!item.edit" transfer placement="top"
                                             max-width="300" :content="item.name">
                                        <span class="file-item-title" @click="goFolder(item)">{{item.name}}</span>
                                    </Tooltip>
                                    <Input v-if="item.edit" class="file-item-title"
                                           :ref="`fileInput${item.id}`"
                                           :maxlength="200"
                                           v-model="item.name"
                                           @keydown.enter.native.prevent="renameEnter(item, 0)"
                                           @blur.native.capture="renameOnBlur(item, 0)"/>
                                </div>
                                <div class="file-item-desc">
                                    <span class="desc-size">-</span>
                                    <span class="desc-creator">{{item.creator}}</span>
                                    <span class="desc-updated">{{item.modifyTime}}</span>
                                    <!--<Tooltip :disabled="!item.modifyTime" transfer placement="top" max-width="200"
                                             :content="item.modifyTime">
                                        <span class="desc-updated ">{{item.modifyTime}}</span>
                                    </Tooltip>-->
                                </div>
                            </div>
                            <div class="file-item-handler">
                                <!--                                <Tooltip transfer placement="top" max-width="120"-->
                                <!--                                         content="移动文件">-->
                                <!--                                    <Icon type="md-move"/>-->
                                <!--                                </Tooltip>-->
                                <span v-show="authRename">
                                <Tooltip transfer placement="top" max-width="90" content="重命名">
                                    <Icon class="file-item-btns" @click.stop="renameFolder(item, 0)" type="md-create"/>
                                </Tooltip>
                                    </span>
                                <span v-show="authDelete">
                                <Tooltip transfer placement="top" max-width="60" content="删除">
                                    <Icon class="file-item-btns" @click.stop="singleModalShow(item, 0)"
                                          type="ios-trash-outline"/>
                                </Tooltip>
                                </span>
                            </div>
                        </div>
                    </li>
                    <!--文件-->
                    <li class="file-item" v-for="(item, key) in fileList" :key="key" :id="item.documentId">
                        <Checkbox @click.native.stop size="large" class="file-item-label"
                                  :label="`file.${item.documentId}`"></Checkbox>
                        <div class="file-item-display">
                            <div class="file-item-content">
                                <div class="file-item-info" @click="downFile(item)">
                                    <div class="img-wrapper">
                                        <span v-if="item.extName == 'gif' || item.extName == 'jpg' || item.extName == 'jpeg' || item.extName == 'bmp' || item.extName == 'png'">
                                            <img :src=item.previewImage width="30" height="30"/>
                                        </span>
                                        <span v-else>
                                            <bingoFileIcon :type="item.extName"></bingoFileIcon>
                                        </span>
                                    </div>
                                    <Tooltip :disabled="!item.name" v-show="!item.edit" transfer placement="top"
                                             max-width="300" :content="item.name">
                                        <span class="file-item-title">{{item.name}}</span>
                                    </Tooltip>
                                    <Input v-show="item.edit" class="file-item-title"
                                           :maxlength="100"
                                           :ref="`fileInput${item.id}`"
                                           v-model="item.name"
                                           @keyup.enter.native="$event.target.blur"
                                           @on-blur="renameOnBlur(item, 1)"
                                           :placeholder="item.name"/>
                                
                                </div>
                                <div class="file-item-desc">
                                    <span class="desc-size">{{_formatSize(item.size)}}</span>
                                    <span class="desc-creator">{{item.creator}}</span>
                                    <span class="desc-updated">{{item.modifyTime}}</span>
                                    <!--<Tooltip :disabled="!item.modifyTime" transfer placement="top" max-width="200"
                                             :content="item.modifyTime">
                                        <span class="desc-updated ">{{item.modifyTime}}</span>
                                    </Tooltip>-->
                                </div>
                            </div>
                            <div class="file-item-handler">
                                <span v-show="authDown">
                                <Tooltip transfer placement="top" max-width="60" content="下载">
                                    <a :href="item.download" class="file-item-btns" :download="item.name"
                                       @click.native.stop><Icon type="md-cloud-download"/></a>
                                </Tooltip>
                                </span>
                                <span v-show="authUpload">
                                <Tooltip transfer placement="top" max-width="60" content="更新">
                                    <span :id="`uploadFile${item.documentId}`" class="file-item-btns"
                                          @click="_getCurrentData(item)"></span>
                                </Tooltip>
                                </span>
                                <span v-show="authRename">
                                <!--<Tooltip transfer placement="top" max-width="120" content="移动文件">
                                    <Icon @click.stop type="md-move"/>
                                </Tooltip>-->
                                <Tooltip transfer placement="top" max-width="90" content="重命名">
                                    <Icon class="file-item-btns" @click.native.stop="renameFile(item, 1)"
                                          type="md-create"/>
                                </Tooltip>
                                    </span>
                                <span v-show="authDelete">
                                <Tooltip transfer placement="top" max-width="60" content="删除">
                                    <Icon class="file-item-btns" @click.stop="singleModalShow(item, 1)"
                                          type="ios-trash-outline"/>
                                </Tooltip>
                                    </span>
                                <span v-show="authSee">
                                <Tooltip transfer placement="top" max-width="90" content="预览">
                                    <Icon class="file-item-btns" @click.stop="showFileDetail(item)" type="ios-eye"/>
                                </Tooltip>
                                </span>
                            </div>
                        </div>
                    </li>
                </CheckboxGroup>
                <!--                <div class="file-placeholder" v-show="!fileList.length">-->
                <div class="file-placeholder"
                     v-show="!fileList.length&&!folderList.length&&!newFolderFlag&&!spinShowFlag">
                    <a class="upload-handler">
                        <span id="filePickerBtn2"></span>
                    </a>
                    <p class="file-placeholder-text">{{noDataMsg}}</p>
                </div>
                <Spin size="large" fix v-if="spinShowFlag"></Spin>
            </ul>
        </div>
        <Modal v-model="showImageModal" footer-hide>
            <img :src="showBigImage" style="width: 100%">
        </Modal>
        <bingo-alert ref="alert" :modalMsg="modalMsg1" @on-ok="ok"></bingo-alert>
        <bingo-modal ref="modal" :title="modalMsg1.title" :content="modalMsg1.content" @ok="ok"></bingo-modal>
        <back-uploader
                ref="uploader"
                :serveOption="serveOption"
                uploadButton="#fileUploadBtn"
                addUploadButton="#filePickerBtn2"
                @success="onSuccess"
                @finished="onFinished"
        ></back-uploader>
    </div>
</template>

<script>
    /*
   * 文档地址 http://fex.baidu.com/webuploader/doc/index.html
   * */
    /* eslint-disable */
    import backUploader from './back-uploader'
    import * as Api from '@/api/bmsa/upload';
    import bingoFileIcon from '@/components-api/bingo-file-icon';
    import bingoModal from '@/components-api/bingo-modal';
    import bingoAlert from '@/components-api/bingo-alert/index.vue';
    import util from '@/libs/util';
    import Setting from '../../setting'

    const rootFolderId = '0001'
    const rootNoDataTxt = '你可以创建文件夹或上传文件'
    const noDataTxt = '文件夹中还没有内容哦'
    const officeExtName = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf']
    const imgExtName = ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
    const video = ['mp4', 'webm', 'ogg']
    const audio = ['mp3', 'wav']
    const token = util.cookies.get('token');

    export default {
        name: 'bingo-file-upload',
        components: {
            Api,
            backUploader,
            bingoFileIcon,
            bingoModal,
            bingoAlert
        },
        props: {
            serveOption: {
                type: Object,
                required: true
            },
            auth: {
                type: Array,
                default: () => {
                    return [true, true, true, true, true]//下载、上传、重命名、删除、查看
                }
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
            }
        },
        data() {
            return {
                token: token,
                spinShowFlag: true,
                longHeaderFlag: false,
                folderDetail: {},
                folderNameList: [],
                folderRootName: '',
                newFolderFlag: false,
                newFolderName: '',
                fileDetail: {
                    header: '',
                    url: '',
                    type: ''
                },
                deleteSingleType: 0,
                fileDetailModel: false,
                deleteSingleModel: false,
                deleteSingleModelLoading: false,
                deleteMultipleModel: false,
                deleteMultipleModelLoading: false,
                fileList: [],
                folderList: [],
                oldIndex: 0,
                checkAll: false,
                checkAllGroup: [],
                checkFileParams: [],
                checkFoladParams: [],
                height: '100%',
                isRename: false,
                getCurrentData: {},
                modalMsg1: {
                    title: '请确认',
                    content: ''
                },
                isDeleteMultiple: true,
                checkFileData: [],
                checkFolderData: [],
                showImageModal: false,
                showBigImage: '',
                showVideo: {},
                showAudio: {},
                isInitFolder: false,
            }
        },
        watch: {
            checkDisabled() {
                this.checkAll = false
            },
            checkFileCount(val) {
                this.checkFileCount = val
            },
            authDown(val) {
                this.auDown = val;
            },
            authUpload(val) {
                this.authUpload = val;
            },
            authRename(val) {
                this.authRename = val;
            },
            authDelete(val) {
                this.authDelete = val;
            },
            authSee(val) {
                this.authSee = val;
            }
        },
        computed: {
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
                /*let count = 0
                this.checkAllGroup.forEach((item) => {
                    //if (item.split('.')[0] === 'folder') count += 1
                    if (item.typeId === 'folder') count += 1
                })
                return count ? `${count} 个文件夹` : ''*/
            },
            // 用户信息
            $user() {
                return this.$store.state.admin.user.info.data
            }
        },
        created() {
            this.checkAllGroupList = []
            this.initServeOption();
            this._isFolder();
            //this._uploadGetContent();
        },
        methods: {
            initServeOption() {
                if (this.serveOption.height != null && this.serveOption.height != undefined) {
                    this.height = this.serveOption.height + 'px';
                }
                this.serveOption.uploadCheckFile = Api.uploadCheckFile;
                this.serveOption.uploadCheckChunk = Api.uploadCheckChunk
                this.serveOption.uploadFileUrl = Api.uploadFileUrl
                this.serveOption.uploadFileMerge = Api.uploadFileMerge
                this.serveOption.uploadDownFileUrl = Api.uploadDownFileUrl
                this.serveOption.uploadGetFileDetail = Api.uploadGetFileDetail
                this.serveOption.officeOnlineUrl = Api.officeOnlineUrl
                this.serveOption.uploadNewFolder = Api.uploadNewFolder
                this.serveOption.uploadGetContent = Api.uploadGetContent
                //this.serveOption.uploadDeleteSingleFile = Api.uploadDeleteSingleFile
                this.serveOption.uploadDeleteSingleFolder = Api.uploadDeleteSingleFolder
                this.serveOption.deleteMultipleDocument = Api.deleteMultipleDocument
                this.serveOption.uploadDeleteMultipleFolders = Api.uploadDeleteMultipleFolders
                this.serveOption.uploadRenameFile = Api.uploadRenameFile
                this.serveOption.renameFolder = Api.renameFolder
                this.serveOption.renameDocuments = Api.renameDocuments
                this.serveOption.renameFile = Api.renameFile
                this.serveOption.deleteDocument = Api.deleteDocument
                this.serveOption.getFoldersList = Api.getFoldersList
                this.serveOption.headers = {
                    'Authorization': this.token
                };
            },
            _computeHeaderTitle() {
                if (this.folderNameList.length > 1) {

                } else {
                    return false
                }
            },
            // 点击title跳转文件夹详情
            goBackFolder(id, index) {
                if ((index + 1) === this.folderNameList.length) return
                this._uploadGetContent(id)
            },
            // 跳转文件夹
            goFolder(folder) {
                this._uploadGetContent(folder.id)
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
                let that = this;
                //setTimeout(function () {
                let data = that.folderDetail
                data.parentId = that.folderDetail.id
                data.id = that._setFolderId()
                data.createTime = that._getCurrentTime()
                data.modifyTime = that._getCurrentTime()
                data.name = that.newFolderName
                data.creatorId = that.$user.userId
                data.creator = that.$user.name
                data.edit = false
                that.isInitFolder = false
                that._uploadNewFolder(data)
                //}, 00)
            },
            // 修改文件夹名称
            renameFolder(folder) {
                this.$set(folder, 'edit', true)
                this.$nextTick(() => {
                    this.$refs[`fileInput${folder.id}`][0].focus()
                })
            },
            // 显示文件详情
            showFileDetail(item) {
                this.showBigImage = ''
                let docType = this.FileType(item.extName)
                switch (docType) {
                    case 'doc':
                        if (item.size > 10000000) {
                            this.$BMessage.warning('你所查看的文件已超过10M，不支持在线预览，请下载查看！')
                            return
                        }
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
            //是否是支持类型的文件
            FileType(ext) {
                let extName = ext.toLowerCase()
                let fileType = officeExtName.find(c => c == extName);
                let imgType = imgExtName.find(c => c == extName);

                if (imgType) {
                    //this.isImage = true
                    return 'image'
                } else if (fileType) {
                    //this.isImage = false
                    return 'doc'
                } else {
                    //this.isImage = false
                    return 'noType'
                }
            },
            //拼下载地址
            FileUrl(url) {
                return Setting.apiBaseURL + '/docservice' + url
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
            // 成功
            onSuccess(file) {
                let that = this;
                let item = file.item
                let fileModel = item.model
                let selectId = 0
                if (this.getCurrentData.id) {
                    file.id = file.documentId
                } else {
                    file.id = ''
                }
                let mergeData = {
                    uploadId: fileModel.uploadId,
                    documentId: file.documentId,
                    isMain: true,
                    id: file.id,
                    //id:file.documentId,
                    mainFileId: fileModel.id,
                    name: fileModel.name,
                    extName: file.ext,
                    folderId: fileModel.folderId,
                    previewUrl: file.previewUrl,
                    previewImage: file.previewUrl,
                    size: file.size,
                    creatorId: this.$user.userId,
                    creator: this.$user.name,
                    modifyTime: this._getCurrentTime()
                }
                if (this.getCurrentData.id) {
                    this.fileList.forEach(function (item, index) {
                        if (item.documentId == that.getCurrentData.documentId) {
                            selectId = index;
                            return
                        }
                    })
                    that.oldIndex = selectId
                    that.fileList.splice(selectId, 1, mergeData)
                } else {
                    mergeData.documentId = fileModel.id
                    that.fileList.unshift(mergeData)
                    that.updateAddButton()
                }
                this.getCurrentData = {}
            },
            // 完成
            onFinished(file) {
                //this._uploadGetContent(this.folderDetail.id)
            },
            // 上传
            uploadFile(item) {

            },
            //
            fileMergeSuccess(file, item) {
                file.download = this.FileUrl(item.downloadUrl)
                let index = 0
                if (this.getCurrentData.id) {
                    index = this.oldIndex
                } else {
                    index = this.fileList.findIndex(el => el.id === file.id)
                }
                this.$set(this.fileList[index], "id", item.documentId);
                this.$set(this.fileList[index], "documentId", item.documentId);
                this.$set(this.fileList[index], "download", file.download);
                this.$set(this.fileList[index], "fileUrl", item.downloadUrl);
                this.$set(this.fileList[index], "previewImage", item.previewUrl);
                this.checkAllGroupList.push(`file.${item.documentId}`)
                if (this.checkAll) {
                    this.checkAll = false
                }
                this.updateAddButton(item.documentId);
                //this.fileList.splice(this.oldIndex, 1, option)
            },
            //
            _getCurrentData(item) {
                item.documentId = item.id
                this.getCurrentData = item
                this.serveOption.getCurrentData = item;
            },
            // 单文件删除
            singleModalShow(item, type) {
                this.isDeleteMultiple = false;
                let str = ''
                if (!type) {
                    str = '夹'
                    this.deleteSingleId = item.id
                } else {
                    this.deleteSingleId = item.documentId
                }
                //this.modalMsg1.title = '请确认'
                //this.modalMsg1.content = '您确定要删除该文件'+str+'吗？'//您确定要删除该文件{{deleteSingleType?'':'夹'}}吗？
                this.modalMsg1 = {
                    title: '删除确认',
                    content: '确认要删除名称为 ' + item.name + '的文件' + str + '吗？',
                    loading: true,
                    duration: '3'
                }

                this.deleteSingleType = type
                this.$nextTick(() => {
                    this.$refs.alert.confirmAuto();
                })
            },
            // 删除单个folder
            _uploadDeleteSingleFolder(id) {
                this.serveOption.uploadDeleteSingleFolder(id).then((res) => {
                    if (res) {
                        this.$refs.alert.onCanel();
                        let index = this.checkAllGroup.findIndex(el => el === `folder.${id}`)
                        this.checkAllGroup.splice(index, 1)
                        this.deleteSingleModelLoading = false
                        this.deleteSingleModel = false
                        this.$Message.success('删除文件夹成功！')
                    } else {
                        this.$Message.error('该文件夹存在其他文件！删除失败。')
                    }
                }).then(() => {
                    this._uploadGetContent(this.folderDetail.id)
                })
            },
            ok() {
                if (this.isDeleteMultiple) { //批量删除
                    if (this.checkFolderData.length) {
                        this._uploadDeleteMultipleFolders(this.checkFolderData)
                    }
                    if (this.checkFileData.length) {
                        this._deleteMultipleDocument(this.checkFileData)
                    }
                } else {  //单文件删除
                    this.deleteSingle(this.deleteSingleType);
                }
            },
            deleteSingle(type) {
                //this.deleteSingleModelLoading = true
                if (type) { //删除文件其实是删除文档
                    this._uploadDeleteSingleDocument(this.deleteSingleId)
                } else {    //删除文件夹
                    this._uploadDeleteSingleFolder(this.deleteSingleId)
                }
            },
            // 文件重命名
            renameFile(file) {
                //let index = this.fileList.findIndex(item => item.id === file.id)
                this.$set(file, 'edit', true)
                this.$nextTick(() => {
                    this.$refs[`fileInput${file.id}`][0].focus()
                })
                file.name = file.name.substring(0, file.name.lastIndexOf('.'))
                //this.fileList[index].name = file.name
            },
            // 确认按钮
            renameEnter(file, type) {
                this.sendRequestDocumentsRename(file, type)
            },
            // 失去焦点
            renameOnBlur(file, type) {
                this.sendRequestDocumentsRename(file, type)
            },
            //重命名
            sendRequestDocumentsRename(file, type) {
                let renameFile = file
                this.$set(file, 'edit', false)
                if (type) { //重命名文档
                    renameFile.id = renameFile.documentId
                    renameFile.name = file.name + '.' + file.extName;
                    this.serveOption.renameDocuments(renameFile).then((res) => {
                        let index = this.fileList.findIndex(item => item.id === renameFile.id)
                        this.fileList[index].name = renameFile.name
                        this.$refs.modal.success('重命名成功！')
                    })
                    /*this.serveOption.renameFile(file).then((res) => {
                        let index = this.fileList.findIndex(item => item.id === file.id)
                        this.fileList[index].name = file.name
                        this.$refs.modal.success('文件重命名成功!')
                    })*/
                } else {  //重命名文件夹
                    this.serveOption.renameFolder(renameFile).then((res) => {
                        if (res) {
                            let index = this.folderList.findIndex(item => item.id === file.id)
                            this.folderList[index].name = file.name
                            this.$refs.modal.success('文件夹重命名成功！')
                        }

                    })
                }
                //let index = this.folderNameList.findIndex(el => el.id === id)
            },
            //全选
            handleCheckAll() {
                let that = this;
                this.checkFileParams = []
                this.checkAll = !this.checkAll
                if (this.checkAll) {
                    this.checkAllGroup = this.checkAllGroupList
                    this.checkAll = true
                    this.fileList.forEach(function (item) {
                        if (item.typeId === 'file') {
                            that.checkAllGroup.forEach(function (item1) {//item.split('.')[0]
                                let id = item1.split('.')[1]
                                if (item.id == id) {
                                    that.checkFileParams.push(item);
                                }
                            })
                        }
                        /*else {
                                                   that.checkAllGroup.forEach(function (item1) {
                                                       if(item.id == item1){
                                                           that.checkFoladParams.push(item);
                                                       }
                                                   })
                       
                                               }*/
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
                        let id = item.split('.')[1]
                        if (type === 'file') {
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
            // 新建文件夹
            _uploadNewFolder(data) {
                this.serveOption.uploadNewFolder(data).then((res) => {
                    if (res) {
                        if (!this.isInitFolder) {
                            this.$Message.success('文件夹创建成功！')
                        }
                        this._uploadGetContent(data.folderId)
                        this.newFolderName = ''
                        this.newFolderFlag = false
                    }
                })
            },
            // 判断文件夹是否存在
            _isFolder() {
                let that = this;
                this.serveOption.getFoldersList(this.serveOption.folderId).then((res) => {
                    if (res.length) {  //存在文件夹 -- 查
                        that._uploadGetContent();
                    } else {  //不存在文件夹 -- 新建
                        this.serveOption.id = this.serveOption.folderId;
                        that.isInitFolder = true
                        that._uploadNewFolder(this.serveOption);
                    }
                })
            },
            // 获取目录下文件
            _uploadGetContent(folderId) {
                this.spinShowFlag = true
                this.fileList = []
                this.folderList = []
                this.checkAllGroupList = []
                this.checkAllGroup = []
                this.checkFileParams = []
                this.checkFoladParams = []
                const data = {
                    folderId: folderId || this.serveOption.folderId
                }
                this.serveOption.uploadGetContent(data).then((res) => {
                    this.spinShowFlag = false
                    if (res) {
                        if (res.folder) {
                            this.folderDetail = res.folder
                            const {id, name, parentId} = this.folderDetail
                            let item = {
                                id,
                                name,
                                parentId
                            }
                            if (parentId === rootFolderId) {
                                this.folderRootName = this.folderDetail.name
                                this.folderNameList = []
                                this.folderNameList.push(item)
                            } else {
                                this.folderRootName = ''
                                this.serveOption.folderId = id
                                let index = this.folderNameList.findIndex(el => el.id === id)
                                if (index > 0) {
                                    this.folderNameList.splice(index, (this.folderNameList.length - index))
                                } else if (index == 0) {
                                    this.folderNameList.splice(0, this.folderNameList.length)
                                }
                                this.folderNameList.push(item)
                                //if (index < this.fileHeaderTitleIndex) this.longHeaderFlag = false
                            }
                        }
                        if (res.subFolders && res.subFolders.length) {
                            this.folderList = res.subFolders
                            this.folderList.forEach((item) => {
                                item.typeId = "folder"
                                //this.checkAllGroupList.push(`folder.${item.id}`)
                            })
                        }
                        if (res.documents && res.documents.length) {
                            //this.fileList = res.documents
                            res.documents.forEach((item) => {
                                this.fileInitList(item)
                            })
                        }
                    }
                })
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
                file.documentId = file.id
                file.typeId = "file"
                //this.listUploadFile.push(file)
                this.checkAllGroupList.push(`file.${file.documentId}`)
                this.updateAddButton(file.documentId);
                this.fileList.push(file)
                //let oldFile = new WebUploader.File(file);
                //this.addFile(oldFile)
            },
            //更新单文件上传
            updateAddButton(id) {
                //if(this.authUpload){
                this.$nextTick(() => {
                    this.$refs.uploader.addButton({
                        id: `#uploadFile${id}`,
                        innerHTML: '<i data-v-425b7c77="" class="ivu-icon ivu-icon-md-cloud-upload webuploader-container"></i>',
                        multiple: false
                    })
                })
                //}
            },
            // 删除单个Document
            _uploadDeleteSingleDocument(id) {
                let that = this;
                this.serveOption.deleteDocument(id).then((res) => {
                    if (res) {
                        this.$refs.alert.onCanel();
                        //let index = this.checkAllGroup.findIndex(el => el === `file.${id}`)
                        let index = that.checkAllGroup.findIndex(el => el === id)
                        let index1 = that.fileList.findIndex(item => item.id === id)
                        that.checkAllGroup.splice(index, 1)
                        that.fileList.splice(index1, 1)
                        //this.deleteSingleModelLoading = false
                        //this.deleteSingleModel = false
                        this.filterMsg();
                    }
                })
            },
            // 删除单个folder
            // 删除多个file
            _deleteMultipleDocument(data) {
                this.serveOption.deleteMultipleDocument(data).then((res) => {
                    this.$refs.alert.onCanel();
                    if (res) {
                        this.deleteMultipleModelLoading = false
                        this.deleteMultipleModel = false
                        this.checkAllGroup = []
                        this.filterMsg()
                        this._uploadGetContent(this.folderDetail.id)
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            },
            //删除文件成功时，过滤弹出，只显示一个
            filterMsg() {
                let that = this;
                setTimeout(that.$Message.success('删除成功！'), 2000)
            },
            // 删除多个folder
            _uploadDeleteMultipleFolders(data) {
                this.serveOption.uploadDeleteMultipleFolders(data).then((res) => {
                    if (res) {
                        //this.deleteMultipleModelLoading = false
                        //this.deleteMultipleModel = false
                        this.checkAllGroup = []
                        //this.filterMsg()
                        this._uploadGetContent(this.folderDetail.id)
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            },
            //批量选择
            checkMultiple() {
                let checkFileData = []
                let checkFolderData = []
                this.isDeleteMultiple = true
                this.checkAllGroup.forEach((item) => {
                    let fileHeader = item.split('.')[0]
                    let fileId = item.split('.')[1]
                    if (fileHeader === 'file') checkFileData.push(fileId)
                    if (fileHeader === 'folder') checkFolderData.push(fileId)
                })
                this.checkFolderData = checkFolderData;
                this.checkFileData = checkFileData;
            },
            // 批量删除Files
            deleteMultiple() {
                let that = this;
                that.checkMultiple();
                let folderStr = '';
                let fildStr = '';
                if (this.checkFolderData.length) {
                    //folderStr = this.checkFolderData.length + '个文件夹'
                    folderStr = this.checkFolderData.length + '个文件夹'
                }
                if (this.checkFileData.length) {
                    fildStr = this.checkFileData.length + '个文件'
                }
                this.modalMsg1.title = '请确认'
                this.modalMsg1.content = '您要删除的文件里包含' + folderStr + fildStr + '，确认删除吗？';
                this.$nextTick(() => {
                    //this.$refs.modal.confirm();
                    this.$refs.alert.confirmAuto();
                })
            },
            //批量下载
            batchDownFiles() {
                let that = this;
                that.checkMultiple();
                if (this.checkFileData.length) {
                    this.checkFileParams.forEach((item) => {
                        this.downFile(item)
                    })
                }
            },
            //下载
            downFile(item) {
                var a = document.createElement('a')
                var e = document.createEvent('MouseEvents')  // 创建鼠标事件对象
                e.initEvent('click', false, false) // 初始化事件对象
                a.href = Setting.apiBaseURL + '/docservice' + item.fileUrl// 设置下载地址
                a.download = item.name // 设置下载文件名
                a.dispatchEvent(e) // 给指定的元素，执行事件click事件
            },
            // 格式化文件大小
            _formatSize(size) {
                let fileSize = ''
                if (size < 1024 * 1000) {
                    fileSize = `${(size / 1024).toFixed(2)}KB`
                } else {
                    fileSize = `${(size / 1024 / 1000).toFixed(2)}MB`
                }
                return fileSize
            },
            //不重复标识
            _setFolderId() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    let r = Math.random() * 16 | 0
                    let v = c == 'x' ? r : (r & 0x3 | 0x8)
                    return v.toString(16)
                }).toUpperCase()
            },
            // 获取当前时间
            _getCurrentTime() {
                let date = new Date()
                let y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                let H = date.getHours()
                H = H < 10 ? ('0' + H) : H
                let M = date.getMinutes()
                M = M < 10 ? ('0' + M) : M
                let S = date.getSeconds()
                S = S < 10 ? ('0' + S) : S
                return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">

</style>
