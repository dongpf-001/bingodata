import request from '@/plugins/request';
import setting from '@/setting'
const baseUrl = setting.bmsaApiBaseURL
let Api = {}

// 列表
Api.getList = function(data) {
    return request({
        url: baseUrl + '/api/getDropData',
        method: 'get',
        params: data
    });
}

export default Api
