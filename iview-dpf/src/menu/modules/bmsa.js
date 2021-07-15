const pre = '/bmsa/';

export default {
    path: '/bmsa',
    title: '组件API',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: '/base',
            title: '基础组件',
            children: [
                {
                    path: `${pre}bingo-toolbar`,
                    title: 'toolbar'
                },
                {
                    path: `${pre}bingo-query`,
                    title: 'query'
                },
                {
                    path: `${pre}bingo-shrink-card`,
                    title: '收缩展开'
                },
            ]
        },
        {
            path: '/form',
            title: '表单组件',
            children: [
                {
                    path: `${pre}bmsa-drop-grid`,
                    title: '下拉表格'
                },
                {
                    path: `${pre}bingo-select-icon`,
                    title: '图标选择组件'
                },
                {
                    path: `${pre}bingo-quill`,
                    title: '富文本'
                },
                {
                    path: `${pre}bingo-select`,
                    title: '下拉选择组件'
                },
                {
                    path: `${pre}bingo-create-info`,
                    title: '创建修改信息'
                },
            ]
        },
        {
            path: '/function',
            title: '功能组件',
            children: [
                {
                    path: `${pre}bmsa-table`,
                    title: '表格'
                },
                {
                    path: `${pre}bmsa-shear-image`,
                    title: '图片裁剪'
                },
                {
                    path: `${pre}bmsa-org-tree`,
                    title: '组织机构'
                },
                {
                    path: `${pre}bingo-bill`,
                    title: '单据'
                },
                {
                    path: `${pre}bingo-modal`,
                    title: '弹窗组件'
                },
                {
                    path: `${pre}bingo-head-photo`,
                    title: '头像组件'
                },
                {
                    path: `${pre}bingo-super-flow`,
                    title: '流程组件'
                },
                {
                    path: `${pre}bingo-tree`,
                    title: '树组件'
                },
                {
                    path: `${pre}bingo-state`,
                    title: '状态选择组件'
                },
            ]
        },
    ]
}
