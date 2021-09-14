import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

// 获取树的叶子节点
let leafKeys = [];

const getLeafKeys = data => {
  data &&
    data.map(item => {
      if (item.children && item.children.length > 0) {
        getLeafKeys(item.children);
      } else {
        leafKeys.push(item.id.toString());
      }
      return null;
    });
  return leafKeys;
};

/**
 * 角色树
 * @param {*} param0
 */
const RoleTree = ({ value, onChange, treeData }) => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    getLeafKeys(treeData);
  }, [treeData]);

  useEffect(() => {
    let newKeys = [];

    // 过滤出非父节点
    if (value) {
      newKeys = leafKeys.filter(el => value.includes(el));
    }
    setCheckedKeys(newKeys);
  }, [value]);

  const onCheck = (checkedKeys, e) => {
    setCheckedKeys(checkedKeys);
    onChange(checkedKeys.concat(e.halfCheckedKeys));
  };

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.menuName} key={item.id}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.menuName} key={item.id} />;
    });

  const onSelect = selectedKeys => {
    setSelectedKeys(selectedKeys);
  };

  return (
    <div style={{ height: 300, overflow: 'auto' }}>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        autoExpandParent={autoExpandParent}
        defaultExpandAll
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

export default RoleTree;
