---
title: ModalForm - 弹框表单
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## 表单弹窗

### 修改密码

```jsx
import React, { useState ,useRef} from 'react';
import { message, Button, Alert } from 'antd';
import { ModalForm } from '@dzo/com';

export default () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);
  const props = {
    visible,
    title: '修改密码',
    formRef,
    initialValues: { id: 1 },
    formSet: [
      {
        type: 'input',
        dataIndex: 'id',
        title: 'id',
        column: 0, // 占比列数为0，即可隐藏
      },
      {
        type: 'password',
        dataIndex: 'password',
        title: '密码框',
        validOptions: {
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        },
      },
      {
        type: 'password',
        dataIndex: 'confirm',
        title: '密码确认',
        validOptions: {
          dependencies: ['password'],
          rules: [
            {
              required: true,
              message: '不能为空',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码不一致'));
              },
            }),
          ],
        },
      },
    ],
    onCancel: () => {
      setVisible(false);
    },
    onOk: values => {
      console.log(values);
      console.log('formRef',formRef.current.getFieldsValue());
    },
    beforeRender: () => (
      <Alert
        message="表单前位置渲染"
        type="warning"
        style={{ marginBottom: 10 }}
      />
    ),
    afterRender: () => <Alert message="表单后位置渲染" />,
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        修改密码
      </Button>
      <ModalForm {...props} />
    </>
  );
};
```

## API

| 参数           | 说明                                   | 类型   | 默认值 | 版本 |
| -------------- | -------------------------------------- | ------ | ------ | ---- |
| visible        | 弹窗显示                               | bool   | false  |      |
| initialValues  | 表单初始值                             | object | -      |      |
| formSet        | 表单的配置项，请参考 GForm 的 formSet  | array  | -      |      |
| formProps      | form 内部的一些配置，参考 GForm 的属性 | object | -      |      |
| formRef        | 操作表单的方法                         | object | -      |      |
| loading        | 请求的加载状态                         | bool   | false  |      |
| onValuesChange | 表单的值变化监听钩子                   | func   | -      |      |
| onOk           | 保存按钮的回调                         | func   | -      |      |
| onCancel       | 关闭按钮的回调                         | func   | -      |      |
| beforeRender   | 表单前的渲染 initialValues=>ReactNode  | func   | -      |      |
| afterRender    | 表单后的渲染 initialValues=>ReactNode  | func   | -      |      |
| ...rest        | 参考 antd Modal 的属性                 | object | -      |      |
