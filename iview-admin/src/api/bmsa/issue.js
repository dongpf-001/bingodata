import request from '@/plugin/request'

// 微议题查询人员
export function getIssueUserList (data) {
  return request({
    url: '/microissues/member/page?issuseId=' + data.id,
    method: 'get',
    data
  })
}

// 微议题列表根究条件查询接口
export function getIssueListByQuery (data) {
  return request({
    url: '/microissues/issues/page?status=' + data.status +
            '&userId=' + data.userId + '&title=' + data.title,
    method: 'get',
    data
  })
}

// 获取微议题列表
export function getIssueList (data) {
  return request({
    url: '/microissues/issues/page',
    method: 'get',
    params: data
  })
}

// 新建微议题
export function createIssue (data) {
  return request({
    url: '/microissues/issues',
    method: 'post',
    data
  })
}

// 微议题编辑获取参与的人员
export function issueUserEdit (data) {
  return request({
    url: '/e',
    method: 'post',
    data
  })
}

// 微议题终止   同时也可以编辑微议题主题
export function issueStop (data) {
  return request({
    url: '/microissues/issues',
    method: 'put',
    data
  })
}

// 微议题删除人员
export function issueUserDelPost (data) {
  return request({
    url: '/microissues/member/deleteByMembers',
    method: 'delete',
    data
  })
}

// 微议题新建人员
export function issueUserPost (data) {
  debugger
  return request({
    url: '/microissues/member/insertList',
    method: 'post',
    data
  })
}
