<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    <bingo-query ref="query" type="model" :col="query.col" :labelWidth="query.labelWidth" @on-submit="getData"
                                 @on-reset="reset" :data="queryData">
                        <bingo-grid-item>
                            <bingo-form-item label="VIN" prop="vin" label-for="vin">
                                <Input v-model.trim="queryData.vin"/>
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="车型" prop="carType" label-for="carType">
                                <Input v-model.trim="queryData.carType"/>
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="进涂装时间" prop="inTime" label-for="inTime">
                                <Input v-model.trim="queryData.inTime"/>
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item :colspan="2">
                            <bingo-form-item label="出涂装时间" prop="outTime" label-for="outTime">
                                <Input v-model.trim="queryData.outTime"/>
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-query>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、type分为model和flost，当查询条件过多时，modal代表弹出显示全部，float代表下拉显示全部</p>
                    <p style="margin-top: 12px">2、col代表设置每行显示的个数</p>
                    <p style="margin-top: 12px">3、labelWidth代表label的宽度</p>
                    <p style="margin-top: 12px">4、queryData代表要查询数据的集合，@on-submit点击查询后返回查询参数的集合</p>
                    <p style="margin-top: 12px">5、query组件里使用form表单，使用时配合bingo-form-item和bingo-grid-item</p>
                    <p style="margin-top: 12px">6、bingo-grid-item上的colspan代表当前查询条件所占的宽度</p>
                </div>
            </Split>
        </Card>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                split1: 0.2,
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
                },
                queryData: { // 需要查询的数据集合
                    vin: '',
                    carType: '',
                    inTime: '',
                    outTime: ''
                },
            };
        },
        components: {},
        created() {
        },
        mounted() {

        },
        computed: {},
        watch: {},
        methods: {
            getData () {},
            reset () {}
        }
    };
</script>
<style>

</style>
