import request from '@/plugin/request'

const fileHttp = 'docservice/v1/'
// const fileHttp = 'http://172.20.30.31:30014/v1/'

/*
* document
*/
// 按Id获取实体
export function getDocumentList (id) {
  let data = {
    id: id
  }
  return request({
    url: fileHttp + 'documents/',
    method: 'get',
    params: data
  })
}

// 逻辑删除单个文档
export function deleteDocument (id) {
  return request({
    url: fileHttp + 'documents/' + id,
    method: 'delete'
  })
}
// 逻辑删除多个文档
export function deleteMultipleDocument (data) {
  debugger
  return request({
    url: fileHttp + 'documents/deleteByIds',
    method: 'delete',
    data
  })
}
// 重命名文档
export function renameDocuments (data) {
  return request({
    url: fileHttp + 'documents/rename',
    method: 'put',
    data
  })
}
/*
* 文件夹
* */

// 新建文件夹
export function uploadNewFolder (data) {
  return request({
    url: fileHttp + 'folders',
    method: 'post',
    data
  })
}

// 删除单个文件夹
export function uploadDeleteSingleFolder (id) {
  let data = {
    id: id
  }
  return request({
    url: fileHttp + 'folders/' + id,
    method: 'delete'
    // params: data
  })
}
// 文件夹重命名
export function renameFolder (data) {
  return request({
    url: fileHttp + 'folders/rename',
    method: 'put',
    data
  })
}
// 获取实体列表
export function getFoldersList (id) {
  let data = {
    id
  }
  return request({
    url: fileHttp + 'folders',
    method: 'get',
    params: data
  })
}
// 新建子目录
export function newSubFolders (data) {
  return request({
    url: fileHttp + 'folders/newSubFolder',
    method: 'post',
    data
  })
}
// 获取目录
export function getFolders () {
  return request({
    url: fileHttp + 'folders/getContent',
    method: 'get'
  })
}
// 通过idList删除多个文件
export function uploadDeleteMultipleFolders (data) {
  debugger
  return request({
    url: fileHttp + 'folders/deleteByIds',
    method: 'delete',
    data
  })
}
// 文件预览
export function previewFile () {

}
// 获取目录及目录下文件
export function uploadGetContent (data) {
  return request({
    url: fileHttp + 'folders/getContent',
    method: 'get',
    params: data
  })
}

/*
* 文件file
* */

// 获取文件
export function uploadGetFileDetail (id) {
  let data = {
    id: id
  }
  return request({
    url: fileHttp + 'files/',
    method: 'get',
    params: data
  })
}
// 更新
export function updateFile (data) {
  return request({
    url: fileHttp + 'files',
    method: 'put',
    params: data
  })
}

// 重命名文件
export function renameFile (data) {
  return request({
    url: fileHttp + 'files/rename',
    method: 'put',
    data
  })
}
// delete id  按id逻辑删除实体
export function deleteFilesId (id) {
  return request({
    url: fileHttp + 'files/' + id,
    method: 'delete'
  })
}
// clearById 按id进行物理删除
export function clearById (id) {
  let data = {
    id: id
  }
  return request({
    url: fileHttp + 'files/${id}',
    method: 'delete',
    params: data
  })
}
// deleteByIds 根据多个id进行逻辑删除
export function deleteByIds (data) {
  return request({
    url: fileHttp + 'files/deleteByIds',
    method: 'delete',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/*
* 实例
* */

// 查看文件
export function uploadCheckFile (data) {
  return request({
    url: fileHttp + 'storages/checkfile',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 检查文件分片
export function uploadCheckChunk (data) {
  return request({
    url: fileHttp + 'storages/checkchunk',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 合并文件
export function uploadFileMerge (data) {
  return request({
    url: fileHttp + 'storages/merge',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 上传文件
export const uploadFileUrl = fileHttp + 'storages/upload'
// 下载文件
export const uploadDownFileUrl = 'docservice' + 'storages/download/file/'
// office-online地址
export const officeOnlineUrl = 'http://172.20.30.43/op/view.aspx?src='
