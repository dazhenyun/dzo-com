---
title: Upload - 文件上传组件
nav:
  title: 组件
  path: /comp
group:
  path: /comp
---

# 文件上传组件

## 单文件或多文件组件上传

```jsx
import React, { useState } from 'react';
import { message, Switch } from 'antd';
import { FileUpload } from '@dzo/com';

export default () => {
  const [value, setValue] = useState(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png;https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png;http://www.baidu.com/xxx.csv;http:xxx1.png;http:xxx1.png',
  );
  const [disabled, setDisabled] = useState(false);

  const onChange = v => {
    setValue(v);
  };

  return (
    <>
      <div>
        disabled:
        <Switch value={disabled} onChange={checked => setDisabled(checked)} />
      </div>
      <br />
      <FileUpload
        value={value}
        maxLength={5}
        showUploadList={{ showDownloadIcon: true }}
        onChange={onChange}
        templateUrl={'111'}
        disabled={disabled}
      />
    </>
  );
};
```

## 图片上传组件

```jsx
import React, { useState } from 'react';
import { message, Switch } from 'antd';
import { FileUpload } from '@dzo/com';

export default () => {
  const [value, setValue] = useState(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  );
  const [disabled, setDisabled] = useState(false);

  const onChange = v => {
    setValue(v);
  };

  return (
    <>
      <div>
        disabled:
        <Switch value={disabled} onChange={checked => setDisabled(checked)} />
      </div>
      <br />
      <FileUpload
        acceptSuffix="jpeg,jpg,png"
        listType="picture-card"
        value={value}
        maxLength={5}
        showUploadList={{ showDownloadIcon: false }}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};
```

## 拖拽面板文件上传

```jsx
import React, { useState } from 'react';
import { message, Switch } from 'antd';
import { FileUpload } from '@dzo/com';

export default () => {
  const [value, setValue] = useState(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png,https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  );
  const [disabled, setDisabled] = useState(false);

  const onChange = v => {
    setValue(v);
  };

  return (
    <>
      <div>
        disabled:
        <Switch value={disabled} onChange={checked => setDisabled(checked)} />
      </div>
      <br />
      <FileUpload
        acceptSuffix="csv,xlsx"
        value={value}
        maxLength={5}
        showUploadList={{ showDownloadIcon: false }}
        onChange={onChange}
        templateUrl={'http://xxx'}
        disabled={disabled}
        multiple
        isDragger
      />
    </>
  );
};
```

## 传值为数组类型

```jsx
import React, { useState } from 'react';
import { message, Switch } from 'antd';
import { FileUpload } from '@dzo/com';

export default () => {
  const [value, setValue] = useState([
    {
      fileId: 1,
      fileName: 'text1.csv',
      fileUrl: '/*',
      recordCount: 100,
    },
    {
      fileId: 2,
      fileName: 'text2.csv',
      fileUrl: '/*',
      recordCount: 1000,
    },
  ]);
  const [disabled, setDisabled] = useState(false);

  const onChange = v => {
    setValue(v);
  };

  return (
    <>
      <div>
        disabled:
        <Switch value={disabled} onChange={checked => setDisabled(checked)} />
      </div>
      <br />
      <FileUpload
        isArrayType
        acceptSuffix="csv,xlsx"
        value={value}
        maxLength={5}
        showUploadList={{ showDownloadIcon: true }}
        onChange={onChange}
        templateUrl={'http://xxx'}
        disabled={disabled}
        modelKeys={{
          urlKey: 'fileUrl',
          idKey: 'fileId',
          nameKey: 'fileName',
        }}
        nameRender={file => (
          <span>
            {file.fileName}&nbsp;&nbsp;记录数：{file.recordCount}
          </span>
        )}
        onDownload={file => {
          console.log(file);
          message.success('下载成功');
        }}
        multiple
      />
    </>
  );
};
```

## 非实时上传的

```jsx
import React, { useState } from 'react';
import { message, Switch } from 'antd';
import { FileUpload } from '@dzo/com';

export default () => {
  const [value, setValue] = useState('XXXX.csv');
  const [disabled, setDisabled] = useState(false);

  const onChange = v => {
    setValue(v);
  };

  return (
    <>
      <div>
        disabled:
        <Switch value={disabled} onChange={checked => setDisabled(checked)} />
      </div>
      <br />
      <FileUpload
        acceptSuffix=".csv,.xlsx"
        value={value}
        onChange={onChange}
        templateUrl={'http://xxx'}
        disabled={disabled}
        isNRT
      />
    </>
  );
};
```

## API

FileUpload

| 参数           | 说明                                                               | 类型        | 默认值   | 版本 |
| -------------- | ------------------------------------------------------------------ | ----------- | -------- | ---- |
| isArrayType    | 数值传输类型是否为数组                                             | bool        | false    | -    |
| modelKeys      | {idKey,nameKey,urlKey} 针对 isArrayType 为 true 有效               | obj         | -        | -    |
| acceptSuffix   | 上传的类型格式,多类型以逗号相隔传入                                | string      | -        | -    |
| maxLength      | 最大上传数量                                                       | num         | 1        | -    |
| templateUrl    | 下载模板链接,接收字符串和函数,不传不展示下载模板                   | string/func | function | -    | - |
| maxSize        | 单文件最大上传大小，以 M 为单位                                    | num         | 2        | -    |
| toalMaxSize    | 多文件上传时的总 M 数                                              | num         | 2        | -    |
| disabled       | 不可用,在详情等情况展示                                            | bool        | false    | -    |
| separator      | 分隔符，用于多文件 url 分隔                                        | string      | ;        | -    |
| action         | 上传请求路径                                                       | string      | -        | -    |
| nameRender     | 文件选项展示 (file)=>ReactNode                                     | func        | -        | -    |
| showUploadList | showPreviewIcon,showDownloadIcon,默认开启预览                      | obj         | -        | -    |
| onRemove       | 删除回调,删除文件需要调用接口, Promise 对象返回 success,(file)=>{} | func        | -        | -    |
| onPreview      | 预览回调,(file,onCancel)=>{}                                       | func        | -        | -    |
| onDownload     | 下载回调,(file)=>{}                                                | func        | -        | -    |
| beforeUpload   | (file,fileList)=>{} ,返回 false 阻止上传                           | func        | -        | -    |
| isOSS          | 是否 OSS 方式                                                      | bool        | false    | -    |
| queryOssSign   | 获取签名的方法，async 函数 或签名对象                              | func/obj    | -        | -    |
| isNRT          | 是否非实时上传                                                     | bool        | false    | -    |
| 其它           | 支持 antd Upload 组件的所有属性                                    | -           | -        | -    |

| 参数 | 说明                                  |
| ---- | ------------------------------------- |
| jpeg |                                       |
| jpg  |                                       |
| png  |                                       |
| xlsx |                                       |
| csv  |                                       |
| docx |                                       |
| pdf  |                                       |
| 其它 | 请参考 antd Upload 组件的 accept 方式 |

## 非实时上传组件

不支持预览、下载功能,输出值为 file 对象数组，有别于实时上传组件为字符串(多文件地址以分隔符分隔)
