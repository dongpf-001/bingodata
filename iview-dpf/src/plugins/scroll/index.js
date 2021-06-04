/**
 * @description 滚动事件对监听 触发方法
 * */
export default {
    bind: function (el, binding){
        window.addEventListener('scroll',  ()=> {
            // if(el.clientHeight  + el.scrollTop == el.scrollHeight) {
            //     binding.value(el);
            // }
            binding.value(el);
        }, true);
    }
};
