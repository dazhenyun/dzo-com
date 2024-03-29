import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Tree, Input, Empty } from 'antd';
import { uniq } from 'lodash';
import { useClickOutside, useScroll, useClipboard } from '../../hooks';
import RightMenuPop from './RightMenuPanel';
import SearchEmpty from './SearchEmpty';
import { getDataList } from './util';

const { TreeNode } = Tree;

/**
 * 搜素树，含搜索文件功能以及重命名
 * @param {*} param0
 */
function TreeBasic({
  treeData = [],
  modelKeys,
  checkedKeys,
  onRename,
  onTreeNode,
  onTreeNodeTitle,
  onSelect,
  iconRender,
  onRightClickRender,
  toolBarRender,
  titleRender,
  onCheck,
  searchValue,
  onBack,
  searchInputRender,
  containerRef,
  popoverProps,
  selectedKeys,
  expandedLevel = 1, // 默认展开第几层 null: 默认关闭，不展开
  showLine = false,
  isRoot = false, // 默认获取不会带上上级节点
  ...restProps
}) {
  const {
    childrenField = 'children',
    nameField = 'title',
    keyField = 'key',
  } = modelKeys;
  const [_, { copyToClipboard }] = useClipboard();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [renameKey, setRenameKey] = useState(null);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [rightClickItem, setRightClickItem] = useState(null);
  const [selfCheckedKeys, setSelfCheckedKeys] = useState([]);
  const [coordInfo, setCoordInfo] = useState({});
  const rightPanelRef = useRef();

  // 获取树的叶子节点
  const leafKeys = useMemo(() => {
    const arr = [];
    const getLeafKeys = data => {
      data?.forEach(item => {
        const children = item?.[childrenField];
        if (children?.length > 0) {
          getLeafKeys(children);
        } else {
          arr.push(item.key);
        }
        return null;
      });
      return arr;
    };
    return getLeafKeys(treeData);
  }, [treeData]);

  useEffect(() => {
    if (isRoot) {
      let newKeys = [];
      // 过滤出非父节点
      if (checkedKeys) {
        newKeys = leafKeys.filter(el => checkedKeys.includes(el));
      }
      setSelfCheckedKeys(newKeys);
    }
  }, [checkedKeys, leafKeys, isRoot]);

  const dataList = useMemo(
    () => getDataList(treeData, keyField, nameField, childrenField),
    [treeData],
  ); // 格式化列表

  const clearRename = () => {
    setRenameKey(null);
  };

  const clearRightClickRender = () => {
    setRightClickItem(null);
  };

  const clearCheckedKeys = () => {
    setSelfCheckedKeys([]);
    onCheck?.([]);
  };

  // 空白处点击
  useClickOutside(rightPanelRef, () => {
    clearRightClickRender();
    clearRename();
  });

  // 滚动事件
  useScroll(containerRef, e => {
    clearRightClickRender();
  });

  const onCopy = async text => {
    return await copyToClipboard(text);
  };

  // 默认展开对应层次的所有keys
  const expandLevelKeys = useMemo(() => {
    const eKeys = dataList
      .filter(
        el =>
          (!el.parentKeys || el.parentKeys.length < expandedLevel) &&
          el.children?.length,
      )
      .map(el => el[keyField]);
    // v1.0.9 expandedLevel: 是否展开字节点，默认展开
    return expandedLevel ? eKeys : [];
  }, [treeData]);

  // 根据搜索内容查找符合的key
  const searchKeys = useMemo(() => {
    if (searchValue) {
      let keys = dataList
        .filter(item => item.title.includes(searchValue))
        .map(item =>
          item.parentKeys ? [...item.parentKeys, item.key] : [item.key],
        ); // 符合搜索的文件夹IDs

      keys = keys.flat();

      setAutoExpandParent(false);
      setExpandedKeys(uniq(keys));
      return uniq(keys);
    } else {
      setExpandedKeys(expandLevelKeys);
      setAutoExpandParent(false);
      return dataList.map(item => item.key); // 符合搜索的文件夹IDs;
    }
  }, [searchValue, treeData]); // 计算符合搜索的父节点

  useEffect(() => {
    let selectedParentkeys = [];
    if (selectedKeys?.length) {
      selectedKeys.forEach(key => {
        const item = dataList.filter(el => el.key === key)[0];
        if (item?.parentKeys) {
          selectedParentkeys = selectedParentkeys.concat(item.parentKeys);
        }
      });
      setExpandedKeys(uniq([...expandedKeys, ...selectedParentkeys]));
      setAutoExpandParent(false);
    }
  }, [treeData, selectedKeys, searchValue]); // 当前选中的都默认展开

  // 点击事件
  const onSelfSelect = (sKeys, { selected, node, selectedNodes, event }) => {
    const { eventKey } = node.props;
    const item = dataList.filter(el => eventKey === String(el.key))[0] || {};
    let newKeys = [...expandedKeys];
    if (item?.children?.length) {
      if (!newKeys.includes(eventKey)) {
        newKeys.push(eventKey);
      } else {
        newKeys = newKeys.filter(el => el !== eventKey);
      }
      setExpandedKeys(newKeys);
      setAutoExpandParent(false);
    }
    onSelect?.(sKeys, item, { selected, node, selectedNodes, event });
  };

  // 右键点击
  const onRightClick = ({ event, node }) => {
    if (renameKey) {
      setRenameKey(null);
    }
    if (onRightClickRender) {
      const item = dataList.filter(el => el.key === node.props.eventKey)[0];
      setCoordInfo({
        x: event.clientX + 15,
        y: event.clientY + 15,
      });
      setRightClickItem({ ...item, props: node });
    }
  };

  const onSelfCheck = (keys, e) => {
    setSelfCheckedKeys(keys);
    onCheck?.(keys, e);
  };

  const menuBtns = useMemo(
    () =>
      (rightClickItem &&
        onRightClickRender?.({
          item: rightClickItem,
          clearRightClickRender,
          setRenameKey,
          onCopy,
        })) ||
      [],
    [rightClickItem, onRightClickRender],
  );
  const loop = data => {
    return data.map(item => {
      const hasChildren = item[childrenField];
      const nodeProps = onTreeNode?.(item);
      const nodeTitleProps = onTreeNodeTitle?.(item);
      const isMatch = searchKeys.includes(item[keyField]); // 符合搜索条件

      let title = (
        // <span {...nodeTitleProps}>{item[nameField]}</span>
        <RightMenuPop
          clearRightClickRender={clearRightClickRender}
          rightClickItem={rightClickItem}
          menuBtns={menuBtns}
          itemKey={item[keyField]}
        >
          <span {...nodeTitleProps}>
            {titleRender?.(item?.[nameField], item, { onCopy }) ||
              item[nameField]}
          </span>
        </RightMenuPop>
      );

      if (renameKey === item[keyField]) {
        title = (
          <Input
            defaultValue={item[nameField]}
            onPressEnter={e => {
              onRename(e.target.value, item, clearRename);
            }}
            style={{ width: 'calc(100% - 25px)' }}
            autoFocus
            onClick={e => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
            }} // 阻止合成事件与document的冒泡
          />
        );
      }

      if (hasChildren) {
        return isMatch ? (
          <TreeNode
            key={item[keyField]}
            title={title}
            icon={iconRender?.(
              item,
              (expandedKeys?.includes(item.key) || autoExpandParent) &&
                item[childrenField]?.length,
            )}
            {...nodeProps}
          >
            {loop(item[childrenField])}
          </TreeNode>
        ) : null;
      }

      return isMatch ? (
        <TreeNode
          key={item[keyField]}
          icon={iconRender?.(item)}
          title={title}
          isLeaf={!showLine}
          {...nodeProps}
        />
      ) : null;
    });
  };

  const flag = useMemo(() => {
    if (!treeData?.length) return 1;
    else if (!searchKeys.length && searchValue) return 2;
    return 3;
  }, [treeData, searchKeys, searchValue]);

  return (
    <div
      ref={rightPanelRef}
      onClick={() => {
        clearRightClickRender();
        clearRename();
      }}
    >
      {toolBarRender?.({
        expandedKeys,
        searchValue,
        checkedKeys: selfCheckedKeys,
        clearCheckedKeys,
      })}
      {searchInputRender?.()}
      {flag === 1 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {flag === 2 && <SearchEmpty onBack={onBack} />}
      {flag === 3 && (
        <Tree
          onExpand={keys => {
            setExpandedKeys(keys);
            setAutoExpandParent(false);
          }}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onRightClick={onRightClick}
          checkedKeys={checkedKeys?.length ? checkedKeys : selfCheckedKeys}
          onCheck={onSelfCheck}
          selectedKeys={selectedKeys}
          onSelect={onSelfSelect}
          showLine={showLine}
          showIcon
          {...restProps}
        >
          {loop(treeData)}
        </Tree>
      )}

      {/* <RightMenuPop
        noPop
        clearRightClickRender={clearRightClickRender}
        rightClickItem={rightClickItem}
        menuBtns={menuBtns}
        x={coordInfo?.x}
        y={coordInfo?.y}
      >
      </RightMenuPop> */}
    </div>
  );
}

export default TreeBasic;
