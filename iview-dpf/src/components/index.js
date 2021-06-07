import bmsaDropGrid from './bmsa-drop-grid';
import bmsaOrgTree from './bmsa-org-tree';
import bmsaShearImage from './bmsa-shear-image';
import bmsaTableTool from './bmsa-table-tool';
import bingoBill from './bingo-bill';

import bingoForm from './bingo-form';
import bingoFormItem from './bingo-form-item';
import bingoGridItem from './bingo-grid-item';
import bingoShrink from './bingo-shrink';
import bingoToolbar from './bingo-toolbar';
import bingoQuery from './bingo-query';

const components = {
    bmsaDropGrid,
    bmsaOrgTree,
    bmsaShearImage,
    bmsaTableTool,

    bingoBill,
    bingoForm,
    bingoFormItem,
    bingoGridItem,
    bingoShrink,
    bingoToolbar,
    bingoQuery,
}
const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;
