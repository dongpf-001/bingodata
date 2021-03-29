import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'home-';

export default {
    path: '/home',
    name: 'home',
    redirect: {
        name: `${pre}console`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'resource',
            name: `${pre}resource`,
            meta: {
                ...meta,
                title: '能耗总览',
                closable: true
            },
            component: () => import('@/pages/home/resource')
        },
    ]
};
