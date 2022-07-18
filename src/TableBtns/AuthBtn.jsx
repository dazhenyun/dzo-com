import React from 'react';
import DownloadBtn from './components/DownloadBtn';
import LinkBtn from './components/LinkBtn';
import MoreBtn from './components/MoreBtn';
import NormalBtn from './components/NormalBtn';
import StatusBtn from './components/StatusBtn';
import ButtonBtn from './components/ButtonBtn';
import { Tooltip } from 'antd';
import './index.less';

const AuthBtn = ({
  hide, // 是否隐藏
  auth = true, // 按钮权限
  name, // 按钮名称
  type, // 类型 link,confirm,download,status
  props,
  tooltip = '',
  ...rest
}) => {
  if (hide) return null;

  // 判断权限
  const className = `table-btn ${auth ? '' : 'disabled'}`;
  const key = name || rest.status || '';
  const newProps = {
    ...props,
    ...rest,
    className,
    name: key,
  };
  if (!auth) {
    // 没权限按钮
    return (
      <span key={key} className={className}>
        {name}
      </span>
    );
  }

  if (type === 'more') {
    return <MoreBtn key={key} {...props} />;
  }

  let children = null;

  //支持Tooltip提示
  const BaseBtn = {
    download: <DownloadBtn key={key} {...newProps} />,
    link: <LinkBtn key={key} {...newProps} />,
    status: <StatusBtn key={key} {...newProps} />,
    button: <ButtonBtn key={key} {...newProps} />,
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

AuthBtn.defaultProps = {
  hide: false,
  auth: true,
  name: '',
};

export default AuthBtn;
