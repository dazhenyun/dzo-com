---
title: DzRotate - 滚动轮播组件
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## 滚动展示

展示:

```jsx
import React from 'react';
import { message } from 'antd';
import { DzRotate } from '@dzo/com';

export default () => {
        const matterList = new Array(20).fill('').map((el,index)=>({name:`卡卡${index}`}));
    return <div style={{height:'200px'}}>
          <DzRotate id='matterScroll'>
            {
            matterList.map(el => {
                return <div>
                  <span>{el.name}</span>
                </div>
              })
            }
          </DzRotate>
        </div>
}
```

## API

| 参数           | 说明                                   | 类型   | 默认值 | 版本 |
| -------------- | --------------------------------------| ------ | ------ | ---- |
| boxStyle        | 样式                                 | style   | null  |      |
| canScrolle  | 是否滚动                                  | bool    | true      |      |

