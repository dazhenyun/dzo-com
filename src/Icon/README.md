## Icon 组件

## 代码演示

```jsx
import React from 'react';
import { Icon, iconList } from '@dzo/com';

export default props => {
  return (
    <>
      {iconList.map(item => (
        <Icon
          key={item.icon_id}
          type={item.font_class}
          style={{ fontSize: 20, color: 'red' }}
          className={item.font_class}
        />
      ))}
    </>
  );
};
```

### API

#### Icon

| 属性名称  | 属性说明       | 类型   | 默认值 | 是否必须 |
| :-------- | :------------- | :----- | :----- | :------- |
| type      | icon 类型标识  | string | -      | 是       |
| className | 额外样式       | string | -      | 否       |
| style     | 内联样式       | obj    | -      | 否       |
| ...       | svg 支持的属性 | -      | -      | 否       |
