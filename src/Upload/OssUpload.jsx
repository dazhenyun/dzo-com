import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { ToTopOutlined } from '@ant-design/icons';
import styles from './index.less';
import PropTypes from 'prop-types';

// 校验图片的高宽比
// const validImageWH = (file, width, height) => {
//   const filereader = new FileReader();
//   const image = new Image();

//   return new Promise((resolve, reject) => {
//     if (!width || !height) {
//       resolve(true);
//     } else {
//       filereader.onload = e => {
//         image.onload = function () {
//           // 获取图片的宽高，并存放到file对象中
//           if (this.width !== width || this.height !== height) {
//             message.error(`图片尺寸大小应为：${width}*${height}`);
//             reject(false);
//           } else resolve(true);
//         };
//         image.onerror = reject;
//         image.src = e.target.result;
//       };
//       filereader.readAsDataURL(file);
//     }
//   });
// };

/**
 * 图片上传OSS方式
 * @param {*} param0
 */
const ImgUpload = ({
  value,
  separator,
  onChange,
  size,
  width,
  height,
  disabled,
  hideUploadButton,
  max,
  accept,
  queryOssSign,
}) => {
  const [fileList, setFileList] = useState([]);
  const [OSSData, setOSSData] = useState({});

  useEffect(() => {
    init(); // 获取oss签名信息
  }, []);

  // value值变化更改fileList
  useEffect(() => {
    if (value) {
      const arr = value.split(separator); // 接受多张图片数据
      const res = arr.map(url => {
        const urlArr = url.split('/');
        return {
          uid: Math.random(),
          url,
          name: urlArr[urlArr.length - 1],
          status: 'done',
        };
      });
      setFileList(res);
    } else {
      setFileList([]);
    }
  }, [value]);

  // 获取OSS签名
  const init = async () => {
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

  // 预览
  const handlePreview = file => {
    Modal.info({
      title: '图片预览',
      icon: false,
      content: <img alt="图片预览" style={{ width: '100%' }} src={file.url} />,
      okText: '关闭',
      width: 600,
    });
  };

  // 移除
  const handleRemove = file => {
    let arr = [];
    if (value) arr = value.split(separator);
    const res = arr.filter(item => item !== file.url);
    onChange(res.join(separator));
  };

  // 监听change
  const handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const outValue = fileList
        .map(el => {
          if (el.uid === file.uid) {
            return OSSData.host + el.url;
          }
          return el.url;
        })
        .join(separator);
      onChange && onChange(outValue);
    }
  };

  // 修改file的url信息
  const transformFile = file => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // const { name = '', uid, type } = file;
    // const filename = `${name.split(".")[0]}_${uid}.${type.split("/")[1]}`;

    file.url = OSSData.dir + filename;
    return file;
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

  // 上传文件之前的钩子
  const handleBeforeUpload = async file => {
    const isLegal = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isLegal) {
      message.error('图片文件必须是jpg、png！');
    }

    const isLt3M = file.size / 1024 / 1024 < size;
    if (!isLt3M) {
      message.error(`图片文件必须小于${size}MB!`);
    }

    const measure = true; //await validImageWH(file, width, height); // 宽高限制

    if (isLegal && isLt3M && measure) {
      const expire = OSSData.expire * 1000;

      if (expire < Date.now()) {
        // 过期重新获取OSSData
        await init();
      }
      return true;
    }
    return false;
  };

  const uploadButton = (
    <div className={styles.defaultUploadWrap}>
      <ToTopOutlined style={{ fontSize: '18px' }} />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <>
      <Upload
        name="file"
        action={OSSData.host}
        accept={accept}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        transformFile={transformFile}
        data={getExtraData}
        disabled={disabled}
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: !disabled,
          showDownloadIcon: false,
        }}
      >
        {fileList.length >= max || hideUploadButton ? null : uploadButton}
      </Upload>

      {/* 提示语 */}
      <p>
        {`只支持${accept}文件 大小不超过${size}mb `}
        {width && `图片尺寸为${width}*${height} `}
        {max > 1 && `最多上传${max}张图片`}
      </p>
    </>
  );
};

ImgUpload.propTypes = {
  disabled: PropTypes.bool, // 是否可以删除重新上传
  hideUploadButton: PropTypes.bool, // 是否隐藏上传按钮，默认否
  size: PropTypes.number, // 上传图片的大小，单位为M
  max: PropTypes.number, // 最多可上传几张图片，默认1张
  accept: PropTypes.string, // 可接收类型
  width: PropTypes.number, // 尺寸宽度
  heigth: PropTypes.number, // 尺寸高度
  separator: PropTypes.oneOf([';', ',']), // 多图片值分隔符
  queryOssSign: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};
ImgUpload.defaultProps = {
  disabled: false, // 是否可以删除重新上传
  hideUploadButton: false, // 是否隐藏上传按钮，默认否
  size: 3, // 上传图片的大小，单位为M
  max: 1, // 最多可上传几张图片，默认1张
  accept: '.jpg,.png', // 可接收类型
  separator: ';', // 多图片值分隔符
};

export default ImgUpload;
