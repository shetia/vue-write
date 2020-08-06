import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vdom/index";
// 写vue
function Vue (options){
  this._init(options)  // 入口方法, 做初始化操作
}
// 写成一个个插件进行对原型扩展

initMixin(Vue)
lifecycleMixin(Vue) // 混合生命周期
renderMixin(Vue)
export default Vue