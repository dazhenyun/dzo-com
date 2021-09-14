## 金额组件

展示:

```jsx
import React from 'react';
import { message } from 'antd';
import { Money } from '@dzo/com';

const { MoneyInput, MoneyShow } = Money.set(100); // 甚至转化单位

export default () => (
  <>
    无值：
    <MoneyShow value={'--'} />
    <br />
    小
    <MoneyShow value={10000} size="sm" />
    <br />
    中（默认）
    <MoneyShow value={10000} />
    <br />
    大
    <MoneyShow value={10000} size="lg" />
    <br />
    加粗
    <MoneyShow value={10000} size="lg" bold />
    <br />
    颜色（green,red,orange,primary,默认文本色）
    <MoneyShow value={10000} size="lg" color="green" />
    <MoneyShow value={10000} size="lg" color="red" />
    <MoneyShow value={10000} size="lg" color="orange" />
    <MoneyShow value={10000} size="lg" color="primary" />
    <br />
    横排：
    <MoneyShow value={10000} align="horizontal" precision={4} />
  </>
);
```

## 金额输入框

```jsx
import React, { useState } from 'react';
import { message } from 'antd';
import { Money, GForm } from '@dzo/com';

const { MoneyInput } = Money.set(100); // 甚至转化单位

export default () => {
  const [value, setValue] = useState(1);
  const onChange = v => {
    console.log(v);
    setValue(v);
  };

  return (
    <>
      金额输入框： <MoneyInput value={value} onChange={onChange} />
      <br />
      <br />
      <br />
      Form表单结合:
      <GForm
        formSet={[
          {
            label: '金额',
            type: 'custom',
            name: 'amount',
            renderChild: <MoneyInput />,
            props: {
              precision: 4, // 默认两位
            },
          },
          {
            label: '金额',
            type: 'custom',
            name: 'amount2',
            renderChild: <MoneyInput />,
            props: {
              prefix: '$',
              suffix: '元',
            },
          },
          {
            label: '金额',
            type: 'custom',
            name: 'amount3',
            renderChild: <MoneyInput />,
            props: {
              addonBefore: '$',
              addonAfter: '元',
            },
          },
        ]}
      />
    </>
  );
};
```

## API

MoneyShow

| 参数      | 说明                                     | 类型      | 默认值 | 版本 |
| --------- | ---------------------------------------- | --------- | ------ | ---- |
| value     | 数值                                     | num , str | -      |      |
| size      | 字体大小三种规格 sm,md,lg                | bool      | true   |      |
| bold      | 是否加粗                                 | bool      | false  |      |
| color     | 颜色 green,red,orange,primary,默认文本色 | string    | -      |      |
| align     | 横排 horizontal                          | string    | -      |      |
| prefix    | 前缀                                     | string    | ￥     |      |
| precision | 精度                                     | num       | 2      |      |
| className | 样式                                     | string    | -      |      |
| 其它      | Statistic 组件支持的属性                 | obj       | -      |      |

MoneyInput

| 参数        | 说明                       | 类型      | 默认值 | 版本 |
| ----------- | -------------------------- | --------- | ------ | ---- |
| value       | 数值                       | num       | -      |      |
| onChange    | 输入监听变化               | func      | -      |      |
| prefix      | 前缀图标                   | ReactNode | -      |      |
| suffix      | 后缀图标                   | ReactNode | -      |      |
| addonBefore | 前缀标签                   | ReactNode | -      |      |
| addonAfter  | 后缀标签                   | ReactNode | -      |      |
| 其它        | InputNumber 组件支持的属性 | obj       | -      |      |
