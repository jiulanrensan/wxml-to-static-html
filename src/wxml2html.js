const { tagMap, ElementType, ignoreKey } = require('./const')

function wxmlTagToHtmlTag(node) {
  const origin = node.name
  node.name = tagMap[origin] || origin
}

/**
 * 元素的插值改为默认文案
 */
function elementInterpolationToDefaultText(node) {
  const { children } = node
  if (!children) return
  children.forEach((ch) => {
    if (ch.type === ElementType.WXInterpolation)
      Object.assign(ch, {
        type: ElementType.WXText,
        value: '文案',
        rawValue: '',
      })
  })
}

/**
 * 移除不需要的wxml属性
 * 比如wx:if wx:for
 */
function removeWxmlTag(node) {
  const { attributes } = node
  node.attributes = attributes.reduce((result, attr) => {
    if (ignoreKey.includes(attr.key)) return result
    const origin = attr.children
    if (!origin) return result
    attr.children = origin.reduce((r, _) => {
      if (ElementType.WXAttributeInterpolation === _.type) return r
      r.push(_)
      return r
    }, [])
    result.push(attr)
    return result
  }, [])
}

module.exports = {
  wxmlTagToHtmlTag,
  elementInterpolationToDefaultText,
  removeWxmlTag,
}
