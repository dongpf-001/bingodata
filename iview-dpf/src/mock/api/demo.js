const datas = [
    { id: 1, userName: '张三', depart: '智能一部' },
    { id: 2, userName: '王五', depart: '智能二部' },
    { id: 3, userName: 'Test3', depart: '智能二部' },
    { id: 4, userName: 'Test4', depart: '智能二部' },
    { id: 5, userName: 'Test5', depart: '智能二部' },
    { id: 6, userName: 'Test6', depart: '智能二部' },
    { id: 7, userName: 'Test7', depart: '智能二部' },
    { id: 8, userName: 'Test8', depart: '智能二部' },
    { id: 9, userName: 'Test9', depart: '智能二部' },
    { id: 10, userName: 'Test10', depart: '智能二部' },
    { id: 11, userName: 'Test11', depart: '智能二部' },
    { id: 12, userName: 'Test12', depart: '智能二部' },
]
export default [
    {
        path: '/api/getDropData',
        method: 'get',
        handle({ params }) {
            let backData = []
            if (params.id) { // 存在id查询返回对应数据
                datas.forEach(item => {
                    if (item.id == params.id) {
                        backData.push(item)
                    }
                })
            } else if (params.userName) { // 根据姓名查询
                datas.forEach(item => {
                    if (item.userName.indexOf(params.userName) >= 0) {
                        backData.push(item)
                    }
                })
            } else { // 分页查询
                let start = (parseInt(params.pageNum)-1)*parseInt(params.pageSize)
                let end = start + parseInt(params.pageSize)
                datas.forEach((item, index) => {
                    if (index >= start && index < end) {
                        backData.push(item)
                    }
                })
            }
            return {
                code: 0,
                msg: '成功',
                data: {
                    rows: backData,
                    total: datas.length
                }
            }
        }
    },
]
