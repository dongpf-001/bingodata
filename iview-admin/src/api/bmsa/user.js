import request from '@/plugin/request'
import Setting from '@/setting'

export function UserList(data) {
    return request({
        // url: '/demo/users/page?current=1&size=30',
        url: '/demo/users/page?pageNum=' + data.pageNum + '&pageSize=' + data.pageSize,
        method: 'get',
        data
    })
}

// 新建用户信息
export function UserListAdd(data) {
    return request({
        url: '/demo/users',
        method: 'post',
        data
    })
}

// 编辑用户信息
export function UserListEdit(data) {
    return request({
        url: '/demo/users',
        method: 'put',
        data
    })
}

// 根据ID获取用户信息
export function UserListModify(data) {
    return request({
        url: '/demo/users/' + data.id,
        method: 'get',
        data
    })
}

// 删除一条用户信息
export function UserListOneDelete(data) {
    console.log(data)
    return request({
        url: '/demo/users/' + data.id,
        method: 'delete',
        data
    })
}

// 分页查询
export function QueryPageSize(data) {
    return request({
        url: '/demo/users/page',
        method: 'get',
        data
    })
}

// 导出用户信息
export function excels(data) {
    return request({
        url: '/demo/users/export',
        method: 'get',
        params: data
    })
}

// 导入用户信息
export const excelsImport = Setting.apiBaseURL + 'users/import'

// 表格自动化布局

export function getUserLayout(data) {
    return request({
        url: '/department/user-layout/user-layout',
        method: 'get',
        data
    })
}

// 新建用户信息
export function addUserLayout(data) {
    return request({
        url: '/department/user-layout/user-layout',
        method: 'post',
        data
    })
}

export function getUserLayoutById(data) {
    return request({
        url: '/demo/users/' + data.id,
        method: 'get',
        data
    })
}

export function delUserLayout(data) {
    return request({
        url: '/department/user-layout/user-layout' + data.id,
        method: 'delete',
        data
    })
}
