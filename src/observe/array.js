/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-08-05 21:03:44
 * @LastEditors: somebody
 * @LastEditTime: 2020-08-05 21:28:48
 */
// 拿到数组原型上的方法
let oldArryPrototMethods  = Array.prototype
export let arrayMethods = Object.create(oldArryPrototMethods)


let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    console.log('方法被调用了', method)
    let result = oldArryPrototMethods[method].apply(this, args)
    let inserted
    let ob = this.__ob__
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':  // this.$set() 原理
        inserted = args.slice(2) // arr.splice(0, 1, {a: 1})
        break;
      default:
        break;
    }
    if(inserted){
      ob.observeArray(inserted)
    }
    return result
  }
})
