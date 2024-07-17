const { parse } = require('@wxml/parser')
const { generate } = require('@wxml/generator')
const { traverse } = require('@wxml/traverse')
const { tagMap, ElementType, ignoreKey } = require('./const')

const { wxmlTagToHtmlTag, elementInterpolationToDefaultText, removeWxmlTag } = require('./wxml2html')
const { readFile, writeFile } = require('./fileHandler')

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
  const wxmlStr = await readFile('./static/input.wxml')
  const ast = parse(wxmlStr)
  traverseAST(ast)
  const code = generate(ast)
  writeFile(code)
}

main()
