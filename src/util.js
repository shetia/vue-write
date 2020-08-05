/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-08-05 21:44:27
 * @LastEditors: somebody
 * @LastEditTime: 2020-08-05 21:48:02
 */
export function proxy(vm, data, key){
  Object.defineProperty(vm, key, {
    get () {
      return vm[data][key]
    },
    set(newValue){
      vm[data][key] = newValue
    }
  })
}
export function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable:false, // 不可枚举, 不能被循环出来
    configurable:false,
    value
  })
}