<template>
    <div v-resize="handleResize">
        <Card :bordered="false" dis-hover>
            <div>
                <Row type="flex" justify="center" align="middle">
                    <Col span="8">
                        <!--<Avatar icon="ios-podium" size="small" v-color="'#1890ff'" v-bg-color="'#e6f7ff'" />-->
                        <h4>能耗总览</h4>
                    </Col>
                    <Col span="16" class="ivu-text-right">
                        <RadioGroup v-model="visitType" type="button" class="ivu-mr-8" @on-change="handleChangeVisitType">
                            <Radio label="day">本日</Radio>
                            <Radio label="yesterday">昨日</Radio>
                            <Radio label="week">本周</Radio>
                            <Radio label="month">本月</Radio>
                        </RadioGroup>
                        <DatePicker v-model="visitDate" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                </Row>
            </div>
        </Card>
        <Row :gutter="20" class="dashboard-console-grid">
            <i-col class="ivu-mb col-card">
                <Card :bordered="false">
                    <a href="javascript:void(0)">
                        <Icon type="ios-flag" color="#1296db"/>
                        <p>能耗比：200</p>
                    </a>
                </Card>
            </i-col>
            <i-col class="ivu-mb col-card">
                <Card :bordered="false">
                    <a href="javascript:void(0)">
                        <Icon type="md-podium" color="#95de64" />
                        <p>能耗成本：200</p>
                    </a>
                </Card>
            </i-col>
            <i-col class="ivu-mb col-card">
                <Card :bordered="false">
                    <a href="javascript:void(0)">
                        <Icon type="ios-pie-outline" color="#ff9c6e"/>
                        <p>碳排放量：200</p>
                    </a>
                </Card>
            </i-col>
            <i-col class="ivu-mb col-card">
                <Card :bordered="false">
                    <a href="javascript:void(0)">
                        <Icon type="ios-clock-outline" color="#b37feb"/>
                        <p>能耗标准值：200</p>
                    </a>
                </Card>
            </i-col>
            <i-col class="ivu-mb col-card">
                <Card :bordered="false">
                    <a href="javascript:void(0)">
                        <Icon type="ios-speedometer-outline" color="#ffd666" />
                        <p>单车能耗成本：200</p>
                    </a>
                </Card>
            </i-col>
        </Row>
        <Card style="margin-bottom: 16px">
            <visit-chart ref="visitChart" />
        </Card>
        <Card>
            <energy-chart ref="visitChart" />
        </Card>
    </div>
</template>
<script>
    import visitChart from './visit-chart';
    import energyChart from './energy-chart.vue';
    export default {
        name: 'resource',
        data () {
            return {
                visitType: 'day', // 日期
                visitDate: [(new Date()), (new Date())], // 日期
                grid: {
                    xl: 4,
                    lg: 4,
                    md: 8,
                    sm: 8,
                    xs: 8
                }
            }
        },
        components: {
            visitChart, energyChart
        },
        methods: {
            // 切换日期
            handleChangeVisitType (val) {
                if (val === 'day') {
                    this.visitDate = [(new Date()), (new Date())];
                } else if (val === 'yesterday') {
                    this.visitDate = [(new Date() - 1000*60*60*24), (new Date())];
                } else if (val === 'week') {
                    this.visitDate = [(new Date() - 1000*60*60*24*7), (new Date())];
                } else if (val === 'month') {
                    this.visitDate = [(new Date() - 1000*60*60*24*30), (new Date())];
                }
            },
            // 监听页面宽度变化，刷新表格
            handleResize () {
                this.$refs.visitChart.handleResize();
            }
        },
        mounted () {
        },
    }
</script>
<style lang="less" scoped>
    .dashboard-console-grid{
        text-align: center;
        margin-top: 16px;
        .ivu-card-body{
            padding: 0;
        }
        i{
            font-size: 32px;
        }
        a{
            display: block;
            color: inherit;
            padding: 16px;
        }
        p{
            margin-top: 8px;
        }
        .col-card {
            float: left;
            width: 20%;
        }
    }
</style>
