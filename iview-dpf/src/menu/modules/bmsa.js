const pre = '/bmsa/';

export default {
    path: '/bmsa',
    title: '组件API',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: `${pre}bmsa-table`,
            title: '表格'
        },
        {
            path: `${pre}bmsa-shear-image`,
            title: '图片裁剪'
        },
    ]
}
