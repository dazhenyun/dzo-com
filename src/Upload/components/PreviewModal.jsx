import React, { useMemo } from 'react';
import { Modal } from 'antd';

const PreviewModal = ({ previewFile, onOk, ...rest }) => {
  const { url, type } = previewFile || {};

  // 判断文件是否是图片
  const isImg = useMemo(
    () => ['jpg', 'jpeg', 'png', 'svg', 'gif', 'pjpeg'].includes(type),
    [previewFile],
  );

  return (
    <Modal
      title="文件预览"
      okText="关闭"
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={onOk}
      onOk={onOk}
      {...rest}
    >
      {url ? (
        isImg ? (
          <img src={previewFile.url} alt="" width="100%" />
        ) : (
          <iframe
            src={`https://view.officeapps.live.com/op/view.aspxsrc=${previewFile.url}`}
            width="100%"
            height="100%"
            frameborder="1"
          ></iframe>
        )
      ) : null}
    </Modal>
  );
};

export default PreviewModal;
