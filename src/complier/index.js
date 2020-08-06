//<div>hello{{name}}<span>world</span></div>
/**
 * {
 *    tag: 'div',
 *    parent: null,
 *    type: 1,
 *    attrs: [],
 *    children: [
 *        {tag:null, parent: 父div, attrs:[],text: hello {{name}}},
 *        {tag: span, parent: 父div}
 *    ]
 *
 * }
 **/
import {parseHTML} from './parse'
import {generate} from './generate'
export function complieToFuntions(template){
  // html 模板 => render函数
  // 1.将htm代码转化成ast 语法树  可以用ast树来描述语言本身
  let ast = parseHTML(template)
  // 2. 优化静态节点
  // 3. 通过这棵树 重新的生成代码
  let code = generate(ast)
  // 4. 将字符串变成函数
  let render = new Function(`with(this){return ${code}}`)
  return render
}