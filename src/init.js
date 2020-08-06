
import { initState } from "./state";
import {complieToFuntions} from './complier/index'
import { mountComponent } from "./lifecycle";
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
    // 如果当前有el属性说明要渲染模板
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el){
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    vm.$el = el
    if(!options.render){
      // 没render 将template转化成render
      let template = options.template
      if(!template && el){
        template = el.outerHTML
      }
      const render = complieToFuntions(template)
      options.render = render
    }
    // 渲染时都是用的这个方法
    mountComponent(vm, el)
  }
}