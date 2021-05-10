import request from '@/plugins/request'
import setting from '@/setting'
const baseUrl = setting.bmsaApiBaseURL
let Api = {}
const sys = '/user/'
const pre = 'menu_info'
// 列表
Api.tableList = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}_page`,
        method: 'get',
        params: data
    })
}
// 常用列表
Api.tableDefaultList = function(data) {
    return request({
        url: baseUrl + '/design/function_use_topN',
        method: 'get',
        params: data
    })
}
// 查看
Api.getTableById = function(id) {
    return request({
        url: `${baseUrl}${sys}${pre}_id/${id}`,
        method: 'get'
    })
}
// 新增
Api.addTable = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}`,
        method: 'post',
        data
    })
}
// 编辑
Api.editTable = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}`,
        method: 'patch',
        data
    })
}
// 删除
Api.deleteTable = function(id) {
    return request({
        url: `${baseUrl}${sys}${pre}/${id}`,
        method: 'delete'
    })
}
// 批量删除
Api.deleteTableAll = function(ids) {
    return request({
        url: `${baseUrl}${sys}${pre}_ids/${ids}`,
        method: 'delete'
    })
}
// 角色查菜单
Api.getMenusByRole = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/role_menus_tbs_bts`,
        method: 'post',
        data
    })
}
// 菜单查功能权限
Api.getAuthByMenu = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/func_auth`,
        method: 'post',
        data
    })
}
// 生成模块Id
Api.generateModuleId = function(data) {
    return request({
        url: `${baseUrl}${sys}${pre}/module_id`,
        method: 'post',
        data
    })
}
export default Api
