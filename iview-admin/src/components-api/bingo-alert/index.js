import bingoAlert from './index.vue'
const AlertBox = {}
// vue的install方法，用于定义vue插件
AlertBox.install = function (Vue, options) {
  const AlertBoxInstance = Vue.extend(bingoAlert)
  let currentObj
  const initInstance = () => {
    // 实例化vue实例
    currentObj = new AlertBoxInstance()
    let msgBoxEl = currentObj.$mount().$el
    document.body.appendChild(msgBoxEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$BAlert = {
    warning (options) {
      if (!currentObj) {
        initInstance()
      }
      Object.assign(currentObj, options)
      return currentObj.warning(options)
    },
    delete (options) {
      if (!currentObj) {
        initInstance()
      }
      Object.assign(currentObj, options)
      return currentObj.delete(options)
    },
    error (options) {
      if (!currentObj) {
        initInstance()
      }
      Object.assign(currentObj, options)
      return currentObj.error(options)
    }
  }
}
export default AlertBox
