import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const confirm = (content, onOk) => {
  Modal.confirm({
    icon: <ExclamationCircleOutlined />,
    title: '温馨提示',
    content,
    okText: '确认',
    cancelText: '取消',
    onOk,
  });
};

export const STATUS_ENUM = {
  1: '启用',
  0: '停用',
};
