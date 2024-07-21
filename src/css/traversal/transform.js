/**
 * wxss转换
 * 1. 标签转换，如
 * Page => body
 * image => img
 * 2. rpx转换px
 *
 * 3. import导入
 *
 */

const { simulateDeviceInfo } = require('../../config')
const { wxmlToHtmlInCss, wxmlTagKeys, wxmlTagRegMap } = require('../const')
const { rpx2px } = require('../utils')

const ambiguityTags = ['text', 'checkbox', 'swiper', 'picker']
const ambiguityTagRightMoveOne = {
  // textarea
  text: 'texta',
  checkbox: 'checkbox-',
  swiper: 'swiper-',
  picker: 'picker-',
}

/**
 * 标签转换
 */
function tagTransform(selectors) {
  // 选择器有可能是级联，且级联的每一项都有可能需要转换
  return selectors.map((se) => {
    // 判断是否还有wxml tag
    let idx = 0
    let cur = ''
    let handleStr = ''
    const len = se.length
    // 从前往后读取字符串，截取的字符串如果能命中 wxml 标签，就进行转换
    // text,textarea
    // checkbox,checkbox-group
    // swiper, swiper-item
    // picker, picker-view
    // 但以上四组需要特别处理
    while (idx < len) {
      const curStr = se[idx]
      cur += curStr
      // 空格处理
      if (curStr === ' ') {
        handleStr += cur
        cur = ''
        idx++
        continue
      }
      if (!wxmlToHtmlInCss[cur]) {
        idx++
        continue
      }
      const isAmbiguityTag = ambiguityTags.includes(cur) && idx + 1 < len
      if (isAmbiguityTag) {
        const rightMoveOneStr = ambiguityTagRightMoveOne[cur]
        if (`${cur}${se[idx + 1]}` === rightMoveOneStr) {
          // 如果是长的tag,放后面处理
          idx++
          continue
        }
        // text,picker,checkbox,swiper下面处理
      }
      handleStr += wxmlToHtmlInCss[cur]
      cur = ''
      idx++
    }
    handleStr += cur
    return handleStr
  })
}

/**
 * rpx转换
 */
function rpxTransform(declaretion) {
  const { value } = declaretion
  if (!value || !value.includes('rpx')) return
  // 数值可能有一个，可能有多个
  // 例如：padding: 0 24rpx; padding: 24rpx 24rpx 24rpx;
  Object.assign(declaretion, {
    value: value
      .split(' ')
      .map((value) => rpx2px(value, simulateDeviceInfo))
      .join(' '),
  })
}

module.exports = {
  tagTransform,
  rpxTransform,
}
