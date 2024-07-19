const { tagMap } = require('../wxml/const')

const wxmlToHtmlInCss = {
  Page: 'body',
  image: 'img',
  text: tagMap['text'],
  view: tagMap['view'],
}

module.exports = {
  wxmlToHtmlInCss,
}
