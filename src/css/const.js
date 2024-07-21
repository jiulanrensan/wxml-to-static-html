const { tagMap } = require('../wxml/const')

const wxmlToHtmlInCss = {
  ...tagMap,
  Page: 'body',
}

const wxmlTagKeys = Object.keys(wxmlToHtmlInCss)

const wxmlTagRegMap = wxmlTagKeys.reduce((reg, key) => {
  reg[key] = new RegExp(`^${wxmlToHtmlInCss[key]}$`)
  return reg
}, {})

module.exports = {
  wxmlToHtmlInCss,
  wxmlTagKeys,
  wxmlTagRegMap,
}
