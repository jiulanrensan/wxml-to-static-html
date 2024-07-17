const { rpxConvertValue } = require('../config')

function rpx2px(number, simulateDeviceInfo) {
  const ratio = simulateDeviceInfo.windowWidth / rpxConvertValue
  return number * ratio
}

module.exports = {
  rpx2px,
}
