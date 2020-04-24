import request from '@/plugin/request'

const systemId = 'task'
const folderId = '0003'

// 查询所有组织
export function getAllOrganization (data) {
  return request({
    url: '/organization/department/org/page',
    method: 'get',
    params: data
  })
}

// 获取查询的组织
export function getOrganizationByName (data) {
  return request({
    url: '/organization/department/org/listByName/' + data,
    method: 'get',
    params: data
  })
}

// user
export function getUserList (data) {
  return request({
    url: '/organization/department/user/page',
    method: 'get',
    params: data
  })
}

// radio
export function getRadioData (data) {
  return request({
    url: '/masterdata/dict/dict-item/getDictItemByDictCode/sex',
    method: 'get',
    params: data
  })
}

// 组织结构
export function getOragnizationData (data) {
  return request({
    url: '/organization/department/org/children',
    method: 'get',
    params: data
  })
}

export function getTableMockData (data) {
  return request({
    url: '/api/demo/getData',
    method: 'get',
    params: data
  })
}

export function getTableData (data) {
  return request({
    url: '/demo/user/sap-user/pageByQueryWrapper',
    method: 'get',
    params: data
  })
}

export function addTableData (data) {
  return request({
    url: '/demo/user/sap-user',
    method: 'post',
    data: data
  })
}

export function editTableData (data) {
  return request({
    url: '/demo/user/sap-user',
    method: 'put',
    data: data
  })
}

export function delTableData (data) {
  return request({
    url: '/demo/user/sap-user/' + data,
    method: 'delete'
  })
}

export function deleteBatch (data) {
  return request({
    url: '/demo/user/sap-user/batch?ids=' + data.ids,
    method: 'delete'
  })
}

export function getTableDetail (data) {
  return request({
    url: '/demo/user/sap-user/' + data,
    method: 'get'
  })
}

// 导出用户信息
export function exportExcel (data) {
  return request({
    url: '/demo/user/sap-user/export',
    method: 'post',
    data
  })
}

// 获取导入进度
export function getProcessBykey (data) {
  return request({
    url: '/tpb/commons/import/' + data.progressKey,
    method: 'get',
    params: data
  })
}

// 上传文件
export const uploadFile = 'http://172.20.30.31:30005/api/v1/demo/file/uploadFile'
export const uploadImportFile = 'http://172.20.30.31:30005/api/v1/tpb/tpbs/import'

// 导入用户信息
export const excelsImport = 'http://172.20.30.31:30005/api/v1/user/ts-sap-user/import'

// 下载文件路径
// export const download = request.defaults.baseURL + '/docservice/';
export const download = 'http://172.20.30.31:30005/api/v1/docservice'
