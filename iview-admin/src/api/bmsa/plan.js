import request from '@/plugin/request'

const URI = '/plan-center/plans'

export function PlanList () {
  return request({
    url: `${URI}`,
    method: 'get'
  })
}

// 分页查询
export function Page (data) {
  return request({
    url: `${URI}/page`,
    method: 'get',
    params: data
  })
}

// 新建计划信息
export function Insert (data) {
  return request({
    url: `${URI}`,
    method: 'post',
    data
  })
}

// 修改计划信息
export function Update (data) {
  return request({
    url: `${URI}`,
    method: 'put',
    data
  })
}

// 删除计划信息
export function Delete (id) {
  return request({
    url: `${URI}/${id}`,
    method: 'delete'
  })
}

// 根据ID获取用户信息
export function SelectById (id) {
  return request({
    url: `${URI}/${id}`,
    method: 'get'
  })
}

// 删除一条用户信息
export function UserListOneDelete (data) {
  return request({
    url: `${URI}`,
    method: 'delete',
    data
  })
}

// 导出用户信息
export function excels (data) {
  return request({
    url: `${URI}`,
    method: 'post',
    data
  })
}
