<template>
    <div class="bingo-issue-wrapper">
        <Dropdown trigger="click" transfer @on-visible-change="visibleClick"
                  transfer-class-name="bingo-issue-wrapper-drop">
            <a href="javascript:void(0)">
                <!--                <Button type='primary'>微议题</Button>-->
                <svg width="40px" height="35px" class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#iconxiaoxi"></use>
                </svg>
            </a>
            <DropdownMenu slot="list">
                <div class="issue-list-div">
                    <div class="title" @click="newClick">
                        <h3 style="display: inline-block">微议题</h3>
                        <div class="icon-div">
                            <Icon type="md-add" class="icon"/>
                        </div>
                        <!--<Button class="issue-list-btn" type='primary' @click="newClick">新建</Button>-->
                    </div>
                    <div class="issue-list-line"></div>
                    <div class="issue-list-div-body i-scrollbar">
                        <div class="issue-list-content" v-for="(item, key) in issueList" :key="key"
                             @click="editClick(item)">
                            <span class="issue-lamp" :style="{background: (item.status==1?'#8e8f90':'#84bd00')}"></span>
                            <Icon type="ios-arrow-forward" style="float: right;margin-top: 4px;"
                                  @click="editClick(item)"/>
                            <span :class="$user.name==item.creator ? 'icon iconfont iconuser' : ''"
                                  style="float: right;color: #0077c8;width: 16px;height: 24px;"></span>
                            <div class="issue-title" @click="editClick(item)">
                                <Tooltip :content="item.title" max-width="200">
                                    <p>{{item.title}}</p>
                                </Tooltip>
                            </div>
                            <div style="display: inline-block;margin-left: 22px">
                                <Icon type="md-time" style="color: #0077c8;margin-right: 5px"/>
                                <span style="color: #8e8f90;font-size: 12px;">{{item.modifyTimeStr}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import * as Api from '@/api/bmsa/issue'

    export default {
        name: 'bing-state',
        data() {
            return {
                actionType: '',
                issueList: []
            }
        },
        props: {
            newData: {
                type: Object
            }
        },
        components: {
            Api
        },
        created() {
        },
        mounted() {
        },
        computed: {
            ...mapState('admin/layout', [
                'issueShow',
                'issueWidth'
            ]),
            $user() { // 获取当前登陆人信息
                return this.$store.state.admin.user.info.data
            }
        },
        methods: {
            visibleClick(value) { // 下拉展开时触发聊天界面
                console.log(value)
                if (value) {
                    this.issueList = []
                    this.getIssue()
                }
            },
            getIssue() { // 查询议题
                let parms = {
                    status: 0, // 状态，关闭不关闭，0是未关闭
                    userId: this.$user.userId,
                    orderBy: 'modifyTime desc'
                }
                Api.getIssueList(parms).then(res => {
                    console.log(res)
                    if (res.success) {
                        this.issueList = res.data.rows
                        this.issueList.forEach(item => {
                            let myDate = new Date(item.modifyTime)
                            item.modifyTimeStr = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' +
                                    (myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()) + ':' +
                                    (myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
                        })
                    }
                })
            },
            // 新建
            newClick() {
                this.actionType = 'new'
                let parms = {
                    createTime: new Date(),
                    creator: this.$user.name,
                    creatorId: this.$user.userId,
                    dataInfo: this.newData.dataInfo,
                    dataInfoId: this.newData.dataInfoId,
                    groupId: null,
                    dataUrl: this.newData.dataUrl,
                    id: null,
                    members: [
                        {
                            groupId: null,
                            id: null,
                            issuseId: null,
                            memberId: null,
                            pernr: this.$user.pernr,
                            userId: this.$user.userId,
                            username: this.$user.name,
                            vorna: this.$user.vorna
                        }
                    ],
                    modifier: this.$user.name,
                    modifierId: this.$user.userId,
                    modifyTime: new Date(),
                    status: 0,
                    title: this.newData.typeName + ':' + this.newData.dataInfo,
                    typeId: this.newData.typeId,
                    typeName: this.newData.typeName
                }
                Api.createIssue(parms).then(res => {
                    this.getIssue()
                    this.setData(res.data)
                })
                this.$emit('on-new')
            },
            // 编辑
            editClick(item) {
                this.actionType = 'edit'
                this.setData(item)
                this.$emit('on-edit')
            },
            async setData(datas) {
                this.$store.state.admin.layout.issueShow = false
                const db = await this.$store.dispatch('admin/db/database')
                let data = {}
                data.actionType = this.actionType
                data.datas = datas
                db.set('issueData', data).write()
                this.$store.state.admin.layout.issueShow = true
            }
        }
    }
</script>
<style lang="less">
    /*.ivu-select-dropdown {*/
    /*max-height: 550px;*/
    /*}*/
    /*.bingo-issue-wrapper-drop {*/
    /*overflow: hidden;*/
    /*max-height: 544px!important;*/
    /*}*/
    .issue-list-div {
        width: 250px;
        padding-bottom: 20px;
        .title {
            display: inline-block;
            padding: 10px;
            width: 100%;
            cursor: pointer;
            .icon-div {
                float: right;
                width: 23px;
                height: 23px;
                background: #0077c8;
                /*margin-right: 8px;*/
                display: inline-block;
                text-align: center;
                border: #b1b3c0 1px solid;
                border-radius: 50%;
                .icon {
                    font-weight: 100;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
        .issue-list-btn {
            margin: 14px;
        }
        .issue-list-line {
            width: 90%;
            height: 1px;
            margin: 0 auto;
            background: #dfe2e2;
        }
        .issue-list-content {
            width: 90%;
            padding-bottom: 6px;
            padding-top: 6px;
            border-bottom: 1px solid #dfe2e2;
            margin: 0 auto;
        }
        .issue-lamp {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            /*background: #84bd00;*/
            /*border:#a51017 1px solid;*/
            display: inline-flex;
            position: relative;
            top: 3px;
            /*margin-right: 16px;*/
        }
        .issue-title {
            width: calc(~"100% - 55px");
            float: right;
            cursor: pointer;
            p {
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
        }
    }
</style>
