const ncname = '[a-zA-Z_][\\w\\-\\.]*'  // 匹配标签名
// ?:匹配不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) //标签开头的正则 捕获的内容是标签名
const startTagClose = /^\s*(\/?)>/   // 匹配标签结束>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的</div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g // 匹配 {{ xxx }}

export function parseHTML(html){

  function createASTElement(tagName, attrs){
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent: null
    }
  }
  let root, currentParent, stack = []
  function start(tagName, attrs){
    // console.log(tagName, attr, '------开始标签-------')
    let element = createASTElement(tagName, attrs)
    if(!root){
      root = element
    }
    currentParent = element
    stack.push(element)
  }
  function end(tagName){ // 在结尾标签处创建父子关系
    // console.log(tagName, '=====结束标签=======')
    let element = stack.pop()
    currentParent = stack[stack.length -1]
    if(currentParent){
      element.parent = currentParent
      currentParent.children.push(element)
    }
  }
  function chars(text){
    // console.log(text, '---------文本-------')
    text = text.replace(/\s/g, '')
    if(text){
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }
  while(html){ // 只要字符串不为空, 就一直解析
    let textEnd = html.indexOf('<')
    if(textEnd == 0){
      // 肯定是开头标签
      const startTagMatch = parseStartTag() // 开始标签匹配结果
      if(startTagMatch){
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      const endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1] )
      }
    }
    let text
    if(textEnd > 0){
      text = html.substring(0, textEnd)
    }
    if(text){
      advance(text.length)
      chars(text)
    }
  }
  function advance(n){ // 截取字符串 更新html;内容
    html = html.substring(n)
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(start){
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 删除开始标签
      // 如果直接是闭合标签 说明没有属性
      let end, attr
      // 不是结尾标签, 能匹配到属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
        // console.log(attr)
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]})
        advance(attr[0].length)
      }
      if(end){
        advance(end[0].length)
        return match
      }
    }
  }
  return root
}