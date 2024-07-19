const { wxmlToHtmlInCss } = require('../wxml/const')
const { readFile } = require('../fileHandler')
const cssParser = require('css')
const { rpx2px } = require('./utils')
const { simulateDeviceInfo } = require('../config')

/**
 * image => img
 * rpx => px
 * import
 * Page => body
 */

function tagTransform(selectors) {
  return selectors.map((se) => wxmlToHtmlInCss[se] || se)
}

function rpxTransform(declaretion) {
  const { value } = declaretion
  if (!value || !value.includes('rpx')) return
  const rpxValue = value.split('rpx')[0]
  Object.assign(declaretion, {
    value: `${rpx2px(rpxValue, simulateDeviceInfo)}px`,
  })
}

function transform(stylesheet) {
  stylesheet.rules.forEach((rule) => {
    if (rule.type === 'rule') {
      // declarations: css key-value
      // selectors: class name
      const { declarations, selectors } = rule
      rule.selectors = tagTransform(selectors)
      declarations.forEach((de) => {
        // property: css key
        // value: css value
        /**
         * @typedef Declaration
         * @property {string} Declaration.property
         * @property {string} Declaration.value
         */
        const { property, value } = de
        // deal with css key,value
        rpxTransform(de)
      })
    }
  })
}

async function cssParse(filePath) {
  try {
    const cssStr = await readFile(filePath)
    const ast = cssParser.parse(cssStr)
    transform(ast.stylesheet)
    return ast
    // console.log('ast', ast)
  } catch (error) {
    console.log('cssParse', error)
    throw new Error(error)
  }
}

function cssGenerate(ast) {
  return cssParser.stringify(ast)
}

module.exports = {
  cssParse,
  cssGenerate,
}
