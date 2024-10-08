import React, { useMemo } from 'react';
import DownloadBtn from './components/DownloadBtn';
import LinkBtn from './components/LinkBtn';
import MoreBtn from './components/MoreBtn';
import NormalBtn from './components/NormalBtn';
import StatusBtn from './components/StatusBtn';
import ButtonBtn from './components/ButtonBtn';
import AuthBtn from './AuthBtn';
import { Space, Divider } from 'antd';
import userStyles from './styles';
import './index.less';

const TableBtns = ({ buttons = [], split }) => {
  const { styles, cx } = userStyles();

  const newButtton = useMemo(() => {
    return buttons.map(el => {
      const {
        hide, // 是否隐藏
        auth = true, // 按钮权限
        name, // 按钮名称
        type, // 类型 link,confirm,download,status
        ...rest
      } = el;

      if (hide) return null;

      // 判断权限
      const className = cx(styles['tb-btn'], {
        [styles['disabled']]: !auth,
      });
      const key = name || rest.status || '更多';
      const props = {
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

      if (type === 'download') {
        return <DownloadBtn key={key} {...props} />;
      }
      if (type === 'link') {
        return <LinkBtn key={key} {...props} />;
      }
      if (type === 'more') {
        return <MoreBtn key={key} {...props} />;
      }
      if (type === 'status') {
        return <StatusBtn key={key || rest.status} {...props} />;
      }
      if (type === 'button') {
        return <ButtonBtn key={key} {...props} />;
      }
      return <NormalBtn key={key} {...props} type={type} />;
    });
  }, [buttons, split]);
  return <Space split={split}> {newButtton}</Space>;
};

TableBtns.defaultProps = {
  buttons: [], // 按钮列表
  split: '',
};
TableBtns.AuthBtn = AuthBtn;

export default TableBtns;
