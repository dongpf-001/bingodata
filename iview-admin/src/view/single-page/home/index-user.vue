<template>
    <Card class="index-user index-margin" :style="{height: (widths>1440?140:180) + 'px'}">
        <div :class="[ widths>1440 ? 'user-img' : 'user-img1']">
            <a href="#">
                <img src="../../../assets/images/user.jpg"/>
            </a>
        </div>
        <div :class="[ widths>1440 ? 'user-right' : 'user-right1']">
            <p :class="[ widths>1440 ? 'user-name' : 'user-name1']">{{userInfo.name}}</p>
            <p :class="[ widths>1440 ? 'user-position' : 'user-position1']">{{userInfo.org}}<span class="user-id">员工号：{{userInfo.number}}</span>
            </p>
            <div class="user-button">
                <ul>
                    <li>
                        <i class="ivu-icon ivu-icon-ios-person" @click="modalUserInfo"></i>
                    </li>
                    <li>
                        <i class="ivu-icon ivu-icon-md-list-box"></i>
                    </li>
                    <li>
                        <i class="ivu-icon ivu-icon-md-notifications"></i>
                    </li>
                    <li>
                        <i class="ivu-icon ivu-icon-ios-flag"></i>
                    </li>
                </ul>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: 'index-card',
        components: {},
        props: {
            widths: {
                type: Number,
                default: 1450
            }
        },
        data() {
            return {
                userInfo: { // 人员信息
                    name: '吴慈仁',
                    org: 'EPK 高级经理',
                    number: '10001'
                }
            }
        },
        mounted() {
        },
        methods: {
            modalUserInfo() {
            }
        }
    }
</script>

<style scoped>
</style>
