# 自定义 icon

## 结合 iconfont 使用

Demo:

```jsx
import React, { useEffect } from 'react';
import { ComIcon } from '@dzo/com';
import { message } from 'antd';

export default () => {
  useEffect(() => {
    // 引入官方iconfont的Symbol的js文件，如果在项目中，可以放在html script标签引入一次即可
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//at.alicdn.com/t/font_1867423_9ry0ntx1gbk.js';
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <ComIcon
        type="syncPeople"
        onClick={() => {
          message.success('你好');
        }}
      />
      <ComIcon type="fuzhi" style={{ marginLeft: 10, color: 'red' }} />
    </>
  );
};
```

## API

TableBtns

| 参数      | 说明                                                               | 类型   | 默认值 | 版本 |
| --------- | ------------------------------------------------------------------ | ------ | ------ | ---- |
| type      | iconfont 的命名,必填                                               | string | -      | -    |
| onClick   | 点击事件                                                           | func   | -      | -    |
| className | 样式, **如果发现颜色设置无效时，需在 iconfont 的官网设置批量去色** | string | -      | -    |
| style     | 内联样式                                                           | obj    | -      | -    |
| ...       | svg 支持的属性                                                     | -      | -      | -    |
