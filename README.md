# @dzo/com

集公共组件库开发、调试、编写文档一体化

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Build library via `father-build`,

```bash
$ npm run build
```

发包

```bash
$ npm run release
```

## 历史版本信息

- 1.0.2 新增 Ellipsis 组件
- 1.0.5 修复 GForm 的 hideInForm = true Col 占位
- 1.0.8 TableBtns 新增单个按钮
- 1.0.9 SearchTree 新增默认参数`expandedLevel = null`时不展开字节点，搜索清空默认展示选中的父级节点
- 1.1.1 npm 发布命令修改`npm run release`(会导致提交成功但是提示错误)中原先`npm run publish`改为`npm run pub`
