# 搜索树组件

## 基础使用

```jsx
import React, { useState } from 'react';
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import { SearchTree } from '@dzo/com';

const treeData = [
  {
    key: '1',
    title: '父文件1',
    children: [
      { key: '1-1', title: '子文件1' },
      { key: '1-2', title: '子文件2' },
    ],
  },
  {
    key: '2',
    title: '父文件2',
    children: [
      {
        key: '2-1',
        title: '子文件3',
        folder: true,
        children: [{ key: '2-1-1', title: '子文件5' }],
      },
      {
        key: '2-2',
        title: '子文件4',
      },
    ],
  },
];

export default () => {
  return (
    <SearchTree
      treeData={treeData}
      iconRender={() => <FolderOutlined />}
      expandedLevel={null}
    />
  );
};
```

## 文件夹跟文件组合

包含右键菜单示例、重命名等

```jsx
import React, { useState, useRef } from 'react';
import {
  FolderOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { Tooltip, Menu, Modal, message } from 'antd';
import { SearchTree } from '@dzo/com';

const { TreeBreadCrumb } = SearchTree;

const treeData = [
  {
    key: '1',
    title: '文件夹1',
    folder: true, // 这个数据需要在传入之前组装好
    children: [
      { key: '1-1', title: '子文件1' },
      { key: '1-2', title: '子文件2' },
      { key: '1-3', title: '子文件3' },
      { key: '1-4', title: '子文件4' },
      { key: '1-5', title: '子文件5' },
    ],
  },
  {
    key: '2',
    title: '文件夹2',
    folder: true,
    children: [
      {
        key: '2-1',
        title: '子文件夹',
        folder: true,
        children: [{ key: '2-1-1', title: '子文件1' }],
      },
      {
        key: '2-2',
        title: '子文件2',
      },
    ],
  },
  {
    key: '3',
    title: '文件夹333333333333333',
    folder: true,
    children: [],
  },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['2-1-1']);
  return (
    <div style={{ width: 300, borderRight: 'solid 1px #f0f5f5', padding: 20 }}>
      <SearchTree
        expandedLevel={null}
        toolBarRender={() => (
          <TreeBreadCrumb
            title="我是标题"
            rightRender={() => (
              <Tooltip title="新建文件夹">
                <PlusCircleOutlined />
              </Tooltip>
            )}
          />
        )}
        selectedKeys={selectedKeys}
        treeData={treeData}
        iconRender={(item, isExpand) =>
          item.folder ? (
            isExpand ? (
              <FolderOpenOutlined />
            ) : (
              <FolderOutlined />
            )
          ) : (
            <FileTextOutlined />
          )
        }
        onSelect={(keys, item) => {
          if (!item.folder) {
            setSelectedKeys([item.key]);
          }
        }}
        onRightClickRender={({ item, clearRightClickRender, setRenameKey }) => {
          return [
            {
              key: 'add',
              name: '新增',
              onClick: () => {
                Modal.confirm({
                  content: `新增`,
                });
              },
            },
            {
              key: 'del',
              name: '删除',
              onClick: () => {
                Modal.confirm({
                  content: `确认删除${item?.title}？`,
                });
              },
            },
            {
              key: 'rename',
              name: '重命名',
              onClick: () => {
                setRenameKey(item.key);
              },
            },
          ];
        }}
        onRename={(v, item, clearRename) => {
          message.success('重命名修改成功');
          clearRename();
        }}
      />
    </div>
  );
};
```

## 全选

```jsx
import React, { useState } from 'react';
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import { SearchTree } from '@dzo/com';
import { Button } from 'antd';

const treeData = [
  {
    key: '1',
    title: '父文件1',
    children: [
      { key: '1-1', title: '子文件1' },
      { key: '1-2', title: '子文件2' },
    ],
  },
  {
    key: '2',
    title: '父文件2',
    children: [
      {
        key: '2-1',
        title: '子文件3',
        folder: true,
        children: [{ key: '2-1-1', title: '子文件5' }],
      },
      {
        key: '2-2',
        title: '子文件4',
      },
    ],
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  return (
    <>
      <SearchTree
        treeData={treeData}
        toolBarRender={({ clearCheckedKeys }) => (
          <SearchTree.TreeBreadCrumb
            title={`已选 ${checkedKeys?.length || ''}`}
            rightRender={() => (
              <a
                onClick={() => {
                  clearCheckedKeys();
                }}
              >
                清除
              </a>
            )}
          />
        )}
        checkedKeys={checkedKeys}
        onCheck={keys => {
          setCheckedKeys(keys);
        }}
        checkable
      />
      <Button
        type="primary"
        onClick={() => {
          console.log(checkedKeys);
        }}
      >
        保存
      </Button>
    </>
  );
};
```

## 叶子节点拖拽功能

```jsx
import React, { useState } from 'react';
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import { SearchTree } from '@dzo/com';

const treeData = [
  {
    key: '1',
    title: '文件夹1',
    folder: true, // 这个数据需要在传入之前组装好
    children: [
      { key: '1-1', title: '子文件1' },
      { key: '1-2', title: '子文件2' },
    ],
  },
  {
    key: '2',
    title: '文件夹2',
    folder: true,
    children: [
      {
        key: '2-1',
        title: '子文件夹',
        folder: true,
        children: [{ key: '2-1-1', title: '子文件1' }],
      },
      {
        key: '2-2',
        title: '子文件2',
      },
    ],
  },
];

export default () => {
  return (
    <SearchTree
      treeData={treeData}
      iconRender={item =>
        item.folder ? <FolderOutlined /> : <FileTextOutlined />
      }
      onTreeNodeTitle={item => {
        if (!item.folder) {
          return {
            draggable: true,
            onDrag: e => {
              e.preventDefault(); // 此处的代码是必须的  不然无法拖拽
            },
            onDragStart: e => {
              e.dataTransfer.setData('text/plain', JSON.stringify(item));
            },
            onDragEnd: () => {},
          };
        }
      }}
    />
  );
};
```

## 异步资源加载

```jsx
import React, { useState } from 'react';
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import { SearchTree } from '@dzo/com';

const initTreeData = [
  {
    key: '1',
    title: '文件夹1',
  },
  {
    key: '2',
    title: '文件夹2',
  },
  {
    key: '3',
    title: '文件夹3',
  },
];

export default () => {
  const [treeData, setTreeData] = useState(initTreeData);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const updateTreeData = (list, key, children) =>
    list.map(node => {
      if (node.key === key) {
        return { ...node, children };
      }

      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }

      return node;
    });

  const onLoadData = ({ key, children }) =>
    new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData(origin =>
          updateTreeData(origin, key, [
            {
              title: 'Child Node',
              key: `${key}-0`,
            },
            {
              title: 'Child Node',
              key: `${key}-1`,
            },
          ]),
        );
        resolve();
      }, 1000);
    });

  return (
    <SearchTree
      showLine
      loadData={onLoadData}
      treeData={treeData}
      onExpand={keys => {
        setExpandedKeys(keys);
      }}
      expandedKeys={expandedKeys}
    />
  );
};
```

## API

SearchTree

| 参数                  | 说明                                                             | 类型      | 默认值 | 版本 |
| --------------------- | ---------------------------------------------------------------- | --------- | ------ | ---- |
| title                 | 标题                                                             | string    | -      |      |
| breadCrumbRightRender | 标题右边操作栏                                                   | func      | -      |      |
| treeData              | 树状数据                                                         | array     | []     |      |
| modelKeys             | 字段索引值转化                                                   | array     | []     |      |
| search                | 是否支持搜索                                                     | bool      | true   |      |
| renameKey             | 重命名的 key                                                     | string    | -      |      |
| onRename              | 重命名回调 (value,node)=>{}                                      | func      | -      |      |
| onSelect              | 点击事件 (keys,node)=>{}                                         | func      | -      |      |
| iconRender            | 数据节点的 icon 展示 (node,isExpand)=>{}                         | func      | -      |      |
| onTreeNode            | 给数据节点绑定属性，参考 antd TreeNode 属性 (node)=>({...props}) | func      | -      |      |
| onTreeNodeTitle       | 给数据节点的 title 绑定属性 (node)=>({...props})                 | func      | -      |      |
| onRightClickRender    | 右键点击渲染 (node, clearRightClickRender, setRenameKey)=>{}     | func      | -      |      |
| containerRef          | 外部滚动的 ReactNode,滚动时候去除右键菜单渲染                    | ReactNode | -      |      |
| expandedLevel         | 默认展开第几层                                                   | num       | 1      |      |
| 其它                  | 参考 antd Tree 组件属性                                          | obj       | -      |      |

modelKeys

| 参数          | 说明          |
| ------------- | ------------- |
| childrenField | 默认 children |
| nameField     | 默认 title    |
| keyField      | 默认 key      |

## 非实时上传组件

不支持预览、下载功能,输出值为 file 对象数组，有别于实时上传组件为字符串(多文件地址以分隔符分隔)
