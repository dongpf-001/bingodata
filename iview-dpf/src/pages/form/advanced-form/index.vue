<template>
    <div>
        <Form ref="form" :model="data" :rules="rules" label-position="top" class="ivu-mt">
            <Card :bordered="false" dis-hover title="同行人员" class="ivu-mt i-table-no-border">
                <Table :data="tableData" :columns="columns">
                    <template slot-scope="{ row, index }" slot="name">
                        <Input type="text" v-model="editName" v-if="editIndex === index" />
                        <span v-else>{{ row.name }}{{index}}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="id">
                        <Input type="text" v-model="editId" v-if="editIndex === index" />
                        <span v-else>{{ row.id }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="department">
                        <Select v-model="editDepartment" v-if="editIndex === index" transfer>
                            <Option v-for="(value, key) in departments" :key="key" :value="key">{{ value }}</Option>
                        </Select>
                        <span v-else>{{ departments[row.department] }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="handleSave(index)" type="success" ghost size="small">
                                <template v-if="!addNew">保存</template>
                                <template v-else>添加</template>
                            </Button>
                            <Button @click="handleCancel" v-if="!addNew" :disabled="addNew" type="primary" ghost size="small" class="ivu-ml">取消</Button>
                            <Button @click="handleDelete(index)" v-else type="error" ghost size="small" class="ivu-ml">删除</Button>
                        </div>
                        <div v-else>
                            <Button @click="handleEdit(row, index)" :disabled="addNew" type="primary" ghost size="small">编辑</Button>
                            <Poptip
                                confirm
                                transfer
                                title="是否要删除此行？"
                                @on-ok="handleDelete(index)">
                                <Button :disabled="addNew" type="error" ghost size="small" class="ivu-ml">删除</Button>
                            </Poptip>
                        </div>
                    </template>
                </Table>
                <Button :disabled="addNew" type="dashed" long icon="md-add" class="ivu-mt" @click="handleAdd">新增成员</Button>
            </Card>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'form-advanced-form',
        data () {
            return {
                data: {
                    tripReason: '',
                    contractId: '',
                    tripTime: [],
                    approve: '',
                    emergencyType: 3,
                    fromCity: '',
                    goTime: '',
                    backTime: '',
                    trafficType: '',
                    toCity: ''
                },
                rules: {
                    tripReason: [
                        { required: true, message: '请填写出差事由', trigger: 'blur' }
                    ],
                    contractId: [
                        { required: true, message: '请填写合同编号', trigger: 'blur' }
                    ],
                    tripTime: [
                        {
                            required: true,
                            type: 'array',
                            message: '请选择出差时间',
                            trigger: 'change',
                            fields: {
                                0: {
                                    type: 'date',
                                    message: '请选择出差时间'
                                },
                                1: {
                                    type: 'date',
                                    message: '请选择出差时间'
                                }
                            }
                        }
                    ],
                    approve: [
                        { required: true, message: '请选择审批人', trigger: 'change' }
                    ],
                    fromCity: [
                        { required: true, message: '请选择出发城市', trigger: 'change' }
                    ],
                    goTime: [
                        { required: true, type: 'date', message: '请选择出发时间', trigger: 'change' }
                    ],
                    backTime: [
                        { required: true, type: 'date', message: '请选择返程时间', trigger: 'change' }
                    ],
                    trafficType: [
                        { required: true, message: '请选择交通类型', trigger: 'change' }
                    ]
                },
                toCityRule: [
                    { required: true, message: '请选择到达城市', trigger: 'change' }
                ],
                users: [
                    {
                        name: 'Aresn',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
                    },
                    {
                        name: '中小鱼',
                        avatar: 'https://dev-file.iviewui.com/userinfoYLhfo1S945BOLuFT96NRStYeYDFRviF5/avatar'
                    },
                    {
                        name: 'Echo',
                        avatar: 'https://dev-file.iviewui.com/userinfoxlXwHVwZkCQtl1Zyd1wrvF78b1rZkhfK/avatar'
                    },
                    {
                        name: '唐不苦',
                        avatar: 'https://dev-file.iviewui.com/userinfosvaY5tb7yfnSFTTimcjy3vuSG6RC28v2/avatar'
                    },
                    {
                        name: '甜筒',
                        avatar: 'https://dev-file.iviewui.com/userinforaP8NeQgYpmKgkpWlqZP7rfewbHiIzJY/avatar'
                    }
                ],
                columns: [
                    {
                        title: '姓名',
                        slot: 'name',
                        minWidth: 120
                    },
                    {
                        title: '工号',
                        slot: 'id',
                        minWidth: 120
                    },
                    {
                        title: '所属部门',
                        slot: 'department',
                        minWidth: 120
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: 140
                    }
                ],
                tableData: [
                    {
                        name: 'Aresn',
                        id: '001',
                        department: 'dev'
                    },
                    {
                        name: '中小鱼',
                        id: '002',
                        department: 'design'
                    },
                    {
                        name: '唐不苦',
                        id: '003',
                        department: 'pm'
                    }
                ],
                departments: {
                    dev: '研发部',
                    design: '设计部',
                    pm: '产品部'
                },
                editIndex: -1,
                editName: '',
                editId: '',
                editDepartment: '',
                addNew: false,
                loading: false
            }
        },
        methods: {
            handleSave (index) {
                if (!this.editName || !this.editId || !this.editDepartment) {
                    this.$Message.error('请填写完整的成员信息！');
                    return;
                }
                this.tableData[index].name = this.editName;
                this.tableData[index].id = this.editId;
                this.tableData[index].department = this.editDepartment;
                this.editIndex = -1;
                this.addNew = false;
            },
            handleCancel () {
                this.editIndex = -1;
                this.addNew = false;
            },
            handleEdit (row, index) {
                this.editName = row.name;
                this.editId = row.id;
                this.editDepartment = row.department;
                this.editIndex = index;
            },
            handleDelete (index) {
                this.tableData.splice(index, 1);
                this.addNew = false;
            },
            handleAdd () {
                this.addNew = true;
                const row = {
                    name: '',
                    id: '',
                    department: ''
                };
                this.tableData.push(row);
                this.handleEdit(row, this.tableData.length - 1);
            },
            handleSubmit () {
                this.$refs.form.validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        setTimeout(() => {
                            this.$Message.success('出差申请提交成功!');
                            this.loading = false;
                        }, 2000);
                    } else {
                        this.loading = false;
                    }
                });
            }
        }
    }
</script>
