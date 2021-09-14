import React from 'react';
import { PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';
import { Progress } from 'antd';

/**
 * 已上传文件展示
 * @param {*} param0
 */
const FileItem = ({
  showUploadList,
  file,
  previewFile,
  onPreview,
  onRemove,
  onDownload,
  nameRender,
}) => {
  const { status, percent, name, uid } = file || {};
  const { showDownloadIcon, showPreviewIcon, showRemoveIcon } = showUploadList;
  const isSelf = previewFile?.uid === uid;
  const isError = status === 'error';
  const isUploading = status === 'uploading';

  return (
    <>
      <div
        className={`file-upload-file-item ${isError ? 'error' : ''} ${
          isSelf ? 'active' : ''
        }`}
      >
        <div className="file-upload-file-item-file-name">
          <div>
            {isUploading ? <LoadingOutlined /> : <PaperClipOutlined />}
            &nbsp;&nbsp;
            {isUploading || isError ? (
              <span>{name}</span>
            ) : nameRender ? (
              nameRender(file)
            ) : (
              <span>{name}</span>
            )}
          </div>
          {percent > 0 && isUploading && (
            <Progress percent={percent} size="small" showInfo={false} />
          )}
        </div>

        <div>
          {status === 'done' && showDownloadIcon && (
            <a
              onClick={() =>
                onDownload ? onDownload(file) : window.open(file.url)
              }
            >
              下载
            </a>
          )}
          {status === 'done' && showPreviewIcon && (
            <a onClick={() => onPreview?.(file)}>预览</a>
          )}
          {(status === 'error' || showRemoveIcon) && (
            <a onClick={() => onRemove?.(file)}>删除</a>
          )}
        </div>
      </div>
    </>
  );
};

export default FileItem;
