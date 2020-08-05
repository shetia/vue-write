import { initState } from "./state";

export function initMixin(Vue){
  // 初始化方法
  Vue.prototype._init = function (options){
    const vm = this
    vm.$options = options
    // 初始化状态 (将数据做一个初始化的劫持 当我数据改变时 更新视图)
    // vue组件中有很多状态 data props watch computed
    initState(vm)
    // vue 里面核心特性 响应式数据原理
    // vue是一个MVVM框架
    // 数据变化视图会更新, 视图变化数据会被影响 (MVVM)不能跳过数据去更新视图
  }
}