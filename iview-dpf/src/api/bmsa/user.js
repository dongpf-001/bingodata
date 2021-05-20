import request from '@/plugins/request';
import setting from '@/setting';
const baseUrl = setting.bmsaApiBaseURL;
let Api = {};
const sys = '/user/';
const pre = 'user_info';
// 列表
Api.tableList = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}_page`,
        method: 'get',
        params: data,
    });
};
// 查看
Api.getTableById = function(id) {
    return request({
        url: `${baseUrl}${sys}${pre}_id/${id}`,
        method: 'get',
    });
};
// 新增
Api.addTable = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}`,
        method: 'post',
        data,
    });
};
// 编辑
Api.editTable = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}`,
        method: 'patch',
        data,
    });
};
// 删除
Api.deleteTable = function(id) {
    return request({
        url: `${baseUrl}${sys}${pre}/${id}`,
        method: 'delete',
    });
};
// 批量删除
Api.deleteTableAll = function(ids) {
    return request({
        url: `${baseUrl}${sys}${pre}_ids/${ids}`,
        method: 'delete',
    });
};
// 群组查用户
Api.getUsersByGroup = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/group_users`,
        method: 'post',
        data,
    });
};
// 角色查用户
Api.getUsersByRole = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/role_users`,
        method: 'post',
        data,
    });
};
// 部门查用户
Api.getUsersByDept = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/dept_users`,
        method: 'post',
        data,
    });
};
// 修改密码
Api.changePassword = function (data) {
    return request({
        url: `${baseUrl}//user/user_info/update_user_password`,
        method: 'post',
        data
    });
}

Api.resetPassword = function (data) {
    return request({
        url: `${baseUrl}/user/user_info/reset_user_password`,
        method: 'post',
        data
    });
}
export default Api;
