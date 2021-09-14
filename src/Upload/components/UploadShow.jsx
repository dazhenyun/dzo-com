import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TemplateDown from './TemplateDown';

/**
 * 上传展示组件
 */
const UploadShow = ({ uploadProps, tip, disabled, templateUrl, isPicture }) => {
  return (
    <>
      <Upload {...uploadProps}>
        {disabled ? null : isPicture ? (
          <div>
            <UploadOutlined style={{ fontSize: 18 }} />
            <div>上传</div>
          </div>
        ) : (
          <>
            <Button type="primary">
              <UploadOutlined />
              上传文件
            </Button>
            <TemplateDown templateUrl={templateUrl} />
            {tip}
          </>
        )}
      </Upload>
      {isPicture && !disabled && tip}
    </>
  );
};

export default UploadShow;
