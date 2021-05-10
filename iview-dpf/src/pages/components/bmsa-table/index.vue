<template>
    <div class="content-inner">
        <Card>
            <bmsa-table>
                <template slot="buttons">
                    <Button type="primary" @click="allAlign = 'left'">
                        <Icon type="md-trash" size="16" />居左
                    </Button>
                    <Button type="primary" @click="allAlign = 'center'">居中</Button>
                    <Button type="primary" @click="allAlign = 'right'">居右</Button>
                </template>
                <vxe-table ref="xTable1"
                           slot="table"
                           :align="allAlign"
                           :data="tableData"
                           :cell-style="cellStyle"
                           height="auto"
                           auto-resize
                           resizable
                           border
                           show-header-overflow
                           highlight-hover-row
                           @radio-change="radioChangeEvent"
                           class="bmsa-table">
                    <vxe-table-column type="seq" title="序号" width="60" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column type="radio" width="60" align="center" >
                        <template #header>
                            <vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow">取消</vxe-button>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="name" title="Name" fixed="left" :formatter="formatterNum" width="120"></vxe-table-column>
                    <vxe-table-column field="sex" title="Sex" :filters="[{label: 'Man', value: 'Man'}, {label: 'Woman', value: 'Woman'}]" width="200">
                    </vxe-table-column>
                    <vxe-table-column type="html" field="address" show-overflow title='<span style="color: blue">HTML 标签与格式化</span>' width="200"></vxe-table-column>
                    <vxe-table-column field="age" title="Age" sortable :filters="[{ data: '' }]" :filter-method="filterAgeMethod" width="200">
                        <template #filter="{ $panel, column }">
                            <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="face" title="政治面貌" width="200"></vxe-table-column>
                    <vxe-table-column field="email" title="邮箱" width="200"></vxe-table-column>
                    <vxe-table-column field="number" title="身份证号" width="200"></vxe-table-column>
                    <vxe-table-column field="school" title="学校" width="200"></vxe-table-column>
                </vxe-table>
            </bmsa-table>
        </Card>
    </div>
</template>
<script>
    import bmsaTable from '@/components/bmsa-table'
    export default {
        name: 'demo-table',
        components: {
            bmsaTable
        },
        data () {
            return {
                allAlign: null,
                tableData: [
                    { id: 10001, name: 'Test1', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃，超长字符串，超长字符串，超长字符串，超长字符串' },
                    { id: 10002, name: 'Test2', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Test', sex: 'Women', age: 22, address: '<img height="40" src="https://xuliangzhan_admin.gitee.io/vxe-table/static/other/img1.gif">' },
                    { id: 10003, name: 'Test3', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10004, name: 'Test4', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
                    { id: 10005, name: 'Test3', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10006, name: 'Test4', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
                    { id: 10005, name: 'Test3', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10006, name: 'Test4', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
                    { id: 10005, name: 'Test3', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10006, name: 'Test4', number: '220182199304115336', school: '清华大学', face: '党员', email: '249009909@qq.com', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
                ],
                selectRow: null, // 单选
            }
        },
        computed: {},
        created () {},
        mounted () {},
        methods: {
            // 格式化姓名
            formatterNum ({ cellValue, row, column }) {
                return cellValue + '自定义'
            },
            // 自定义单元格样式
            cellStyle ({ row, rowIndex, column }) {
                if (column.property === 'sex') {
                    if (row.sex === 'Women') {
                        return {
                            backgroundColor: '#187',
                            color: '#ffffff'
                        }
                    } else if (row.age === 28) {
                        return {
                            backgroundColor: '#2db7f5',
                            color: '#000'
                        }
                    }
                }
            },
            // 单选
            radioChangeEvent ({ row }) {
                this.selectRow = row
                console.log('单选事件')
            },
            // 单选
            clearRadioRowEevnt () {
                this.selectRow = null
                this.$refs.xTable1.$refs.vxeTable.clearRadioRow()
            },
            // 筛选年龄
            filterAgeMethod ({ option, row }) {
                return row.age === Number(option.data)
            }
        }
    };
</script>
<style lang="less" scoped>
    .demo-table {
        width: 100%;
        height: 100%;
    }
</style>
