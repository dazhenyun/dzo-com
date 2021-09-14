import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TemplateDown from './TemplateDown';

const { Dragger } = Upload;
/**
 * 拖拽展示组件
 * @param {*} param0
 */
const DraggerShow = ({ uploadProps, tip, disabled, templateUrl }) => {
  return disabled ? (
    <Upload {...uploadProps} />
  ) : (
    <Dragger {...uploadProps}>
      <>
        <p className="ant-upload-drag-icon">
          {' '}
          <InboxOutlined />{' '}
        </p>
        <p className="ant-upload-text">
          点击或将文件拖拽到这里上传
          <TemplateDown templateUrl={templateUrl} />
        </p>
        {tip}
      </>
    </Dragger>
  );
};

export default DraggerShow;
