import React from 'react';

import DownloadBtn from './components/DownloadBtn';
import LinkBtn from './components/LinkBtn';
import MoreBtn from './components/MoreBtn';
import NormalBtn from './components/NormalBtn';
import StatusBtn from './components/StatusBtn';
import ButtonBtn from './components/ButtonBtn';
import { Tooltip, Button } from 'antd';
import userStyles from './styles';
import './index.less';

const AuthBtn = ({
  hide, // 是否隐藏
  auth = true, // 按钮权限
  name, // 按钮名称
  type = 'link', // 类型 link,confirm,download,status
  props,
  tooltip = '',
  ...rest
}) => {
  const { styles, cx } = userStyles();
  if (hide) return null;

  // 判断权限
  // 判断权限
  const className = cx(styles['tb-btn'], {
    [styles['disabled']]: !auth,
  });
  const key = name || rest.status || '';
  const newProps = {
    auth,
    ...props,
    ...rest,
    className,
    name: key,
  };

  let children = null;

  //支持Tooltip提示
  const BaseBtn = {
    download: <DownloadBtn key={key} {...newProps} />,
    link: <LinkBtn key={key} {...newProps} />,
    status: <StatusBtn key={key} {...newProps} />,
    button: <ButtonBtn key={key} {...newProps} />,
    more: <MoreBtn key={key} {...newProps} />,
  };

  if (BaseBtn?.[type]) {
    children = BaseBtn[type];
  } else {
    children = <NormalBtn key={key} {...newProps} type={type} />;
  }

  return tooltip ? (
    <Tooltip placement="top" title={tooltip}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

export default AuthBtn;
