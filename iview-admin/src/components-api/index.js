import bingoActionDrop from './bingo-action-drop'
import bingoBillPage from './bingo-bill-page'
import bingoCalendar from './bingo-calendar'
import bingoChoice from './bingo-choice'
import bingoCreateInfo from './bingo-create-info'
import bingoDatePicker from './bingo-date-picker'
import bingoDateWeek from './bingo-date-week'
import bingoDropGrid from './bingo-drop-grid'
import bingoModal from './bingo-modal'
import bingoModalEdit from './bingo-modal-edit'
import bingoModalForm from './bingo-modal-form'
import bingoModalOrganization from './bingo-modal-organization'
import bingoModalSelect from './bingo-modal-select'
import bingoQuery from './bingo-query'
import bingoForm from './bingo-form/'
import bingoFormItem from './bingo-form-item'
import bingoGridItem from './bingo-grid-item'
import bingoSelect from './bingo-select'
import bingoSelectIcon from './bingo-select-icon'
import bingoSelectOrganization from './bingo-select-organization'
import bingoIcon from './bingo-icon'
import bingoIssue from './bingo-issue'
import bingoShrink from './bingo-shrink'
import bingoShrinkCard from './bingo-shrink-card'
import bingoStaffCard from './bingo-staff-card'
import bingoState from './bingo-state'
import bingoTable from './bingo-table'
import bingoTabs from './bingo-tabs'
import bingoTagSelect from './bingo-tag-select'
import bingoToolbar from './bingo-toolbar'
import bingoTree from './bingo-tree'
import bingoUpload from './bingo-upload'
import bingoMessage from './bingo-message'
// import bingoAlert from './bingo-alert';

const components = {
    bingoActionDrop,
    bingoBillPage,
    bingoCalendar,
    bingoChoice,
    bingoCreateInfo,
    bingoDatePicker,
    bingoDateWeek,
    bingoDropGrid,
    bingoModal,
    bingoModalEdit,
    bingoModalForm,
    bingoModalOrganization,
    bingoModalSelect,
    bingoQuery,
    bingoForm,
    bingoFormItem,
    bingoGridItem,
    bingoSelect,
    bingoSelectIcon,
    bingoIcon,
    bingoIssue,
    bingoSelectOrganization,
    bingoShrink,
    bingoShrinkCard,
    bingoStaffCard,
    bingoState,
    bingoTable,
    bingoTabs,
    bingoTagSelect,
    bingoToolbar,
    bingoTree,
    bingoUpload,
    bingoMessage
    // bingoAlert,
}

const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// module.exports.default = module.exports = API;
export default install
