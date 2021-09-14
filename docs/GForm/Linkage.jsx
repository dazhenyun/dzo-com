import React, { useState, useRef, useEffect } from 'react';
import { GForm } from '@dzo/com';

const Linkage = () => {
  const [linkage, setLinkage] = useState(false);
  const formRef = useRef();
  const formSet = [
    {
      type: 'switch',
      name: 'switch',
      label: '营业(点击联动)',
      validOptions: {
        valuePropName: 'checked',
      },
    },
    {
      type: 'datepicker',
      name: 'datepicker',
      label: '日期（必填非必填切换）',
      validOptions: {
        rules: [
          {
            required: linkage,
            message: '不能为空',
          },
        ],
      },
    },
    {
      type: 'textarea',
      name: 'textarea2',
      label: '不营业原因（disabled效果）',
      validOptions: {
        rules: [
          {
            required: !linkage,
            message: '不能为空',
          },
        ],
      },
      props: {
        disabled: linkage,
      },
    },
    {
      type: 'textarea',
      name: 'textarea',
      label: '不营业原因（隐藏显示切换）',
      validOptions: {
        rules: [
          {
            required: !linkage,
            message: '不能为空',
          },
        ],
      },
      column: linkage ? 0 : 1, // 联动隐藏
    },
  ];

  const props = {
    column: 1,
    layout: 'vertical',
    gutter: 20,
    formSet,
    initialValues: { switch: linkage },
    onValuesChange(changedValues, allValues) {
      if ('switch' in changedValues) {
        // 数据变化监听
        setLinkage(changedValues.switch);
      }
    },
    submitCall(values) {
      console.log(values);
    },
  };

  useEffect(() => {
    formRef.current.resetFields(); // 去除日期的错误提示信息
  }, [linkage]);

  return <GForm actionRef={formRef} {...props} style={{ width: 500 }} />;
};

export default Linkage;
