import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'bmsa-';

export default {
    path: '/bmsa',
    name: 'bmsa',
    redirect: {
        name: `${pre}table`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'bmsa-table',
            name: `${pre}table`,
            meta: {
                ...meta,
                title: '表格',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-table')
        },
        {
            path: 'bmsa-shear-image',
            name: `${pre}shear-image`,
            meta: {
                ...meta,
                title: '图片裁剪',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-shear-image')
        },
    ]
};
