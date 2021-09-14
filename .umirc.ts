import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@dzo/com',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lean',
        camel2DashComponentName: false,
        customStyleName: name => {
          return `./style/index.less`; // 注意：这里 ./ 不可省略
        },
      },
      'lean',
    ],
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
