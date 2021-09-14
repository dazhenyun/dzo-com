import React from 'react';

const Tip = ({ maxSize, maxLength, acceptSuffix }) => {
  return (
    <p className="ant-upload-hint">
      {`大小不超过${maxSize}mb`}
      {/* {width && `图片尺寸为${width}*${height} `} */}
      {acceptSuffix && ` 只支持${acceptSuffix}文件`}
      {maxLength > 1 && ` 最多上传${maxLength}个文件`}
    </p>
  );
};

export default Tip;
