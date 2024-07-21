/**
 * 是否空对象
 * @param o
 * @returns
 */
function isEmptyObject(o) {
  for (const k in o) return false
  return true
}

function isUndefined(o) {
  return Object.prototype.toString.call(o) === '[object Undefined]'
}

function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]'
}
function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

function isNumber(o) {
  return Object.prototype.toString.call(o) === '[object Number]'
}

function isFunction(o) {
  return typeof o === 'function'
}
function isAsyncFuncyion(o) {
  return Object.prototype.toString.call(o) === '[object AsyncFunction]'
}

module.exports = {
  isEmptyObject,
  isUndefined,
  isString,
  isArray,
  isObject,
  isNumber,
  isFunction,
  isAsyncFuncyion,
}
