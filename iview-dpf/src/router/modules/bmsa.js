import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'bmsa-';
const oldpre = 'bingo-';

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
        {
            path: 'bmsa-org-tree',
            name: `${pre}org-tree`,
            meta: {
                ...meta,
                title: '组织结构',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-org-tree')
        },
        {
            path: 'bmsa-drop-grid',
            name: `${pre}drop-grid`,
            meta: {
                ...meta,
                title: '下拉表格',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-drop-grid')
        },
        {
            path: 'bingo-bill',
            name: `${oldpre}bill`,
            meta: {
                ...meta,
                title: '单据',
                closable: true
            },
            component: () => import('@/pages/components/bingo-bill')
        },
        {
            path: 'bingo-toolbar',
            name: `${oldpre}toolbar`,
            meta: {
                ...meta,
                title: 'toolbar',
                closable: true
            },
            component: () => import('@/pages/components/bingo-toolbar')
        },
        {
            path: 'bingo-query',
            name: `${oldpre}query`,
            meta: {
                ...meta,
                title: 'toolbar',
                closable: true
            },
            component: () => import('@/pages/components/bingo-query')
        },
    ]
};
