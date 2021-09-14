import React from 'react';
import { Divider, Button } from 'antd';
import { DynamicFieldSet, FileUpload } from '@dzo/com';

export const complexForm = [
  {
    type: 'input',
    name: 'id',
    label: 'id',
    column: 0, // 占比列数为0，即可隐藏
  },
  {
    type: 'custom',
    renderChild: (
      <>
        <Divider type="vertical" />
        <a>基础字段</a>
      </>
    ), // 可以是简单的数据，也可以是ReactNode
    column: 3, // 占3列
  },

  {
    type: 'password',
    name: 'password',
    label: '密码框',
    validOptions: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
  },
  {
    type: 'password',
    name: 'confirm',
    label: '密码确认',
    column: 2,
    validOptions: {
      dependencies: ['password'],
      rules: [
        {
          required: true,
          message: '不能为空',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('密码不一致'));
          },
        }),
      ],
    },
  },
  {
    type: 'input',
    name: 'name',
    label: '文本',
    props: {
      placeholder: '请输入文本',
    },
    validOptions: {
      // 校验相关配置
      rules: [
        {
          required: true,
          message: '不能为空',
        },
        {
          max: 10,
          message: '字数不能超过10',
        },
        // {
        //   pattern: chineseAndEnglish,
        //   message: '只能输入汉字、字母',
        // },
      ],
    },
  },
  {
    type: 'inputnumber',
    name: 'age',
    label: '数字',
    props: {
      precision: 0,
      min: 1,
      addonAfter: '天',
    },
    validOptions: {
      rules: [
        {
          validator: (rule, value) => {
            if (value > 150) return Promise.reject(new Error('年龄超出150'));
            return Promise.resolve();
          },
        },
      ],
    },
  },
  {
    type: 'select',
    name: 'select',
    label: '下拉框',
    optionsData: [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
    ],
    models: ['value', 'label'], // 这是默认索引配置，如果selectOptions的索引值不是这样，可以相应改
  },

  {
    type: 'selectGroup',
    name: 'selectGroup',
    label: '下拉框分级',
    optionsData: [
      {
        label: '等级1',
        children: [
          { label: '男', value: '男' },
          { label: '女', value: '女' },
        ],
      },
      {
        label: '等级2',
        children: [
          { label: '男1', value: '男1' },
          { label: '女1', value: '女1' },
        ],
      },
    ],
  },
  {
    type: 'yearpicker',
    name: 'yearpicker',
    label: '年份',
  },
  {
    type: 'monthpicker',
    name: 'monthpicker',
    label: '月份',
  },
  {
    type: 'radiogroup', // radiogroupButton支持button样式
    name: 'sex',
    label: '单选框',
    optionsData: [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
    ],
  },
  {
    type: 'checkboxgroup',
    name: 'checkboxgroup',
    label: '复选框',
    optionsData: [
      { label: '萝卜', value: '1' },
      { label: '青菜', value: '2' },
      { label: '黄瓜', value: '3' },
      { label: '西瓜', value: '4' },
      { label: '香肠', value: '5' },
    ],
    column: 2, // 占2列
  },
  {
    type: 'switch',
    name: 'switch',
    label: '营业',
    validOptions: {
      valuePropName: 'checked',
    },
  },
  {
    type: 'datepicker',
    name: 'datepicker',
    label: '日期',
    validOptions: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
  },
  {
    type: 'textarea',
    name: 'textarea',
    label: '不营业原因',
  },
  {
    type: 'custom',
    renderChild: (
      <>
        <Divider type="vertical" />
        <a>扩展字段</a>
      </>
    ), // 可以是简单的数据，也可以是ReactNode
    column: 3, // 占3列
  },
  {
    type: 'rangepicker',
    name: 'rangepicker',
    label: '日期区间',
  },
  {
    type: 'numrange',
    name: 'numrange',
    label: '数字区间',
  },
  {
    type: 'timepickerrange',
    name: 'timepickerrange',
    label: '时间区间',
    validOptions: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
  },
  {
    type: 'timepicker',
    name: 'timepicker',
    label: '时间',
    validOptions: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
  },
  {
    type: 'custom',
    renderChild: (
      <>
        <Divider type="vertical" />
        <Button type="link">文件上传</Button>
      </>
    ), // 可以是简单的数据，也可以是ReactNode
    column: 3, // 占3列
  },
  {
    type: 'custom',
    renderChild: <FileUpload />,
    props: {
      maxLength: 5,
      showUploadList: { showDownloadIcon: false },
      templateUrl: 'http://xxx',
    },
  },
  {
    type: 'custom',
    renderChild: <FileUpload />,
    props: {
      maxLength: 5,
      showUploadList: { showDownloadIcon: false },
      templateUrl: 'http://xxx',
      listType: 'picture-card',
    },
  },
  {
    type: 'custom',
    renderChild: <FileUpload />,
    props: {
      maxLength: 5,
      showUploadList: { showDownloadIcon: false },
      templateUrl: 'http://xxx',
      isDragger: true,
    },
  },
  {
    type: 'custom',
    renderChild: (
      <>
        <Divider type="vertical" />
        <a>动态列表</a>
      </>
    ), // 可以是简单的数据，也可以是ReactNode
    column: 3, // 占3列
  },
  {
    type: 'custom', // 自定义
    label: '列表',
    name: 'lists',
    column: 2,
    validOptions: {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    },
    renderChild: (
      <DynamicFieldSet
        name="lists"
        listFormSet={[
          {
            type: 'select',
            name: 'select1',
            optionsData: [
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ],
            validOptions: {
              // 校验相关配置
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            },
          },
          {
            type: 'input',
            name: 'name',
            props: {
              placeholder: '请输入文本',
            },
            validOptions: {
              // 校验相关配置
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            },
          },
          {
            type: 'yearpicker',
            name: 'yearpicker',
          },
        ]}
      />
    ),
  },
];
