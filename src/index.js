const { parse } = require('@wxml/parser')
const { generate } = require('@wxml/generator')
const { traverse } = require('@wxml/traverse')
const { tagMap, ElementType, ignoreKey } = require('./const')
const fs = require('fs/promises')
const path = require('path')
const { wxmlTagToHtmlTag, elementInterpolationToDefaultText, removeWxmlTag } = require('./wxml2html')
function readFile() {
  try {
    return fs.readFile(path.resolve('./static/input.wxml'), { encoding: 'utf-8' })
  } catch (error) {
    console.log('error', error)
    return
  }
}

async function writeFile(str) {
  try {
    await fs.writeFile(path.resolve('./static/output.html'), str)
  } catch (error) {
    console.log('error', error)
  }
}

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
  const wxmlStr = await readFile()
  const ast = parse(wxmlStr)
  traverseAST(ast)
  const code = generate(ast)
  writeFile(code)
}

main()
