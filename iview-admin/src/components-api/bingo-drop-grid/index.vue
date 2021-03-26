<template>
    <div style="width: 100%;display:inline-block;" v-resize="handleResize" class="drop-grid">
        <Select class="ivu-hide" v-model="model" filterable :multiple="multiple" @on-change="change">
            <Option v-for="(item, index) in selectList" :value="item[keyValue]" :key="index">{{item[keyName]}}</Option>
        </Select>
        <Tooltip :content="modelString" :disabled="(model==''||!model)||!multiple" max-width="800" style="width: 100%">
            <Select class="drop-select" :max-tag-count="maxTag" :max-tag-placeholder="maxTagPlaceholder" v-bind="$attrs"
                    v-on="$listeners" :transfer="transfer" v-model="model" placeholder=""
                    style="width:100%;white-space:nowrap;" filterable :clearable="clearable" :disabled="disabled"
                    :multiple="multiple" :remote-method="remoteMethod"
                    @on-change="change" @on-open-change="openChange" ref="select">
                <Option v-for="item in selectList" :value="item[keyValue]" class="drop-grid ivu-hide">
                    {{item[keyName]}}
                </Option>
                <Row class="ivu-p-8 selectRow " ref="rowTable" style="overflow: hidden">
                    <bingo-table
                            v-if="multiple"
                            :layoutShow="false"
                            ref="table"
                            :toolbar="false"
                            @getData="getData"
                            :height="200"
                            :columns="columns"
                            :data="data"
                            :border="true"
                            :page="true"
                            :pageSetting="pageSetting"
                            @on-select="onSelectChange"
                            @on-select-all="onSelectChange"
                            @on-select-all-cancel="onSelectAllCancel"
                            @on-select-cancel="onSelectCancel"
                    >
                        <template slot-scope="{ row, index }" v-for="col in columns" :slot="col.slot">
                            <slot :name="col.slot" :row="row" :index="index"></slot>
                        </template>
                    </bingo-table>
                    <bingo-table
                            v-if="!multiple"
                            ref="table"
                            :layoutShow="false"
                            
                            @on-row-click="rowClick"
                            @getData="getData"
                            :highlight="true"
                            :toolbar="false"
                            :height="200"
                            :columns="columns"
                            :data="data"
                            :border="true"
                            :page="true"
                            :pageSetting="pageSetting"
                    
                    >
                        <template slot-scope="{ row, index }" v-for="col in columns" :slot="col.slot">
                            <slot :name="col.slot" :row="row" :index="index"></slot>
                        </template>
                    </bingo-table>
                </Row>
            </Select>
        </Tooltip>
    </div>
</template>
<script>
    import {Select, Option, OptionGroup} from '@/components-api/iview/components/select'
    import bingoTable from '../bingo-table'
    import Vue from 'vue'

    export default {
        name: 'drop-grid',
        template: '<div><input type="text" type="text" v-model="model"/></div>',
        data() {
            return {
                cityList: [],
                flag: false,
                selectList: [],
                data: [],
                selection: []
            }
        },
        props: {
            value: {
                type: [String, Number, Array]
            },
            transfer: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: true
            },
            assignmentFlag: {
                type: Boolean,
                default: false
            },
            maxTag: {
                type: Number,
                default: 1
            },
            keyName: {
                type: String
            },
            keyValue: {
                type: String
            },
            tableWidth: {
                type: String,
                default: '0'
            },
            pageSetting: {
                type: Object
            },
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array
            },
            draggable: {
                type: Boolean,
                default: false
            },
            footerHide: {
                type: Boolean,
                default: false
            },
            maskClosable: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            maxTagPlaceholder(num) {
                return '+' + num
            },
            setSelectList(list) {
                this.selectList = list
            },
            rowClick(row) {
                this.model = row[this.keyValue]
                this.setFlag()
                // this.$el.click();
                this.$refs.select.hideMenu()
                this.$emit('on-row-click', row)
            },
            onSelectChange(selection, data) {
                for (let row of selection) {
                    if (this.model.indexOf(row[this.keyValue]) == -1) {
                        this.selectList.push(row)
                        this.model.push(row[this.keyValue])
                    }
                }
                this.selection = selection
                this.$emit('on-select-change', selection)
            },
            onSelectCancel(item, selection) {
                for (let index in this.model) {
                    if (this.model[index] == selection[this.keyValue]) {
                        this.model.splice(index, 1)
                    }
                }
            },
            onSelectAllCancel() {
                for (let d of this.data) {
                    for (let index in this.model) {
                        if (this.model[index] == d[this.keyValue]) {
                            this.model.splice(index, 1)
                        }
                    }
                }
            },
            remoteMethod(val, data) {
                if (this.flag == false) {
                    if (val && val != '' && val != this.value && val != this.selectList[this.value]) {
                        this.getData({[this.keyName]: val})
                    } else {
                        this.getData()
                    }
                }
            },
            setFlag() {
                this.flag = true
                setTimeout(() => {
                    this.flag = false
                }, 1)
            },
            getData(param) {
                let params = {}
                params = Object.assign(this.$refs.table.getParams(), param)
                let _this = this
                this.$refs.table.setLoading()
                this.$emit('getData', params, function (res) {
                    _this.$refs.table.loading = false
                    _this.pageSetting.pageTotal = res.data.total
                    _this.data = res.data.rows
                    _this.selectList = _this.selectList.concat(res.data.rows)
                    _this.selectList = Array.from(new Set(_this.selectList))
                    _this.setFlag()
                    _this.change('', _this.selectList)
                })
            },
            openChange(data) {
                if (data && this.selectList.length == 0) {
                    this.getData()
                }
            },
            getSelectList() {
                let superQueryParams = []
                if (this.value && this.value != '') {
                    if (this.multiple) {
                        superQueryParams = [{field: this.keyValue, rule: 'in', val: this.model.toString()}]
                    } else {
                        superQueryParams = [{field: 'id', rule: 'eq', val: this.model.toString()}]
                    }
                    let params = Object.assign(this.$refs.table.getParams(), {superQueryParams: escape(JSON.stringify(superQueryParams))})
                    //  let params=Object.assign(this.$refs.table.getParams(),{superQueryParams:superQueryParams});
                    let _this = this
                    if (this.assignmentFlag) {
                        this.$emit('assignmentFun', params, function (res) {
                            _this.selectList = _this.selectList.concat(res.data.rows)
                            if (_this.multiple) {
                                _this.getData()
                            }
                        })
                    } else {
                        this.$emit('getData', params, function (res) {
                            _this.selectList = _this.selectList.concat(res.data.rows);
                            [{
                                'id': 15159,
                                'fax': '',
                                'degree': '本科',
                                'version': 'Vnull',
                                'nachn': '',
                                'stell': '50032038',
                                'name': '杨可凡',
                                'isHistory': '',
                                'phoneSstp': '',
                                'displayName': '',
                                'creatorId': '',
                                'idCodeRight': '304130',
                                'ortOne': '',
                                'orgeh': '50129851',
                                'subGroupCode': '1N',
                                'gradDate': '2015-08-04',
                                'department': 'TAC1',
                                'officeLocal': '',
                                'email': 'YangKefan@CSVW.COM',
                                'pernr': '12335'
                            }]
                            if (_this.multiple) {
                                _this.getData()
                            }
                        })
                    }
                }
            },
            change(data, tableData) {
                for (let index in this.selectList) {
                    if (typeof this.model === 'object' && this.multiple) {
                        if (this.model.indexOf(this.selectList[index][this.keyValue]) != -1) {
                            this.selectList[index]._checked = true
                            Vue.set(this.selectList, index, this.selectList[index])
                        } else {
                            this.selectList[index]._checked = false
                            Vue.set(this.selectList, index, this.selectList[index])
                        }
                    }
                }
            },
            handleResize() {
                if (this.tableWidth == '0') {
                    this.$refs.rowTable.$el.style.width = this.$el.offsetWidth + 'px'
                } else {
                    this.$refs.rowTable.$el.style.width = this.tableWidth + 'px'
                }
            }

        },
        components: {
            Select, bingoTable
        },
        mounted() {
            if (this.value) {
                this.getSelectList()
            }
        },
        watch: {
            model(nVal, oVal) {
                if (this.multiple && (nVal.toString() != oVal.toString())) {
                    this.getSelectList()
                } else if ((nVal != oVal) && !this.multiple) {
                    if (this.flag == false) {
                        this.getSelectList()
                    }
                }
                if (nVal && nVal.length == 0) {
                    this.$refs.table.$refs.table.selectAll(false)
                }
            }
        },
        computed: {
            modelString() {
                let string = []
                for (let item of this.selectList) {
                    if (this.model && this.model.length > 0) {
                        for (let m of this.model) {
                            if (item[this.keyValue] == m) {
                                string.push(item[this.keyName])
                            }
                        }
                    }
                }
                string = Array.from(new Set(string))
                return string.toString()
            },
            model: {
                get: function () {
                    return this.value
                },
                set: function (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>
<style>
    
    .drop-grid .ivu-select-dropdown {
        display: block;
        min-width: inherit !important;
        
    }
    
    .demo-auto-complete-item {
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .demo-auto-complete-group {
        font-size: 12px;
        padding: 4px 6px;
    }
    
    .demo-auto-complete-group span {
        color: #666;
        font-weight: bold;
    }
    
    .demo-auto-complete-group a {
        float: right;
    }
    
    .demo-auto-complete-count {
        float: right;
        color: #999;
    }
    
    .demo-auto-complete-more {
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
    
    .drop-grid .ivu-select-dropdown {
        max-height: 400px !important;
    }
    
    .drop-grid .selectRow {
        /*height: 300px;*/
        /*width: 400px;*/
    }
    
    .ivu-hide {
        display: none;
    }
    
    .drop-select div {
        overflow-x: hidden;
    }
    
    .drop-select div::-webkit-scrollbar {
        display: none;
        /*height: 1px;*/
        
    }
    
    .drop-grid .ivu-select-multiple .ivu-select-selection {
        padding: 0 0px 0 4px !important;
    }
    
    .ivu-tooltip-popper {
        z-index: 19168 !important;
    }
</style>
