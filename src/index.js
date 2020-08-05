import { initMixin } from "./init";
// 写vue
function Vue (options){
  this._init(options)  // 入口方法, 做初始化操作
}
// 写成一个个插件进行对原型扩展

initMixin(Vue)

export default Vue