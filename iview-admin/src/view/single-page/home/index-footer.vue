<template>
    <Row :gutter="16" v-if="widths<=786" style="margin-top: 16px;margin-bottom: 16px">
        <i-col span="12">
            <Card class="index-card-recom index-card-bg1" style="height: 120px">
                <div class="index-card-body index-card-body-recom">
                    <div class="index-card-recom-bg">
                        <span class="card-title">参与的项目</span>
                    </div>
                </div>
            </Card>
        </i-col>
        <i-col span="12">
            <Card class="index-card-recom index-card-bg2" style="height: 120px">
                <div class="index-card-body index-card-body-recom">
                    <div class="index-card-recom-bg">
                        <span class="card-title2">推荐</span>
                    </div>
                </div>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    export default {
        name: 'index-card',
        components: {
        },
        props: {
            widths: Number,
        },
        data () {
            return {
            };
        },
        mounted () {
        },
        methods: {
        }
    };
</script>

<style>
    .row-card {
        height: 35px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
