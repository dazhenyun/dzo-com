import React, { useState, useMemo, useEffect } from 'react';
import { message } from 'antd';
import { AcceptMap } from './util';
import DraggerShow from './components/DraggerShow';
import UploadShow from './components/UploadShow';
import FileItem from './components/FileItem';
import PreviewModal from './components/PreviewModal';
import './index.less';

/**
 * 文件上传组件：
 *  支持单文件、多文件，限定文件数量；
 *  上传格式控制；
 *  文件预览、删除；
 *  支持只查看不能操作
 */
const FileUpload = ({
  listType,
  acceptSuffix = '', // 支持的文件后缀,逗号相隔
  maxLength = 1, // 最大上传文件数
  maxSize = 2, // 大小,默认2M
  totalMaxSize = 2, // 多文件上传时的总M数
  disabled = false, // 只查看不能操作
  value,
  action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  separator = ';', // 分隔符
  templateUrl, // 下载模板
  headers,
  showUploadList,
  onChange,
  onPreview,
  onRemove,
  onDownload,
  isDragger,
  isOSS, // 是否OSS上传
  queryOssSign, // 获取OSS签名
  data,
  beforeUpload,
  modelKeys = {
    urlKey: 'url',
    idKey: 'id',
    nameKey: 'name',
  },
  isArrayType, // 是否数组类型
  nameRender,
  ...rest
}) => {
  const isDocDemo =
    action === 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
  const [OSSData, setOSSData] = useState({});
  const [fileList, setFileList] = useState([]); // 本地的文件数据
  const [visible, setVisible] = useState(false); // 预览弹窗
  const [previewFile, setPreviewFile] = useState({}); // 预览数据
  const [uploadLock, setUploadLock] = useState(false); // 预览数据
  const isPicture = listType?.includes('picture'); // 是否针对图片
  const accept = useMemo(
    () => acceptSuffix?.split(',').map(el => AcceptMap[el] || el),
    [acceptSuffix],
  ); // 文件接受的类型

  // 获取OSS签名
  const getOSSData = async () => {
    try {
      if (typeof queryOssSign === 'function') {
        const { success, data } = await queryOssSign();
        if (success) {
          setOSSData(data || {});
        }
      } else if (queryOssSign && typeof queryOssSign === 'object') {
        setOSSData(queryOssSign);
      }
    } catch (error) {
      message.error(error);
    }
  };

  // 获取请求入参
  const getExtraData = file => {
    return {
      key: file.url, // 文件名字，可设置路径
      OSSAccessKeyId: OSSData.accessid, // Bucket 拥有者的Access Key Id。
      policy: OSSData.policy, // policy规定了请求的表单域的合法性
      Signature: OSSData.signature, //根据Access Key Secret和policy计算的签名信
      success_action_status: '200', // 让服务端返回200,不然，默认会返回204
    };
  };

  useEffect(() => {
    if (isOSS) {
      getOSSData(); // 获取oss签名信息
    }
  }, []);

  // 外部value值
  const outFileList = useMemo(() => {
    let newFileList;
    if (!value) return undefined;
    if (isArrayType) {
      const { urlKey, nameKey, idKey } = modelKeys;
      newFileList = value.map(el => {
        const arr = el[urlKey]?.split('/') || [];
        return {
          ...el,
          uid: el[idKey] || Math.random(),
          url: el[urlKey],
          name: el[nameKey] || arr[arr.length - 1],
          status: 'done',
        };
      });
    } else {
      newFileList = value
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
    }
    return newFileList;
  }, [value]);

  const currFileList = uploadLock ? fileList : outFileList || fileList; // 上传中拿本地数据展示动态

  // 往外部传值
  const triggerChange = fileList => {
    const value = isArrayType
      ? fileList
      : fileList.map(el => el.url).join(separator);
    onChange?.(value);
  };

  // 默认按钮配置
  const defaultShowUploadList = {
    showPreviewIcon: true,
    showDownloadIcon: false,
    showRemoveIcon: !disabled,
    ...showUploadList,
  };

  // 删除功能
  const onMyRemove = file => {
    function remove() {
      const list = currFileList?.filter(el => el.uid !== file.uid);
      setFileList(list);
      if (!uploadLock) {
        triggerChange(list);
      }
    }

    if (onRemove && !uploadLock) {
      onRemove(file)?.then(success => {
        if (success) {
          remove();
        }
      });
    } else {
      remove();
    }
  };

  // 预览功能
  const onMyPreview = file => {
    const { url, name, uid } = file;
    setPreviewFile({
      type: name.split('.')[1],
      url,
      uid,
    });
    if (onPreview) {
      onPreview(file, () => {
        setPreviewFile({});
      });
    } else {
      setVisible(true);
    }
  };

  // 上传之后传给外部
  useEffect(() => {
    const isloading = fileList.some(
      el => el.status === 'uploading' || el.status === 'error',
    );
    if (uploadLock || isloading) {
      const newFileList = [];
      fileList.forEach(el => {
        const { response, status, ...rest } = el;
        if (status !== 'done') {
          return;
        }
        if (isDocDemo) {
          newFileList.push({
            status,
            ...rest,
            ...response,
          });
        } else {
          const { success, data } = response || {};
          if (response && success) {
            newFileList.push({
              status,
              url: isArrayType ? data?.[modelKeys.urlKey] : data || '',
              ...(isArrayType ? data : null),
              ...rest,
            });
          } else if (el.url) {
            newFileList.push(el);
          }
        }
      });
      triggerChange(newFileList);

      setUploadLock(isloading);
    }
  }, [fileList, uploadLock]);

  // 上传组件的参数
  const props = {
    listType,
    fileList: currFileList,
    accept,
    action,
    headers: {
      authorization: 'authorization-text',
      ...headers,
    },
    showUploadList: defaultShowUploadList,
    beforeUpload: isOSS
      ? async file => {
          // 过期重新获取OSSData
          const expire = OSSData.expire * 1000;
          if (expire < Date.now()) {
            await getOSSData();
          }
          const suffix = file.name.slice(file.name.lastIndexOf('.'));
          const filename = Date.now() + suffix;

          file.url = dir + filename;
          return file;
        }
      : (file, fileList) => {
          let result = true;
          console.log(fileList, file);
          const isLtSize = file.size / 1024 / 1024 < maxSize;
          result = result && isLtSize;

          if (!isLtSize) {
            message.error(`文件要小于${maxSize}MB!`);
          }

          if (beforeUpload) {
            result = result && beforeUpload(file, fileList);
          }
          return result;
        },
    itemRender(originNode, file) {
      if (isPicture) {
        return originNode;
      }
      return (
        <FileItem
          file={file}
          showUploadList={defaultShowUploadList}
          onPreview={onMyPreview}
          onRemove={onMyRemove}
          onDownload={onDownload}
          previewFile={previewFile}
          nameRender={nameRender}
        />
      );
    },
    onChange({ file, fileList }) {
      const { status, url, response, name } = file;
      setUploadLock(true); // 锁定上传状态
      const newFileList = fileList
        .slice(0, maxLength || fileList.length)
        .filter(file => !!file.status) // 过滤beforeUpload 为false的文件
        .map(el => {
          const { response } = el;
          const newData = { ...el };
          if (
            status === 'done' &&
            response &&
            !response.success &&
            !isDocDemo
          ) {
            newData.status = 'error';
          }
          return newData;
        });
      setFileList([...newFileList]);

      if (status === 'error') {
        message.error(`${name} 文件上传失败`);
      }

      if (status === 'done' && !isDocDemo) {
        const { success, msg } = response || {};
        if (!success && !url) {
          message.error(msg || `${name} 文件上传失败`);
        }
      }
    },
    onPreview: onMyPreview,
    onRemove: onMyRemove,
    data: isOSS ? file => ({ ...getExtraData(file), ...data }) : data,
    disabled,
    ...rest,
  };

  // 提示语
  const Tip = (
    <p className="ant-upload-hint">
      {`单文件大小不超过${maxSize}M`}
      {acceptSuffix && ` 只支持${acceptSuffix}文件`}
      {maxLength > 1 && ` 最多上传${maxLength}个文件`}
      {/* {width && `图片尺寸为${width}*${height} `} */}
      {totalMaxSize && ` 累计不超过${totalMaxSize}M`}
    </p>
  );

  const showComProps = {
    uploadProps: props,
    templateUrl,
    tip: Tip,
    disabled: (maxLength && currFileList?.length >= maxLength) || disabled,
  };

  return (
    <div>
      {isDragger ? (
        <DraggerShow {...showComProps} />
      ) : (
        <UploadShow {...showComProps} isPicture={isPicture} />
      )}

      <PreviewModal
        previewFile={previewFile}
        visible={visible}
        onOk={() => {
          setVisible(false);
          setPreviewFile({});
        }}
      />
    </div>
  );
};

export default FileUpload;
