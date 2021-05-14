import request from '@/plugins/request';
import setting from '@/setting';
const baseUrl = setting.bmsaApiBaseURL;
const baseApiUrl = setting.apiBaseURL;
// 登录
export function AccountLogin (data) {
    return request({
        url: `${baseUrl}/user/login`,
        method: 'post',
        data
    });
}

// 获取用户信息
export function getLoginUser () {
    return request({
        url: `${baseUrl}/user/user_info/cur_login`,
        method: 'get'
    });
}
// 获取用户菜单信息
export function getRouters () {
    return request({
        url: `${baseUrl}/user/menu_info/cur_login`,
        method: 'post'
    });
}
// 退出
export function authLogout () {
    return request({
        url: `${baseUrl}/user/logout`,
        method: 'get'
    });
}
// 注册
export function AccountRegister (data) {
    return request({
        url: `${baseUrl}/user/register`,
        method: 'post',
        data
    });
}
// 修改密码
export function validatePassword (data) {
    return request({
        url: `${baseUrl}/user/user_info/validate_user_password`,
        method: 'post',
        data
    });
}
// 修改密码
export function changePassword (data) {
    return request({
        url: `${baseUrl}/user/user_info/update_user_password`,
        method: 'post',
        data
    });
}
// 重置密码
export function resetPassword (data) {
    return request({
        url: `${baseUrl}/user/user_info/reset_user_password`,
        method: 'post',
        data
    });
}


//
export function getUserLayoutInfo (data) {
    return request({
        url: baseUrl + '/user/user_layout_list_page',
        method: 'get',
        params: data
    });
}


export function getToken(code) {
  return request({
    url: baseApiUrl + '/design/getToken?code='+code,
    method: "post",
  });
}

export function logoutLog(code) {
  return request({
    url: baseApiUrl + '/design/logoutLog',
    method: "get",
  });
}
