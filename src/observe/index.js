import { arrayMethods } from "./array";
import { defineProperty } from '../util'
class Observe{
  constructor(value){
    // 使用definedProperty 重新定义
    // 判断一个对象是否被观测过 看它有没有__ob__
    defineProperty(value, '__ob__', this)

    if(Array.isArray(value)){
      // 我希望调用push shift unshift pop reverse splice sort
      // 函数挟持, 切片编程
      value.__proto__ = arrayMethods
      // 还有观测数组中的对象
      this.observeArray(value)
    } else [
      this.walk(value)
    ]
  }
  observeArray (value) {
    value.forEach(item => {
      observe(item) // 观测数组中的对象
    })
  }
  walk(data){
    let keys = Object.keys(data) // 获取对象的key
    keys.forEach(key => {
      defineReactive(data, key, data[key]) // Vueutil.defineReactive
    })
  }
}
function defineReactive (data, key, value){
  observe(value) // 如果值是对象再进行观测
  Object.defineProperty(data, key, {
    get () {
      console.log('获取了',key)
      return value
    },
    set (newValue) {
      console.log('设置了',key)
      if(value === newValue) return
      observe(newValue) // 如果用户将值改为对象 继续监控
      value = newValue
    }
  })
}
export function observe(data){
  // 不能不是对象和null
  if(typeof data !== 'object' || data === null){
    return data
  }
  if(data.__ob__) return data
  return new Observe(data)
}