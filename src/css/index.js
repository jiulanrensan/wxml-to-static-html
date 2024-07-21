const { wxmlToHtmlInCss } = require('./const')
const { readFile } = require('../fileHandler')
const cssParser = require('css')
const { rpx2px } = require('./utils')
const { simulateDeviceInfo } = require('../config')
const { cssTraversal } = require('./traversal')

async function cssParse(filePath) {
  try {
    const cssStr = await readFile(filePath)
    const ast = cssParser.parse(cssStr)
    cssTraversal(ast.stylesheet)
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
