---
title: RootContainer - 主入口页面
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## 主入口页面

Demo:

```jsx
import React, { useState } from 'react';
import { Dropdown, Button } from 'antd';
import { RootContainer, DZ, getGlobalConfig } from '@dzo/com';

export default () => {
  const themeOptions = getGlobalConfig().themeOptions;

  const onMenuClick = e => {
    console.log('click', e.key);
    DZ.external.switchTheme(e.key);
  };

  return (
    <RootContainer>
      <Button type="primary">primary</Button>
      <Dropdown.Button
        menu={{
          items: themeOptions.map(el => ({
            key: el.rtBgColor,
            label: el.text,
          })),
          onClick: onMenuClick,
        }}
      >
        样式
      </Dropdown.Button>
    </RootContainer>
  );
};
```

## API

TableBtns

| 参数      | 说明                                                 | 类型       | 默认值 | 版本 |
| --------- | ---------------------------------------------------- | ---------- | ------ | ---- |
| value     | 受控                                                 | 数字 array | -      |      |
| onChange  | 变化回调                                             | function   | -      |      |
| precision | 精度位数                                             | num        | 0      |      |
| minProps  | 区间小的一方的属性，支持 antd InputNumber 的所有属性 | object     | -      |      |
| maxProps  | 区间大的一方的属性，支持 antd InputNumber 的所有属性 | object     | -      |      |
| ...rest   | 支持 antd InputGroup 的所有属性                      | object     | -      |      |
