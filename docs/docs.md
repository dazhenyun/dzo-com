---
title: 二次开发
nav:
  title: 文档
  path: /docs
group:
  path: /docs
---

## registerComponent 组件注册

```js
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

### 注册外部扩展方法到 DZ

```js
import React from 'react';
import { DZ, GForm } from '@dzo/com';
import { Button, message } from 'antd';

DZ.registerExternal({
  message1(text) {
    message.success(text);
  },
});
export default () => {
  DZ.getUser(); // 获取角色

  const props = {
    formSet: [
      {
        type: 'input',
        label: '用户名',
        name: 'username',
      },
    ],
    column: 1,
    style: { width: 400, margin: '0 auto' },
    defaultFooterBar: false,
    layout: 'vertical',
    submitCall: values => {
      DZ.external.message1('你好');
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

## DZ api

| 参数             | 说明                     | 类型   | 默认值 | 版本   |
| ---------------- | ------------------------ | ------ | ------ | ------ |
| external         | DZ.external 获取扩展方法 | object | -      | 1.0.10 |
| registerExternal | 注册外部扩展方法到 DZ    | object | -      | 1.0.10 |
| getUser          | 获取用户信息             | object | -      | 1.0.10 |
| setUser          | 设置用户信息             | object | -      | 1.0.10 |
