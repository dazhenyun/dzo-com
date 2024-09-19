---
title: EditSelect - 下拉筛选编辑
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## Demo:

```jsx
import React, { useEffect, useState } from 'react';
import { EditSelect } from '@dzo/com';
export default () => {
  const [list, setList] = useState([
    {
      name: '卡卡',
      id: '1',
    },
    {
      name: '狄路',
      id: '2',
    },
    {
      name: '胡言',
      id: '3',
    },
    {
      name: '木兰',
      id: '4',
    },
  ]);

  const editSelect = (item, items) => {
    setList(items);
  };

  const props = {
    options: list,
    fieldNames: ['name', 'id'],
    onEdit: editSelect,
    onAdd: editSelect,
    onDelete: editSelect,
    showAdd: true,
    showEdit: true,
  };
  return (
    <>
      <EditSelect {...props} />
    </>
  );
};
```

## API

EditSelect

| 参数       | 说明                              | 类型             | 默认值            | 版本 |
| ---------- | --------------------------------- | ---------------- | ----------------- | ---- |
| options    | 数据                              | array            | -                 | -    |
| fieldNames | 自定义节点 label、value 字段      | array            | ['label','value'] | -    |
| onEdit     | 编辑按钮回调 返回更改项和全部数据 | (item,items)=>{} | -                 | -    |
| onAdd      | 新增按钮回调 返回新增项和全部数据 | (item,items)=>{} | -                 | -    |
| onDelete   | 删除按钮回调 返回新增项和全部数据 | (item,items)=>{} | -                 | -    |
| showAdd    | 展示新增按钮                      | bool             | false             | -    |
| showEdit   | 展示编辑按钮                      | bool             | false             | -    |
| 其它       | antd select 组件支持属性          | obj              | false             | -    |
