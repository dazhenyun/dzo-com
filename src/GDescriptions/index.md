## 没有标题描述

Demo:

```jsx
import React from 'react';
import { message } from 'antd';
import { GDescriptions } from '@dzo/com';

export default () => (
  <GDescriptions
    dataSource={{
      id: 44,
      sourceType: 1,
      chargedName: 'ttvdq',
      capacity: 75,
      description:
        '家张圆界改际方样连达并立。委正专记个情真这装调系决务被加名交立。花化农满强非特造状装统可方选采难对。',
      expireDays: 56,
      name: '队等主实己',
      guide: 'c4lhN',
      isHide: 37,
      securityLevel: 'Gim[s',
      tableUpdateTime: '1971-02-03 19:51:38',
      datasourceId: 1,
      dataCount: 93,
      categoryId: 43,
      isPartition: 60,
      dataUpdateTime: '1971-03-07 02:07:58',
      visitCount: 31,
      partitionNum: 17,
    }}
    column={2}
    columns={[
      {
        title: '表名',
        dataIndex: 'name',
      },
      {
        title: '中文名',
        dataIndex: 'cnName',
      },
      {
        title: '数据源类型',
        dataIndex: 'sourceType',
      },
      {
        title: '所属数据库',
        dataIndex: 'sourceName',
      },
      {
        title: '生命周期',
        dataIndex: 'expireDays',
        props: {
          span: 2,
        },
      },

      {
        title: '是否隐藏',
        dataIndex: 'isHide',
        render: (text, item) => (item?.isHide ? '是' : '否'),
      },
      {
        title: '是否分区',
        dataIndex: 'isPartition',
      },
      {
        title: '描述',
        colSize: 1,
        dataIndex: 'description',
      },
      {
        title: '使用说明',
        colSize: 1,
        dataIndex: 'guide',
      },
    ]}
  />
);
```

## Title 描述

Demo:

```jsx
import React from 'react';
import { message } from 'antd';
import { GDescriptions } from '@dzo/com';

export default () => (
  <GDescriptions
    title="基本信息"
    dataSource={{
      id: 44,
      sourceType: 1,
      chargedName: 'ttvdq',
      capacity: 75,
      description:
        '家张圆界改际方样连达并立。委正专记个情真这装调系决务被加名交立。花化农满强非特造状装统可方选采难对。',
      expireDays: 56,
      name: '队等主实己',
      guide: 'c4lhN',
      isHide: 37,
      securityLevel: 'Gim[s',
      tableUpdateTime: '1971-02-03 19:51:38',
      datasourceId: 1,
      dataCount: 93,
      categoryId: 43,
      isPartition: 60,
      dataUpdateTime: '1971-03-07 02:07:58',
      visitCount: 31,
      partitionNum: 17,
    }}
    column={2}
    columns={[
      {
        title: '表名',
        dataIndex: 'name',
      },
      {
        title: '中文名',
        dataIndex: 'cnName',
      },
      {
        title: '数据源类型',
        dataIndex: 'sourceType',
      },
      {
        title: '所属数据库',
        dataIndex: 'sourceName',
      },
      {
        title: '生命周期',
        dataIndex: 'expireDays',
        props: {
          span: 2,
        },
      },

      {
        title: '是否隐藏',
        dataIndex: 'isHide',
        render: (text, item) => (item?.isHide ? '是' : '否'),
      },
      {
        title: '是否分区',
        dataIndex: 'isPartition',
      },
      {
        title: '描述',
        colSize: 1,
        dataIndex: 'description',
      },
      {
        title: '使用说明',
        colSize: 1,
        dataIndex: 'guide',
      },
    ]}
  />
);
```

## 支持自定义 TitleRender

Demo:

```jsx
import React from 'react';
import { message } from 'antd';
import { BoldOutlined } from '@ant-design/icons';
import { GDescriptions } from '@dzo/com';

export default () => (
  <GDescriptions
    titleRender={() => {
      return (
        <div>
          <BoldOutlined /> &nbsp;基本信息
        </div>
      );
    }}
    hasBtn={true}
    dataSource={{
      id: 44,
      sourceType: 1,
      chargedName: 'ttvdq',
      capacity: 75,
      description:
        '家张圆界改际方样连达并立。委正专记个情真这装调系决务被加名交立。花化农满强非特造状装统可方选采难对。',
      expireDays: 56,
      name: '队等主实己',
      guide: 'c4lhN',
      isHide: 37,
      securityLevel: 'Gim[s',
      tableUpdateTime: '1971-02-03 19:51:38',
      datasourceId: 1,
      dataCount: 93,
      categoryId: 43,
      isPartition: 60,
      dataUpdateTime: '1971-03-07 02:07:58',
      visitCount: 31,
      partitionNum: 17,
    }}
    column={2}
    columns={[
      {
        title: '表名',
        dataIndex: 'name',
      },
      {
        title: '中文名',
        dataIndex: 'cnName',
      },
      {
        title: '数据源类型',
        dataIndex: 'sourceType',
      },
      {
        title: '所属数据库',
        dataIndex: 'sourceName',
      },
      {
        title: '生命周期',
        dataIndex: 'expireDays',
        props: {
          span: 2,
        },
      },

      {
        title: '是否隐藏',
        dataIndex: 'isHide',
        render: (text, item) => (item?.isHide ? '是' : '否'),
      },
      {
        title: '是否分区',
        dataIndex: 'isPartition',
      },
      {
        title: '描述',
        dataIndex: 'description',
        ellipsis: {
          lines: 2,
          copyable: true,
        },
      },
      {
        title: '使用说明',
        dataIndex: 'guide',
      },
    ]}
  />
);
```

## API

GDescriptions

| 参数        | 说明                                          | 类型    | 默认值 | 版本   |
| ----------- | --------------------------------------------- | ------- | ------ | ------ |
| title       | 标题                                          | string  | -      |        |
| column      | antd 配置 Descriptions.Item 的 colon 的默认值 | number  | 1      |        |
| dataSource  | 数据源                                        | object  | {}     |        |
| columns     | 表格列的配置描述，具体项见下表                | string  | -      |        |
| titleRender | 标题方法                                      | funcion | -      |        |
| hasBtn      | 是否显示展开收起                              | bool    | false  |        |
| loading     | 是否开始骨架屏                                | bool    | false  |        |
| ellipsis    | 参考 @dzo/com 的属性 Ellipsis                 | object  | false  | v1.1.9 |
| ...rest     | 参考 antd Descriptions 的属性                 | object  | {}     |        |

columns 属性

| 参数      | 说明                             | 类型     | 默认值 | 版本 |
| --------- | -------------------------------- | -------- | ------ | ---- |
| title     | 标题                             | string   | -      |      |
| dataIndex | 字段名                           | number   | 1      |      |
| render    | function(text, item,props)       | function | ()=>   |      |
| props     | 参考 antd DescriptionItem 的属性 | object   | {}     |      |
