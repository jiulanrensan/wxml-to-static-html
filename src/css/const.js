const { tagMap } = require('../wxml/const')

const wxmlToHtmlInCss = {
  Page: 'body',
  image: tagMap['image'],
  text: tagMap['text'],
  view: tagMap['view'],
}

module.exports = {
  wxmlToHtmlInCss,
}
