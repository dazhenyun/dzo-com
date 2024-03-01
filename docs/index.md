---
title: '@dzo/com'
hero:
  title: '@dzo/com 2.0'
  description: 让前端更智能、让我们作一个前端艺术家
  actions:
    - text: 🚀 快速开始
      link: /about/quickstart
features:
  - avatar: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 开箱即用
    description: 三步走，即可用，你懂滴
  - avatar: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 高效开发
    description: 配置化开发，听起来就高效
  - avatar: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 开心工作
    description: 从此再也不用担心自己没有时间做你想 Do
footer: Open-source MIT Licensed | Copyright jakequc 2022<br />Powered by [dumi](https://d.umijs.org)
---

## 🌈 Hello dz0/com!

[Github 站点](https://github.com/dazhenyun/dzo-com)

## 🍭 Target

### 基于 [Ant Design](https://ant-design.gitee.io/components/overview-cn/) 开发的配置化组件，旨在通过配置化开发、做更快更高效更快乐的做一个前端开发艺术家

何时使用该组件库：

> 当你想更快更高效的开发中后台 page 而又和我一样不喜欢 [@ant-design/pro-components](https://procomponents.ant.design/) 这个重型组件库的时候，推荐你使用 ArtAnd

- 配置化开发表单
- 配置化展示详情信息
- 通过 hooks 来开发模板页面
- 通过 hooks 来配置化表单弹框
- useRequest 请求数据自动 loading、处理 error、format 返回数据、手动自动请求数据
- 快速使用 antd 搭建一个 react demo（无需配置），开箱即用 antd 组件

## 🖥 Getting Started

```shell
npm i @dzo/com
# or
yarn add @dzo/com
# yet
pnpm i @dzo/com

# 在入口引入以下文件(这是antd的默认主题样式，可选导入）
# 如果要引入其他主题样式可以在项目中按照 https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn 覆盖即可)
import "art-antd-react/dist/esm/styles/defaultAntdCss.css" # 可选

```

## ⚡ 反馈

非常欢迎你的意见，你可以通过以下方式

- 通过 [Issue](https://github.com/oneQorg/art-antd-react/issues) 报告 bug 或进行咨询(同理如果遇到了问题也可以直接看看别人是否也遇到了呢)。
- 添加微信 jakequc 直接反馈问题

## 历史版本信息

- 1.0.2 新增 Ellipsis 组件
- 1.0.5 修复 GForm 的 hideInForm = true Col 占位
- 1.0.8 TableBtns 新增单个按钮
- 1.1.0 SearchTree 新增默认参数`expandedLevel = null`时不展开字节点，搜索清空默认展示选中的父级节点
- 1.1.1 npm 发布命令修改`npm run release`(会导致提交成功但是提示错误)中原先`npm run publish`改为`npm run pub`
- 1.1.4 修复 SearchTree 组件不支持 loadData 异步加载数据
- 1.1.5 修复 SearchTree 组件 onSelect，onCheck 丢失原始参数
- 1.1.6 新增 SearchTree 组件 onRightClickRender 方法新增 onCopy 复制函数
- 1.1.7

1. TableBtns.AuthBtn 组件修改 type=button 支持 confirm
2. DynamicFieldSet 组件新增 okButtonRender 属性 listFormSet 属性 renderChild 支持 function 支持序号：fieldIndex
3. Gform 组件 renderChild 支持 function 参数为 formSet 对象

- 1.1.8 新增 GDescriptions 组件
- 1.1.9 GDescriptions 组件新增 ellipsis 组件支持
- 1.1.10

1. 新增 registerComponent 全局表单组件注入函数
2. 新增 DZ.registerExternal 扩展方法，以及 DZ.external 扩展调用函数
3. 新增 SearchForm 组件
