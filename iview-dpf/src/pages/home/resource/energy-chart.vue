<template>
    <Row :gutter="24">
        <Col :xl="16" :lg="12" :md="24" :sm="24" :xs="24">
            <h4>用能成本</h4>
            <div ref="visitChart" v-height="260"></div>
        </Col>
        <Col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
            <h4>合计</h4>
            <div v-height="220" style="text-align: center">
                <div ref="pie" v-height="220"></div>
            </div>
            <div v-height="40">
                <p style="padding-top: 12px;font-size: 22px;text-align: center">合计：<span>2939元</span></p>
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
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['电能', '工业用水', '天然气', '压缩空气'],
                        top: '0%'
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
                            type: 'bar',
                            stack: '广告',
                            emphasis: {
                                focus: 'series'
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '工业用水',
                            type: 'bar',
                            stack: '广告',
                            emphasis: {
                                focus: 'series'
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '天然气',
                            type: 'bar',
                            stack: '广告',
                            emphasis: {
                                focus: 'series'
                            },
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '压缩空气',
                            type: 'bar',
                            stack: '广告',
                            emphasis: {
                                focus: 'series'
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                    ]
                };
                this.visitChart.setOption(option);
            },
            handlePieCHaryt () {
                this.pieChart = echarts.init(this.$refs.pie);
                let data = [
                    { value: 1048, name: '电能' },
                    { value: 735, name: '天然气' },
                    { value: 580, name: '工业用水' },
                    { value: 484, name: '压缩空气' }
                ]
                let obj={}
                for(let i = 0; i<data.length;i++){
                    this.total += data[i].value
                    obj[data[i].name] = data[i].value
                }
                let option = {
                    // title:{
                    //     text:'成本比重'
                    // },
                    tooltip: {
                        trigger: 'item',
                        // formatter:''
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        top: '25%',
                        right: '5%',
                        // formatter:function(name){
                        //     return name +' ' + obj[name] + ' 元'
                        // }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '80%',
                            center:['40%','50%'],
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label:{
                                normal: {
                                    show: true,
                                    position: 'inner',
                                    // formatter: '{b}：{d}%'
                                    formatter:function (params) {
                                        return params.value + '元'
                                    }
                                },
                            }
                        }
                    ]
                };
                this.pieChart.setOption(option);
            },
            handleResize () {
                this.visitChart.resize();
                this.pieChart.resize();
            }
        },
        mounted () {
            this.handleSetVisitChart();
            this.handlePieCHaryt()
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
            margin-top: 12px;
        }
    }
</style>
