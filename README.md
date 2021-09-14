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

- 1.1.0 版本 增加 ComIcon 组件，表单弹窗增加 maskCloseable 为 false
- 1.1.1 版本 修复表单弹窗第一次显示时内部方法拿不到的问题
- 1.2.1 版本 表单增加时间选择器
- 1.2.2 版本 修复表单自定义组件，可通过配置 itemSet.props 传属性,时间组件增加默认样式
- 1.3.0 版本 增加公用上传组件
- 1.3.1 版本 修复上传组件的预览弹窗关闭问题，上传文件失败提示后端的信息，修复单文件连续上传 bug，最大文件数控制 bug
- 1.3.2 版本 增加文件上传组件-非实时上传组件
- 1.3.3 版本 修复文件上传组件-非实时上传组件 bug
- 1.3.4 版本 文件上传组件增加预览的交互效果,修复上传请求失败之后的交互效果，增加 beforeUpload 的校验钩子,GFormItem 对 lable 的校验优化,
- 1.4.0 版本 增加 searchTree 的组件，
- 1.4.1 版本 修复 searchTree 的数据为空 bug
- 1.4.2 版本 tablebtns 组件增加“更多”类型,searchTree 组件修复展开 icon 判断，右键渲染的位置问题
- 1.4.3 版本 文件上传组件,增加数组类型值的传参
- 1.4.4 版本 searchTree 组件修复内部 parenId 重名问题以及增加默认展开层数选择，优化展开相关逻辑
- 1.5.0 版本 selectgroup 优化 key 键值逻辑,tableBtns 引入 textEnum，可以替换启用停用的文案,Money 金额展示、输入组件增加
- 1.5.1 版本 searchTree 修复搜索 bug,Money 金额展示组件样式优化
- 1.5.2 版本 InputNum、Money 金额输入组件增加 addonBefore, addonAfter, prefix,suffix 属性
- 1.6.0 版本 GForm 去除 layoutProps 属性，GForm formSet 配置增加 column 属性,FileUpload 上传修复展示最大文件数 bug 问题
- 1.6.1 版本 修复动态列表展示问题
- 1.6.2 版本 ModalForm 支持 beforeRender、afterRender，优化弹窗表单底部工具栏样式及按钮传参问题,金额组件的浮点数计算精度丢失问题修复
