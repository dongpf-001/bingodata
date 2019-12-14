<template>
    <Card class="index-card" :class="[ widths>1440 ? 'index-card-col' : 'index-card-col3']" style="height: 140px">
        <div class="index-card-body" :class="[ widths>1440 ? 'index-card-body1' : 'index-card-body3']">
            <div class="card-title">{{data.title}}</div>
            <div class="chart">
                <img src="../../../assets/images/chart1.png" style="width: 70%; margin: 0 auto;"/>
                <Row class="row">
                    <i-col span="12" class="num" :class="{ 'row-card3': widths>1440 }">
                        <span class="red">{{data.persent}}</span>/{{data.persentAll}}
                    </i-col>
                    <i-col span="12" class="title" :class="{ 'row-card3': widths>1440 }">
                        <span class="red">{{data.state}}</span>/{{data.persentAllStr}}
                    </i-col>
                </Row>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: 'index-card',
        components: {
        },
        props: {
            widths: Number,
            data: {
                type: Object,
                default () {
                    return {};
                }
            },
            styles: {
                type: Object,
                default () {
                    return {};
                }
            }
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
    .row-card3 {
        height: 35px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
