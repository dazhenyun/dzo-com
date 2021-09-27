## Ellipsis 省略号

## 代码演示

```jsx
import React from 'react';
import { Ellipsis } from '@dzo/com';
import { Tag } from 'antd';

export default props => {
  return (
    <>
      <h2>父级带宽度</h2>
      <div style={{ width: 100 }}>
        <Ellipsis placement="topLeft" title="你看我有省略号吗？" />
      </div>

      <h2>Tooltip和复制</h2>
      <Ellipsis copyable widthLimit={100} title="你看我有省略号吗？" />

      <h2>Popover和复制</h2>
      <Ellipsis
        Popover
        copyable
        widthLimit={100}
        content="你看我有省略号吗？"
      />

      <h2>多行省略</h2>
      <div style={{ width: 100 }}>
        <Ellipsis
          lines={2}
          title="你看我有省略号吗？你看我有省略号吗？你看我有省略号吗？"
        />
      </div>
    </>
  );
};
```

## API

| 参数       | 说明                                                         | 类型    |
| ---------- | ------------------------------------------------------------ | ------- |
| Popover    | 指定超出宽度后，悬浮显示的类型为`Popover`，缺省则为`Tooltip` | false   |
| title      | 同 Tooltip，可省略，缺省值为元素文本                         | String  |
| content    | 同 Popover，可省略，缺省值为元素文本                         | String  |
| copyable   | 显示复制按钮，缺省值为不显示，文本为空时亦不显示             | Boolean |
| lines      | 指定多行截断的最大行数                                       | Number  |
| widthLimit | 指定溢出宽度值，缺省值为父元素宽度                           | Number  |
| emptyText  | 空文本字符，缺省值为空                                       | String  |
