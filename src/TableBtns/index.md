---
title: TableBtns - 操作按钮组
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

## 列表操作按钮

Demo:

```jsx
import React from 'react';
import { message } from 'antd';
import { TableBtns } from '@dzo/com';

const buttons = [
  {
    name: '编辑',
    method: () => {
      message.success('设置点击事件');
    },
  },
  {
    type: 'confirm',
    name: '删除',
    auth: false,
    confirmText: '确认删除',
    method: () => {
      message.success('删除点击事件');
    },
  },
  {
    type: 'download',
    name: '下载',
    tooltip: '下载',
    fileName: 'test.csv',
    pathname: 'http://www.baidu.com',
  },
  {
    type: 'link',
    name: '链接',
    pathname: 'http://www.baidu.com',
  },
  {
    type: 'status',
    status: 1, // 默认0 1 切换
    textEnum: { 1: '授权', 0: '取消授权' },
    method: v => {
      console.log(v);
    },
  },
  {
    type: 'more',
    children: [
      {
        name: '编辑1',
        method: () => {
          message.success('设置点击事件');
        },
      },
      {
        type: 'confirm',
        name: '删除1',
        method: () => {
          message.success('删除点击事件');
        },
      },
      {
        type: 'download',
        name: '下载1',
        auth: false,
        fileName: 'test.csv',
        pathname: 'http://www.baidu.com',
      },
      {
        type: 'link',
        name: '链接1',
        pathname: 'http://www.baidu.com',
      },
      {
        type: 'status',
        status: 1, // 默认0 1 切换
        method: v => {
          console.log(v);
        },
      },
    ],
  },
];
export default () => <TableBtns buttons={buttons} />;
```

## 单个操作按钮

Demo:

```jsx
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { message, Space } from 'antd';
import { TableBtns } from '@dzo/com';

const AuthBtn = {
  name: '编辑',
  type: 'button',
  props: {
    type: 'primary',
  },
  auth: false,
  method: () => {
    message.success('设置点击事件');
  },
};

const AuthBtnDel = {
  name: '删除',
  type: 'button',
  tooltip: '删除',
  auth: false,
  confirmText: '您确定要删除吗',
  props: {
    type: 'primary',
  },
  method: () => {
    message.success('设置点击事件');
  },
};

const AuthBtnIcon = {
  name: '下载',
  tooltip: '下载',
  props: {
    type: 'link',
  },
  method: () => {
    message.success('设置点击事件');
  },
};

const AuthBtnMore = {
  type: 'more',
  children: [
    {
      name: '编辑1',
      method: () => {
        message.success('设置点击事件');
      },
    },
    {
      type: 'confirm',
      name: '删除1',
      auth: false,
      method: () => {
        message.success('删除点击事件');
      },
    },
    {
      type: 'download',
      name: '下载1',
      fileName: 'test.csv',
      pathname: 'http://www.baidu.com',
    },
    {
      type: 'link',
      name: '链接1',
      pathname: 'http://www.baidu.com',
    },
    {
      type: 'status',
      status: 1, // 默认0 1 切换
      method: v => {
        console.log(v);
      },
    },
  ],
};

export default () => (
  <>
    <Space>
      <TableBtns.AuthBtn {...AuthBtnDel} />
      <TableBtns.AuthBtn {...AuthBtn} />
      <TableBtns.AuthBtn {...AuthBtn} type="text" />
      <TableBtns.AuthBtn {...AuthBtnIcon} />
      <TableBtns.AuthBtn {...AuthBtnMore} />
    </Space>
  </>
);
```

## API

TableBtns

| 参数        | 说明                                                      | 类型    | 默认值               | 版本 |
| ----------- | --------------------------------------------------------- | ------- | -------------------- | ---- |
| hide        | 是否隐藏                                                  | bool    | false                |      |
| auth        | 权限                                                      | bool    | true                 |      |
| name        | 名称                                                      | string  | -                    |      |
| type        | 类型（link,confirm,download,status,more）,可不填          | string  | -                    |      |
| method      | 方法，点击回调                                            | funcion | -                    |      |
| pathname    | 路径，type 为 download、link 时有效，必填                 | string  | -                    |      |
| confirmText | 确认框询问文案，type 为 confirm 有效                      | string  | 是否确认操作？       |      |
| subText     | 确认框次文本， type 为 status 时有效                      | string  | -                    |      |
| fileName    | 下载时的文件名，type 为 download 时有效，必填             | string  | -                    |      |
| status      | 当前状态，1 为启用，0 为停用，type 为 status 时有效，必填 | string  | -                    |      |
| textEnum    | 0、1 对应的文案，type 为 status 时有效，必填              | obj     | {0:'停用'，1:'启用'} |      |
| children    | type 为 more 时有效，必填                                 | []      | -                    |      |

TableBtns.AuthBtn

| 参数    | 说明                                                | 类型   | 默认值 | 版本 |
| ------- | --------------------------------------------------- | ------ | ------ | ---- |
| tooltip | 支持提示类型（link,confirm,download,status,button） | string | -      |      |
