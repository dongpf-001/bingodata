import request from '@/plugin/request'

// export function AccountLogin (data) {
//     return request({
//         url: '/api/login',
//         method: 'post',
//         data
//     });
// }
export function AccountLogin(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

export function getUserUrlPermissions(data) {
    return request({
        url: 'organization/auth/user-url-permissions',
        method: 'get',
        params: data
    })
}

export function getLoginUser(data) {
    return request({
        url: 'auth/loginUser',
        method: 'get',
        data
    })
}

// export function getLoginUser (data) {
//     return request({
//         url: 'organization/department/user/login-user/'+data,
//         method: 'get',
//     });
// }

export function authLogout(data) {
    return request({
        url: 'auth/logout',
        method: 'get',
        data
    })
}

export function AccountRegister(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}

export function getButtonAuth(data) {
    return request({
        url: 'organization/auth/button-auth',
        method: 'get',
        params: data
    })
}

// 布局-获取list
export function getUserLayout(data) {
    return request({
        url: 'organization/department/user-layout/user-layout',
        method: 'get',
        params: data
    })
}

// 布局-删除
export function delLayoutSave(data) {
    return request({
        url: 'organization/department/user-layout/' + data.id,
        method: 'delete',
        data
    })
}

// 布局-新增
export function userLayoutSave(data) {
    return request({
        url: 'organization/department/user-layout/update-user-layout',
        method: 'post',
        data
    })
}

// 布局-更新
export function userLayoutEdit(data) {
    return request({
        url: 'organization/department/user-layout/update-user-layout',
        method: 'put',
        data
    })
}

// 布局-获取布局信息
export function getUserLayoutInfo(data) {
    return request({
        url: 'organization/department/user-layout-list/user-layout-list',
        method: 'get',
        params: data
    })
}
