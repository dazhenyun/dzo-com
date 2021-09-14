## 数字区间组件

Demo:

```jsx
import React, { useState } from 'react';
import { NumRange } from '@dzo/com';

export default () => {
  const [value, setValue] = useState(null);
  return (
    <NumRange
      value={value}
      style={{ width: 500 }}
      onChange={v => {
        setValue(v);
      }}
    />
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
