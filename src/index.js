const { parse } = require('@wxml/parser')
const { generate } = require('@wxml/generator')
const { traverse } = require('@wxml/traverse')
const path = require('path')
const { tagMap, ElementType, ignoreKey } = require('./wxml/const')

const { wxmlTagToHtmlTag, elementInterpolationToDefaultText, removeWxmlTag } = require('./wxml/wxml2html')
const { readFile, writeFile } = require('./fileHandler')
const { cssParse, cssGenerate } = require('./css')

function traverseAST(ast) {
  traverse(ast, {
    WXInterpolation(path) {},
    WXElement(path) {
      wxmlTagToHtmlTag(path.node)
      elementInterpolationToDefaultText(path.node)
    },
    WXStartTag(path) {
      removeWxmlTag(path.node)
    },
  })
}

async function main() {
  const wxmlStr = await readFile(path.resolve(__dirname, './static/input/index.wxml'))
  const ast = parse(wxmlStr)
  traverseAST(ast)
  const htmlCode = generate(ast)
  const cssAst = await cssParse(path.resolve(__dirname, './static/input/index.wxss'))
  const cssCode = cssGenerate(cssAst)
  // writeFile(htmlCode, path.resolve(__dirname, './static/output.html'))
  writeFile(cssCode, path.resolve(__dirname, './static/output.css'))
}

main()
