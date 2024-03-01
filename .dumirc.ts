import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@dzo/com',
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@dzo/com',
    title: '@dzo/com',
    favicon:
      'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo:
      'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    webpack5: {},
    dynamicImport: {},
    exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
    mode: 'site',
    mfsu: {},
    nav: {
      'zh-CN': [
        {
          title: '文档',
          link: '/docs',
        },
        {
          title: '组件',
          link: '/components',
        },
        {
          title: '工具类',
          link: 'http://10.50.101.20:8091',
        },
      ],
    },
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
  },
});
