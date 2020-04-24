import bingoMessage from './index.vue'
const MessageBox = {}
// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue, options) {
  const MessageBoxInstance = Vue.extend(bingoMessage)
  let currentMsg
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance()
    let msgBoxEl = currentMsg.$mount().$el
    document.body.appendChild(msgBoxEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$BMessage = {
    warning (options) {
      if (!currentMsg) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentMsg.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options)
      }
      return currentMsg.warning(options)
    },
    error (options) {
      if (!currentMsg) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentMsg.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options)
      }
      return currentMsg.error(options)
    }
  }
}
export default MessageBox
