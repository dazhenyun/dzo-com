import React, { useState, useEffect } from 'react';
import TreeSearchInput from './components/TreeSearchInput';
import TreeBreadCrumb from './components/TreeBreadCrumb';
import TreeBasic from './components/TreeBasic';

/**
 * 搜索树，含搜索文件功能以及重命名
 * @param {*} param0
 */
function SearchTree({ placeholder, search, ...restProps }) {
  const [searchValue, setSearchValue] = useState('');
  const onSearch = value => {
    setSearchValue(value);
  };

  return (
    <TreeBasic
      {...restProps}
      searchValue={searchValue}
      onBack={() => {
        setSearchValue('');
      }}
      searchInputRender={() =>
        search ? (
          <TreeSearchInput
            placeholder={placeholder}
            onSearch={v => onSearch(v)}
            value={searchValue}
          />
        ) : null
      }
    />
  );
}

SearchTree.defaultProps = {
  treeData: [], // 树状数据
  modelKeys: {
    childrenField: 'children', // children的字段名
    nameField: 'title', // 名称显示字段
    keyField: 'key', // key值字段，需string
  },
  search: true, // 是否支持搜索
  renameKey: '', // 重命名的key
  onRename: () => {}, // 重命名回调
  onSelect: () => {}, // 点击事件
  iconRender: null, // 数据icon展示
  onTreeNode: null, // 给结点绑定属性
  onTreeNodeTitle: null, // 给结点标题绑定属性
  onRightClickRender: null, // 右键菜单渲染
  toolBarRender: null,
  getPopupContainer: null, // 渲染节点
};

SearchTree.TreeBreadCrumb = TreeBreadCrumb;
export default SearchTree;
