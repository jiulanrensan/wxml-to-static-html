const iphone6DeviceInfo = {
  devicePixelRatio: 2,
  windowWidth: 375,
  windowHeight: 667,
}
const simulateDeviceInfo = { ...iphone6DeviceInfo }
/**
 * https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
 * rpx换算规则
 */
const rpxConvertValue = 750

module.exports = {
  simulateDeviceInfo,
  rpxConvertValue,
}
