import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Tree, Input, Empty } from 'antd';
import { uniq } from 'lodash';
import { useClickOutside, useScroll } from '../../hooks';
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
  onCheck,
  searchValue,
  onBack,
  searchInputRender,
  containerRef,
  popoverProps,
  selectedKeys,
  expandedLevel = 1, // 默认展开第几层
  ...restProps
}) {
  const {
    childrenField = 'children',
    nameField = 'title',
    keyField = 'key',
  } = modelKeys;
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [renameKey, setRenameKey] = useState(null);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [rightClickItem, setRightClickItem] = useState(null);
  const [selfCheckedKeys, setSelfCheckedKeys] = useState([]);
  const [coordInfo, setCoordInfo] = useState({});
  const rightPanelRef = useRef();

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

  // 默认展开对应层次的所有keys
  const expandLevelKeys = useMemo(() => {
    const eKeys = dataList
      .filter(
        el =>
          (!el.parentKeys || el.parentKeys.length < expandedLevel) &&
          el.children?.length,
      )
      .map(el => el[keyField]);
    return eKeys;
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
  }, [treeData, selectedKeys]); // 当前选中的都默认展开

  // 点击事件
  const onSelfSelect = (sKeys, { node }) => {
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
    onSelect?.(sKeys, item);
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
      // console.log(event, node, containerRef?.current?.getComputedStyle?.(), containerRef?.current?.clientHeight, containerRef?.current?.offsetY)
      setRightClickItem(item);
    }
  };

  const onSelfCheck = keys => {
    setSelfCheckedKeys(keys);
    onCheck?.(keys);
  };

  const menuBtns = useMemo(
    () =>
      (rightClickItem &&
        onRightClickRender?.({
          item: rightClickItem,
          clearRightClickRender,
          setRenameKey,
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
          <span {...nodeTitleProps}>{item[nameField]}</span>
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
          isLeaf
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
