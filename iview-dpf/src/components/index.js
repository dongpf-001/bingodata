import bmsaDropGrid from './bmsa-drop-grid';
import bmsaOrgTree from './bmsa-org-tree';
import bmsaShearImage from './bmsa-shear-image';
import bmsaTableTool from './bmsa-table-tool';
import bingoBill from './bingo-bill';

import bingoForm from './bingo-form';
import bingoFormItem from './bingo-form-item';
import bingoGridItem from './bingo-grid-item';
import bingoShrinkCard from './bingo-shrink-card';
import bingoToolbar from './bingo-toolbar';
import bingoQuery from './bingo-query';
import bingoModal from './bingo-modal';
import bingoModalEdit from './bingo-modal-edit';
import bingoHeadPhoto from './bingo-head-photo';
import bingoSuperFlow from './bingo-super-flow';
import bingoSelectIcon from './bingo-select-icon';
import bingoTree from './bingo-tree';
import bingoSelect from './bingo-select';
import bingoCreateInfo from './bingo-create-info';

const components = {
    bmsaDropGrid,
    bmsaOrgTree,
    bmsaShearImage,
    bmsaTableTool,

    bingoBill,
    bingoForm,
    bingoFormItem,
    bingoGridItem,
    bingoShrinkCard,
    bingoToolbar,
    bingoQuery,
    bingoModal,
    bingoModalEdit,
    bingoHeadPhoto,
    bingoSuperFlow,
    bingoSelectIcon,
    bingoTree,
    bingoSelect,
    bingoCreateInfo,
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
