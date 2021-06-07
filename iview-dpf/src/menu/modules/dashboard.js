const pre = '/dashboard/';

export default {
    path: '/dashboard',
    title: '首页',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: `${pre}console`,
            title: '脑图'
        },
    ]
}
