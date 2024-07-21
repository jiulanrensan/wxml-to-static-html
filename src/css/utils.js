const { rpxConvertValue } = require('../config')
const { isNumber } = require('../utils/type')

function rpx2px(rpxValue, simulateDeviceInfo) {
  if (isNumber(rpxValue) || !rpxValue.includes('rpx')) return rpxValue
  const rpxNumber = rpxValue.split('rpx')[0]
  const ratio = simulateDeviceInfo.windowWidth / rpxConvertValue
  return `${rpxNumber * ratio}px`
}

module.exports = {
  rpx2px,
}
