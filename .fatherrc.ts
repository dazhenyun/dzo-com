export default {
  esm: 'babel',
  cjs: 'rollup',
  // cssModules: {
  //   generateScopedName: '@dzo/com_[name]__[local]___[hash:base64:5]',
  // },
  extractCSS: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
