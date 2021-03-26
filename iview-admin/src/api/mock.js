import axios from '@/libs/api.request'

// 获取表格数据
export const getTableData = () => {
    return axios.request({
        url: 'getTableDataList',
        method: 'get'
    })
}
