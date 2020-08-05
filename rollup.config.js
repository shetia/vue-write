/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-08-05 19:31:19
 * @LastEditors: somebody
 * @LastEditTime: 2020-08-05 19:53:59
 */
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
  input: './src/index.js', // 入口打包库, new vue
  output: {
    format: 'umd', // 模块化类型 esmodule commonjs模块
    name: 'Vue', // 全局变量的名字
    file: 'dist/umd/vue.js',
    sourcemap: true

  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      port: 3000,
      contentBase: '',
      openPage: '/index.html' // 打开页面是哪个
    })
  ]

}