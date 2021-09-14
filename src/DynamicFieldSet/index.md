## 动态列表增删组件

## 配置式使用:

```jsx
import React, { useRef } from 'react';
import { Form } from 'antd';
import { DynamicFieldSet, GForm } from '@dzo/com';

const formSet = [
  {
    type: 'input',
    name: 'name',
    props: {
      placeholder: '姓名',
    },
  },
  {
    type: 'select',
    name: 'sex',
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
    props: {
      placeholder: '入职日期',
    },
  },
];

export default () => {
  const formRef = useRef();

  return (
    <GForm
      column={1}
      actionRef={formRef}
      submitCall={values => {
        console.log(values);
      }}
      formSet={[
        {
          type: 'custom',
          renderChild: <DynamicFieldSet name="list" listFormSet={formSet} />,
        },
      ]}
    />
  );
};
```

## 嵌入式使用:

```jsx
import React, { useRef } from 'react';
import { Form } from 'antd';
import { DynamicFieldSet, GForm } from '@dzo/com';

const formSet = [
  {
    type: 'input',
    name: 'name',
    props: {
      placeholder: '姓名',
    },
  },
  {
    type: 'select',
    name: 'sex',
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
    props: {
      placeholder: '入职日期',
    },
  },
];

export default () => {
  const formRef = useRef();

  return (
    <GForm
      actionRef={formRef}
      submitCall={values => {
        console.log(values);
      }}
    >
      <DynamicFieldSet name="list" listFormSet={formSet} />
    </GForm>
  );
};
```

## 表格动态形式:

```jsx
import React, { useRef } from 'react';
import { Form } from 'antd';
import { DynamicFieldSet, GForm } from '@dzo/com';

const formSet = [
  {
    type: 'input',
    label: '姓名',
    name: 'name',
    props: {
      placeholder: '姓名',
    },
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
    label: '入职日期',
    props: {
      placeholder: '入职日期',
    },
  },
];

export default () => {
  const formRef = useRef();

  return (
    <GForm
      column={1}
      actionRef={formRef}
      submitCall={values => {
        console.log(values);
      }}
      formSet={[
        {
          type: 'custom',
          renderChild: (
            <DynamicFieldSet name="list" listFormSet={formSet} hasHead />
          ),
        },
      ]}
    />
  );
};
```

## API

| 参数        | 说明                                    | 类型   | 默认值 | 版本 |
| ----------- | --------------------------------------- | ------ | ------ | ---- |
| name        | 参数名,必填                             | string | -      |      |
| listFormSet | 每行的输入框配置，参考 GForm 的 formSet | array  | -      |      |
| hasAdd      | 是否显示新增按钮                        | bool   | true   |      |
| hasDel      | 是否显示删除按钮                        | bool   | true   |      |
| hasHead     | 是否有头部，呈现表格形式                | bool   | false  |      |
