module.exports = {
  root: true,
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
};
