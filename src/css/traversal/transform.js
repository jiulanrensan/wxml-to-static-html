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
const { wxmlToHtmlInCss } = require('../const')
const { rpx2px } = require('../utils')

function tagTransform(selectors) {
  return selectors.map((se) => wxmlToHtmlInCss[se] || se)
}

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
