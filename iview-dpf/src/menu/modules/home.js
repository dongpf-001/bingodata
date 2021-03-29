const pre = '/home/';

export default {
    path: '/home',
    title: '总览',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: `${pre}resource`,
            title: '能耗总览'
        },
    ]
}
