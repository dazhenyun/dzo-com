import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@dzo/com',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '文档',
      path: '/docs',
    },
    {
      title: '组件',
      path: '/comp',
    },
    {
      title: '工具类',
      path: 'http://10.50.101.20:8091',
    },
  ],
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'babel-plugin-import', // 配置antd样式按需加载
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  locale: false,
});
