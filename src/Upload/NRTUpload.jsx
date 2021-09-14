import React, { useMemo, useState } from 'react';
import { message } from 'antd';
import UploadShow from './components/UploadShow';
import Tip from './components/Tip';
import FileItem from './components/FileItem';
import { AcceptMap } from './util';

/**
 * 非实时上传组件
 */
const NRTUpload = ({
  listType,
  acceptSuffix = '', // 支持的文件后缀,逗号相隔
  maxLength = 1, // 最大上传文件数
  maxSize = 2, // 大小,默认2M
  disabled = false, // 只查看不能操作
  value,
  templateUrl, // 下载模板
  separator = ';',
  onChange,
  ...rest
}) => {
  const accept = useMemo(
    () => acceptSuffix?.split(',').map(el => AcceptMap[el] || el),
    [acceptSuffix],
  ); // 文件接受的类型

  const [fileList, setFileList] = useState([]);

  // 往外部传值
  const triggerChange = fileList => {
    onChange?.(fileList?.length ? fileList : undefined);
  };

  // 外部value值
  const outFileList = useMemo(() => {
    if (value && typeof value === 'string') {
      const newFileList = value
        ?.split(separator)
        ?.filter(el => el)
        .map((el, index) => {
          const arr = el.split('/');
          return {
            uid: index,
            status: 'done',
            url: el,
            name: arr[arr.length - 1],
          };
        });
      return newFileList;
    } else if (value && typeof value === 'object' && value.length) {
      return value;
    }
    return undefined;
  }, [value]);

  const currFileList = outFileList || fileList;

  // 默认按钮配置
  const defaultShowUploadList = {
    showPreviewIcon: false,
    showDownloadIcon: false,
    showRemoveIcon: !disabled,
  };

  // 删除功能
  const onMyRemove = file => {
    const list = currFileList?.filter(el => el.uid !== file.uid);
    setFileList(list);
    triggerChange(list);
  };

  const uploadProps = {
    fileList: currFileList,
    accept,
    showUploadList: defaultShowUploadList,
    beforeUpload: async file => {
      const isLtSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtSize) {
        message.error(`文件要小于${maxSize}MB!`);
      }

      return isLtSize;
    },
    itemRender(originNode, file) {
      return (
        <FileItem
          file={file}
          showUploadList={defaultShowUploadList}
          onRemove={onMyRemove}
        />
      );
    },
    onChange({ file, fileList }) {
      const { status, name } = file;
      const newFileList = fileList.slice(0, maxLength || fileList.length);
      setFileList([...newFileList]);

      if (status === 'done') {
        triggerChange(
          fileList.map(el => {
            const { response, url, ...rest } = el;
            return { ...rest, ...response, url: url || response?.url };
          }),
        );
      }
      if (status === 'error') {
        message.error(`${name} 文件上传失败`);
      }
    },
    customRequest: ({ file, onSuccess }) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读取文件
      reader.onload = localFile => {
        onSuccess({ url: file.name });
      };
    },
    onRemove: onMyRemove,
    disabled,
    ...rest,
  };
  return (
    <UploadShow
      uploadProps={uploadProps}
      tip={
        <Tip
          maxLength={maxLength}
          maxSize={maxSize}
          acceptSuffix={acceptSuffix}
        />
      }
      disabled={disabled || currFileList.length >= maxLength}
      templateUrl={templateUrl}
    />
  );
};

export default NRTUpload;
