module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential'],
  // extends: ['eslint:recommended', '@vue/prettier', 'plugin:vue/vue3-essential'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/max-len": ["error", {
      "code": 160,
      "template": 160,
      "tabWidth": 2,
      "comments": 160,
      "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true,
        "ignoreHTMLAttributeValues": true,
        "ignoreHTMLTextContents": true,
  }]
    // =================================================
    // semi: 'off',
    // quotes: 'off',
    // 'object-curly-spacing': 'off',
    // 'vue/max-attributes-per-line': [
    //   'error',
    //   {
    //     singleline: 6,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ],
    // 'vue/html-self-closing': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/template-curly-spacing': 'off',
    // 'max-len': ['error', {code: 180}]
    // 'max-params': ['error', 10]
  }
}
