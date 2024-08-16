module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier"
  ],
  rules: {
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "off",
    "@next/next/no-page-custom-font": "off",
    'no-console': 0,
    'no-unused-vars': 1,
    'no-constant-condition':0,
    'no-trailing-spaces': 0,
    'no-irregular-whitespace':0,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['warn', 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': ['warn', 2],
    'semi': 0,
    'quotes': ['warn', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1,
    'no-useless-escape': 0
  }
}

