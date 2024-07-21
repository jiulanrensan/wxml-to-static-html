const { tagTransform, rpxTransform } = require('./transform')

function traversal(stylesheet) {
  stylesheet.rules.forEach((rule) => {
    /**
     * @typedef Rule
     * @property {string} Rule.type
     * @property {string[]} Rule.selectors
     * @property {{property: string;value: string}[]} Rule.declarations
     */
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

module.exports = {
  cssTraversal: traversal,
}
