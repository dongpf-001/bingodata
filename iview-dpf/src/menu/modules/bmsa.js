const pre = '/bmsa/';

export default {
    path: '/bmsa',
    title: '组件API',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: '/form',
            title: '表单组件',
            children: [
                {
                    path: `${pre}bmsa-drop-grid`,
                    title: '下拉表格'
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
            ]
        },
    ]
}
