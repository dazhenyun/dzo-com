---
title: SearchForm - 搜索查询组件
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## 搜索查询组件（v1.0.10）

### 配置式使用:

```jsx
import React, { useRef } from 'react';
import { Form, Button } from 'antd';
import { SearchForm } from '@dzo/com';

const formSet = [
  {
    type: 'input',
    name: 'name',
    title: '姓名',
    props: {
      placeholder: '姓名',
    },
    column: 3,
  },
  {
    type: 'select',
    name: 'sex',
    title: '性别',
    props: {
      placeholder: '性别',
    },
    optionsData: [
      { label: '男', value: '0' },
      { label: '女', value: '1' },
    ],
  },
  {
    type: 'datepicker',
    name: 'date',
    title: '入职日期',
    props: {
      placeholder: '入职日期',
    },
  },
  {
    type: 'datepicker',
    name: 'date1',
    title: '入职日期',
    props: {
      placeholder: '入职日期',
    },
  },
];

export default () => {
  const formRef = useRef();

  const hanldeClick = () => {
    console.log(formRef.current.setFieldsValue({ sex: '1' }));
  };

  return (
    <>
      <SearchForm
        onValuesChange={(changedValues, allValues) => {
          console.log(changedValues);
        }}
        formRef={formRef}
        params={{ name: 'kaka' }}
        column={3}
        onSubmit={values => {
          console.log(values);
        }}
        hasCollapse={false}
        columns={formSet}
      />
      <Button onClick={hanldeClick}>设置</Button>
    </>
  );
};
```

## API

| 参数              | 说明                             | 类型   | 默认值 | 版本 |
| ----------------- | -------------------------------- | ------ | ------ | ---- |
| columns           | 表格列的配置描述，具体项见 GForm | array  | []     |      |
| params            | 传递参数                         | array  | {}     |      |
| searchText        | 查询按钮的文本                   | string | 查询   |      |
| resetText         | 重置按钮的文本                   | string | 重置   |      |
| labelWidth        | 文字标签的宽度                   | number | 80     |      |
| hasCollapse       | 是否显示张开收起 默认不显示      | bool   | true   |      |
| defaultColsNumber | 显示表单个数                     | number | 3      |      |
| defaultCollapsed  | 默认是否展开                     | bool   | true   |      |
| onSubmit          | 查询功能 (values)=>              | func   |        |      |
| onReset           | 重置功能 ()=>                    | func   |        |      |
| onCollapse        | 张开收起事件 (state)=>           | func   |        |      |
| loading           | 查询按钮 loading                 | bool   | false  |      |
