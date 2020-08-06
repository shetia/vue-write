const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g // 匹配 {{ xxx }}
function genProps(attrs){
  let str = ''
  for(let i = 0; i < attrs.length; i++){
    let attr = attrs[i]
    if(attr.name === 'style'){
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}
function gen(node){
  if(node.type == 1){
    return generate(node)
  } else {
    let text = node.text
    if(!defaultTagRE.test(text)){
      // 如果是普通文本 不带 {{}}
      return `_v(${JSON.stringify(text)})`
    }
    let tokens = [] // 存放每一段代码
    let lastIndex = defaultTagRE.lastIndex = 0 // 如果是全局模式, 需要每次使用前置为0
    let match, index
    while(match = defaultTagRE.exec(text)){
      index = match.index // 保存匹配的索引
      if(index > lastIndex){
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if(lastIndex < text.length){
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}
function genChildren(el){
  const children = el.children
  if(children){ // 将所有转化后的儿子用逗号拼接起来
    return children.map(child => gen(child)).join(',')
  }
}
export function generate(el){
  let children = genChildren(el)
  let code = `_c('${el.tag}',${
    el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'
  }${
    children ? `,${children}`: ''
  })`;

  return code
}