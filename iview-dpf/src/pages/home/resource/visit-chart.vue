<template>
    <Row :gutter="24">
        <Col :xl="16" :lg="12" :md="24" :sm="24" :xs="24">
            <h4>能耗走势</h4>
            <div ref="visitChart" v-height="260"></div>
        </Col>
        <Col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
            <h4>能耗数据</h4>
            <div v-height="240">
                <ul>
                    <li v-for="(item, index) in data" :key="item">
                        <Row type="flex" justify="center" align="middle">
                            <Col span="14">
                                <Avatar size="small" v-color="'#1890ff'" v-bg-color="'#e6f7ff'" class="ivu-mr-8">{{ index+1 }}</Avatar>
                                <span>{{item.name}}</span>
                            </Col>
                            <Col span="10" class="ivu-text-right">
                                {{item.value}}
                            </Col>
                        </Row>
                    </li>
                </ul>
            </div>
        </Col>
    </Row>
</template>
<script>
    import echarts from 'echarts';

    export default {
        data () {
            return {
                data: [
                    {
                        name: '电能',
                        value: '416 KWh'
                    }, {
                        name: '纯水',
                        value: '369 m³'
                    }, {
                        name: '工业用水',
                        value: '369 m³'
                    }, {
                        name: '天然气',
                        value: '369 m³'
                    }, {
                        name: '压缩空气',
                        value: '211 m³'
                    }, {
                        name: '冷水',
                        value: '369 m³'
                    }, {
                        name: '废水',
                        value: '322 m³'
                    }
                ]
            }
        },
        methods: {
            handleSetVisitChart () {
                this.visitChart = echarts.init(this.$refs.visitChart);
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // }
                    },
                    legend: {
                        data: ['电能', '纯水', '工业用水', '天然气', '压缩空气', '冷水', '废水'],
                        top: '0%',
                    },
                    grid: {
                        top: '15%',
                        left: '3%',
                        right: '4%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '电能',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '纯水',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '工业用水',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '天然气',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '压缩空气',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '冷水',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '废水',
                            type: 'line',
                            smooth: true, //平滑曲线显示
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                    ]
                };
                this.visitChart.setOption(option);
            },
            handleResize () {
                this.visitChart.resize();
            }
        },
        mounted () {
            this.handleSetVisitChart();
        },
        beforeDestroy () {
            if (this.visitChart) {
                this.visitChart.dispose();
                this.visitChart = null;
            }
        }
    }
</script>
<style lang="less" scoped>
    ul{
        li{
            list-style-type: none;
            margin-top: 14px;
        }
    }
</style>
