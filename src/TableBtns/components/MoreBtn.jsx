import React, { useMemo } from 'react';
import { keyBy } from 'lodash';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { confirm, STATUS_ENUM } from './utils';

const MenuDrop = ({ btns }) => {
  const btnEnum = useMemo(() => keyBy(btns, e => e.name || e.status), [btns]);

  const onClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    const { type, pathname, method, confirmText, status, subText, textEnum } =
      btnEnum[key] || {};
    if (type === 'link' || type === 'download') {
      window.open(pathname, '_self');
    } else if (type === 'confirm') {
      confirm(confirmText, method);
    } else if (type === 'status') {
      const toStatus = status === 1 ? 0 : 1;
      confirm(
        `是否确认${(textEnum || STATUS_ENUM)[toStatus]}${subText || ''}?`,
        () => method(toStatus),
      );
    } else {
      method?.();
    }
  };
  return (
    <Menu onClick={onClick}>
      {btns?.map(el => {
        const toStatus = el.status === 1 ? 0 : 1;
        const textEnum = el.textEnum || STATUS_ENUM;
        return el.hide ? null : (
          <Menu.Item key={el.name || el.status} disabled={el.auth === false}>
            {el.type === 'status' ? textEnum[toStatus] : el.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const MoreBtn = ({ children, className }) => {
  return (
    <Dropdown
      overlayClassName="table-btn-more-menu"
      overlay={<MenuDrop btns={children} />}
    >
      <a className={className} onClick={e => e.preventDefault()}>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default MoreBtn;
