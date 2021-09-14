import React from 'react';
import { keyBy } from 'lodash';
import { Menu, Popover } from 'antd';

const RightMenuPanel = ({
  menuBtns,
  itemKey,
  rightClickItem,
  clearRightClickRender,
  children,
  noPop,
  x,
  y,
}) => {
  const menuEnum = keyBy(menuBtns, 'key');

  const MenuPanel = (
    <Menu
      onClick={({ key, domEvent }) => {
        domEvent.nativeEvent.stopImmediatePropagation();
        domEvent.stopPropagation();

        menuEnum[key]?.onClick?.();
        clearRightClickRender?.();
      }}
    >
      {menuBtns.map(el => (
        <Menu.Item key={el.key}>{el.name}</Menu.Item>
      ))}
    </Menu>
  );
  // console.log(x, y)
  return noPop ? (
    <div
      className="search-tree-right-panel"
      style={{ position: 'fixed', top: y, left: x, zIndex: 9999 }}
    >
      {MenuPanel}
    </div>
  ) : (
    <Popover
      overlayClassName="search-tree-right-panel"
      content={rightClickItem ? MenuPanel : null}
      placement="rightTop"
      visible={rightClickItem?.key === itemKey}
    >
      {children}
    </Popover>
  );
};

export default RightMenuPanel;
