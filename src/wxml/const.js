const tagMap = {
  block: 'div',
  page: 'div',
  view: 'div',
  'scroll-view': 'div',
  swiper: 'div',
  'swiper-item': 'div',
  'movable-view': 'div',
  icon: 'i',
  text: 'span',
  progress: 'div',
  button: 'button',
  'checkbox-group': 'div',
  checkbox: (element, helper) => {
    return `<input type="checkbox"/>`
  },
  form: 'form',
  input: 'input',
  label: 'label',
  picker: 'div',
  'picker-view': 'div',
  radio: (element, helper) => {
    return `<input type="radio" />`
  },
  slider: 'div',
  switch: (element, helper) => {
    return `<input type="checkbox />"`
  },
  textarea: 'textarea',
  audio: 'object',
  image: 'img',
  video: 'object',
  map: 'div',
  canvas: 'canvas',
  'contact-button': 'button',
}

const ElementType = {
  Program: 'Program',
  WXElement: 'WXElement',
  WXScript: 'WXScript',
  WXText: 'WXText',
  WXAttributeInterpolation: 'WXAttributeInterpolation',
  WXInterpolation: 'WXInterpolation',
  WXComment: 'WXComment',
  WXAttribute: 'WXAttribute',
  WXStartTag: 'WXStartTag',
  WXEndTag: 'WXEndTag',
}

const ignoreKey = ['wx:if', 'wx:elif', 'wx:else', 'wx:for', 'wx:for-index', 'wx:for-item', 'wx:key']

module.exports = {
  tagMap,
  ElementType,
  ignoreKey,
}
