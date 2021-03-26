import request from '@/plugin/request'

// 微议题查询人员
export function getIssueUserList(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/member/page?issuseId=' + data.id,
        method: 'get',
        data
    })
}

// 微议题列表根究条件查询接口
export function getIssueListByQuery(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/issues/page?status=' + data.status +
                '&typeId=' + data.typeId + '&userId=' + data.userId + '&title=' + data.title,
        method: 'get',
        data
    })
}

// 获取微议题列表
export function getIssueList(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/issues/page?status=' + data.status +
                '&typeId=' + data.typeId + '&userId=' + data.userId,
        method: 'get',
        data
    })
}

// 新建微议题
export function createIssue(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/issues',
        method: 'post',
        data
    })
}

// 微议题编辑获取参与的人员
export function issueUserEdit(data) {
    return request({
        url: '/e',
        method: 'post',
        data
    })
}

// 微议题终止   同时也可以编辑微议题主题
export function issueStop(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/issues',
        method: 'put',
        data
    })
}

// 微议题删除人员
export function issueUserDelPost(data) {
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/member/deleteByMembers',
        method: 'delete',
        data
    })
}

// 微议题新建人员
export function issueUserPost(data) {
    debugger
    return request({
        url: 'http://172.20.30.31:30023/api/v1/microissues/member/insertList',
        method: 'post',
        data
    })
}

export function ModelList(data) {
    return request({
        // url: '/demo/users/page?current=1&size=30',
        url: '/queryDef?current=' + data.current + '&size=' + data.size + '&name=' + data.name,
        method: 'get',
        data
    })
}

export function ModelPublish(data) {
    return request({
        url: '/publish?modelId=' + data,
        method: 'get',
        data
    })
}

export function ModelDelete(data) {
    return request({
        url: '/delete?modelId=' + data,
        method: 'delete',
        data
    })
}

export function ModelrevokePublish(data) {
    return request({
        url: '/revokePublish?modelId=' + data,
        method: 'delete',
        data
    })
}

// 启动流程
export function ModelStart(data) {
    return request({
        url: '/startProcess/' + data,
        method: 'post',
        data
    })
}

export function variableList(data) {
    return request({
        url: '/variable',
        method: 'post',
        data
    })
}

export function saveVariable(data) {
    return request({
        url: '/variableSave',
        method: 'post',
        data
    })
}

export function TaskList(data) {
    return request({
        url: '/querytask',
        method: 'post',
        data
    })
}

export function Suspence(data) {
    return request({
        url: '/suspense?processInstanceId=' + data.id,
        method: 'get',
        data
    })
}

export function Active(data) {
    return request({
        url: '/active?processInstanceId=' + data.id,
        method: 'get',
        data
    })
}

export function Complete(data) {
    return request({
        url: '/complete/' + data.id,
        method: 'post',
        data
    })
}

export function Designate(data) {
    return request({
        url: '/designate',
        method: 'post',
        data
    })
}

export function Jump(data) {
    return request({
        url: '/jump',
        method: 'post',
        data
    })
}

export function signalList(data) {
    return request({
        url: '/querySignals',
        method: 'post',
        data
    })
}

export function sendSignal(data) {
    return request({
        url: '/sendSignal',
        method: 'post',
        data
    })
}

export function messageList(data) {
    return request({
        url: '/queryMessages',
        method: 'post',
        data
    })
}

export function sendMessage(data) {
    return request({
        url: '/sendMessage',
        method: 'post',
        data
    })
}

export function closeProcessInstance(data) {
    return request({
        url: '/close',
        method: 'post',
        data
    })
}

export function sendWarn(data) {
    return request({
        url: '/sendWarn',
        method: 'post',
        data
    })
}

export function HistoryTaskList(data) {
    return request({
        url: '/historyTask',
        method: 'post',
        data
    })
}

export function HistoryInstanceList(data) {
    return request({
        url: '/historyInstance',
        method: 'post',
        data
    })
}

export function HistorySeqence(data) {
    return request({
        url: '/historySeqence',
        method: 'post',
        data
    })
}

export function addMultiInstance(data) {
    return request({
        url: '/addInstance',
        method: 'post',
        data
    })
}

export function reduceMultiInstance(data) {
    return request({
        url: '/reduceInstance',
        method: 'post',
        data
    })
}

export function QueryPageSize(data) {

}

export function ProcessInstanceTabList(data) {
    return request({
        url: '/bpmn/act-business-task/processInstanceTabList',
        method: 'post',
        data
    })
}
