---
title: GForm - 表单组件
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

# 表单组件

## 登录表单

```jsx
import React from 'react';
import { Button } from 'antd';
import { GForm, Money, registerComponent } from '@dzo/com';
const { MoneyInput } = Money.set(100);
registerComponent({ moneyInput: MoneyInput });

export default () => {
  const props = {
    formSet: [
      {
        type: 'input',
        label: '用户名',
        name: 'username',
      },
      {
        type: 'password',
        label: '密码',
        name: 'password',
      },
      {
        type: 'moneyInput',
        label: '密码',
        name: 'money',
      },
    ],
    column: 1,
    style: { width: 400, margin: '0 auto' },
    defaultFooterBar: false,
    layout: 'vertical',
    submitCall: values => {
      console.log(values);
    },
    toolBarRender: actionRef => (
      <Button
        style={{ width: '100%' }}
        type="primary"
        onClick={() => {
          actionRef.submit();
        }}
      >
        登录
      </Button>
    ),
  };
  return <GForm {...props} />;
};
```

## 基础表单

```jsx
import React from 'react';
import { Button } from 'antd';
import { GForm } from '@dzo/com';

export default () => {
  const noEmpty = [{ required: true }];
  const patternPhone = /^((13[0-9])|(14[1]|[4-9])|(15([0-3]|[5-9]))|(16[2]|[5-7])|(17[0-3]|[5-8])|(18[0-9])|(19[1|8|9]))\d{8}$/;

  const props = {
    formSet: [
      {
        type: 'input',
        dataIndex: 'id',
        title: 'id',
        column: 0, // 占比列数为0，即可隐藏
      },
      {
        type: 'input',
        label: '用户名',
        name: 'username',
        validOptions: {
          rules: noEmpty,
        },
      },
      {
        type: 'input',
        label: '手机号',
        name: 'mobile',
        validOptions: {
          rules: [
            ...noEmpty,
            { pattern: patternPhone, message: '请输入正确的手机号' },
          ],
        },
      },
      {
        type: 'input',
        label: '登录名称',
        name: 'loginName',
        validOptions: {
          rules: noEmpty,
        },
      },
      {
        type: 'password',
        label: '登录密码',
        name: 'password',
        validOptions: {
          rules: [
            ...noEmpty,
            { message: '请输入密码(6-20位)', min: 6, max: 20 },
          ],
        },
      },
      {
        type: 'radiogroup',
        label: '用户性别',
        name: 'sex',
        optionsData: [
          { label: '男', value: '1' },
          { label: '女', value: '2' },
        ],
        validOptions: {
          rules: noEmpty,
        },
      },
      {
        type: 'checkboxgroup',
        label: '角色',
        name: 'role',
        optionsData: [
          { label: '商户', value: '1' },
          { label: '财务', value: '2' },
          { label: '管理员', value: '3' },
        ],
        validOptions: {
          rules: noEmpty,
        },
      },
    ],
    column: 1,
    style: { width: 500 },
    submitCall: values => {
      console.log(values);
    },
  };
  return <GForm {...props} />;
};
```

## 自定义组件结合

如果目前的组件类型无法满足，可以自定义组件结合，组件需配置 value、onChange

<code src="./CustomDemo.jsx" />

## 输入项之间的联动

<code src="./Linkage.jsx" />

## 组件类型所有示例

<code src="./AllComDemo.jsx" />

## 多表单组合

有时候可能因为表单的样式问题，需要呈现卡片的感觉

<code src="./FormGroups.jsx" />

## API

GForm

| 参数             | 说明                               | 类型                              | 默认值 | 版本 |
| ---------------- | ---------------------------------- | --------------------------------- | ------ | ---- |
| formSet          | 表单输入项配置                     | {type,name,label,...}[]           | -      |      |
| loading          | 正在保存标志                       | bool                              | false  |      |
| column           | 一行显示几列                       | num                               | 3      |      |
| initialValues    | 表单初始值                         | object                            | -      |      |
| labelBasicSpan   | label 的占比                       | num                               | 6      |      |
| defaultFooterBar | 是否使用默认的按钮 重置、保存      | bool                              | true   |      |
| totalSpan        | 行的总占比，最高 24                | num                               | 24     |      |
| gutter           | 列与列之间的间隔,配置参考 antd Row | object 或 num                     | -      |      |
| cancelCall       | 重置回调                           | ( formValues：表单值 )=>{}        | -      |      |
| submitCall       | 提交回调                           | ( formValues：表单值 )=>{}        | -      |      |
| toolBarRender    | 表单底部按钮工具栏的添加           | ( actionRef：表单的实例方法 )=>{} | -      |      |
| 其它             | 参考 antd Form                     | object                            | -      |      |

formSet

| 参数         | 说明                                                 | 类型                            | 默认值            | 版本 |
| ------------ | ---------------------------------------------------- | ------------------------------- | ----------------- | ---- |
| type         | 组件类型，具体看下面说明                             | string                          | -                 |      |
| label        | 标签                                                 | string                          | -                 |      |
| title        | 标签,同 label,结合 pro-table 列表配置时使用          | string                          | -                 |      |
| name         | 入参名                                               | string                          | -                 |      |
| dataIndex    | 入参名，同 name,结合 pro-table 列表配置时使用        | string                          | -                 |      |
| hideInForm   | 是否失效去除                                         | bool                            | false             |      |
| validOptions | 校验相关，参考 antd Form.Item 校验相关的             | { validateFirst, rules:[], ...} | -                 |      |
| treeData     | type 为 treeselect 时有效，树形数据                  | object                          | -                 |      |
| optionsData  | 下拉框数据,如 Select,Radio 等输入项                  | array                           | -                 |      |
| models       | 下拉框数据对应的字段名                               | ['valueField','labelField']     | ['value','label'] |      |
| props        | type 类型对应组件原生的属性，参考 antd，会透传给组件 | object                          | -                 |      |
| itemProps    | Form.Item 原生的属性，参考 antd，会透传给组件        | object                          | -                 |      |
| renderChild  | type 为 custom 时有效，自定义组件                    | ReactNode                       | -                 |      |

layoutProps

| 参数   | 说明   | 描述             |
| ------ | ------ | ---------------- |
| column | 占几列 | 默认 1，num 类型 |

type

| 参数             | 说明                     | 描述                            |
| ---------------- | ------------------------ | ------------------------------- |
| input            | 输入框                   | -                               |
| inputnumber      | 数字框                   | -                               |
| numrange         | 数字区间                 | 输出值为 [minNumber,maxNumber]  |
| select           | 下拉框                   | 需配置 optionsData，配合 models |
| selectgroup      | 分组下拉框               | 需配置 optionsData，配合 models |
| timepickerrange  | 时间选择器               | -                               |
| yearpicker       | 年                       | -                               |
| monthpicker      | 月份                     | -                               |
| rangepicker      | 日期区间                 | -                               |
| checkbox         | 复选框                   | -                               |
| checkboxgroup    | 复选框组合               | 需配置 optionsData，配合 models |
| textarea         | 文本域                   | -                               |
| radiogroup       | 单选框组合               | 需配置 optionsData，配合 models |
| radiogroupbutton | 单选框组合 button 类型   | 需配置 optionsData，配合 models |
| switch           | 开关                     | -                               |
| treeselect       | 树形下拉框               | 需配置 treeData                 |
| roletree         | 角色树，针对角色选菜单时 | 需配置 treeData                 |
| custom           | 自定义组件               | 需配置 renderChild              |

GForm Instance

| 参数       | 说明                                                  | 类型           | 默认值 | 版本 |
| ---------- | ----------------------------------------------------- | -------------- | ------ | ---- |
| onValidate | 触发表单校验，并接收一个回调函数,给回调函数传入表单值 | (callback)=>{} | -      |      |
| ...        | 其它参考 Antd Form 的实例方法                         | -              | -      |      |

onValidate 示例

```javascript

    <GForm
      actionRef={formRef}
      defaultFooterBar={false}
      formSet={[{type:"input",name:"test",label:"测试"}]}
    />

    <Button
      type="primary"
      onClick={()=>{
        formRef.current.onValidate((values)=>{
          console.log("表单值：",values);
        })
      }}>
      表单提交
    </Button>
```
