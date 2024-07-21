/**
 * 标记脱离文档流的元素选择器：out of flow：fixed, absolute,float先不处理
 */
function mark(rule) {
  const { declarations, selectors } = rule
  const isOOF = declarations.some((de) => {
    const { property, value } = de
    return property === 'position' && ['fixed', 'absolute'].includes(value)
  })
  return isOOF ? selectors : []
}

module.exports = {
  markOOFSelectors: mark,
}
