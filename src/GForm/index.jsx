import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import { toCDB, formateDate, normalizeDate } from './util';
import GFormItem from '../GFormItem';
import './index.less';

const dateComponetType = {
  monthpicker: 'YYYY-MM',
  rangepicker: 'YYYY-MM-DD',
  datepicker: 'YYYY-MM-DD',
  yearpicker: 'YYYY',
  timepickerrange: 'HH:mm',
  timepicker: 'HH:mm',
};

const defautValidateMessages = {
  required: '不能为空',
  whitespace: '不能全为空格',
  string: {
    len: '长度为${len}个字符',
    min: '至少输入${min}个字符',
    max: '不超过 ${max} 个字符',
    range: '长度在 ${min} - ${max} 个字符之间',
  },
  number: {
    len: '必须为 ${len}',
    min: '不能小于 ${min}',
    max: '不能大于 ${max}',
    range: '范围在 ${min} - ${max}之间',
  },
  array: {
    len: '数量为 ${len} ',
    min: '数量不能小于 ${min}',
    max: '数量不能大于 ${max}',
    range: '范围在 ${min} - ${max}之间',
  },
  pattern: {
    mismatch: '格式错误',
  },
};

const GForm = props => {
  const [action, setAction] = useState({});
  const {
    actionRef,
    formSet,
    column,
    loading,
    initialValues,
    children,
    gutter,
    submitCall,
    cancelCall,
    toolBarRender,
    defaultFooterBar,
    labelBasicSpan,
    totalSpan,
    onFinishFailed,
    layout,
    ...restProps
  } = props;
  const [form] = Form.useForm();

  // 收集日期字段及格式化的映射关系
  const collectDateField = () => {
    const dateFields = {};
    formSet &&
      formSet.forEach(el => {
        const { dataIndex, name, type, props = {} } = el;
        if (Object.keys(dateComponetType).includes(type)) {
          dateFields[dataIndex || name] = {
            type,
            format: (props && props.format) || dateComponetType[type],
          };
        }
      });
    return dateFields;
  };

  // 转化日期的初始值
  const formateDateTypeInitialValues = initialValues => {
    const newInitValues = { ...initialValues };
    const dateFields = collectDateField();
    Object.keys(dateFields).forEach(field => {
      const { format } = dateFields[field];
      newInitValues[field] = normalizeDate(newInitValues[field], format);
    });
    return newInitValues;
  };

  // 组装form的Props
  const newFormProps = {
    onFinish: fieldsValue => {
      submitCall && submitCall(formatValues(fieldsValue));
    },
    initialValues: formateDateTypeInitialValues(initialValues),
    validateMessages: defautValidateMessages,
    layout,
  };

  // 组装formItem的Props
  const formItemProps = {
    column,
    labelBasicSpan,
    totalSpan,
    layout,
  };

  // 转换表单值
  const formatValues = fieldsValue => {
    Object.keys(fieldsValue).forEach(key => {
      let value = fieldsValue[key];
      if (typeof value === 'string') {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); // 去空格
        fieldsValue[key] = toCDB(value); // 统一转半角
      }
    });

    // 转换日期moment
    const dateFields = collectDateField();
    Object.keys(dateFields).forEach(field => {
      const { type, format } = dateFields[field];
      if (typeof type === 'string') {
        fieldsValue[field] = formateDate(fieldsValue[field], format);
      }
    });
    return fieldsValue;
  };

  // 重置
  const reset = () => {
    form.resetFields();
    cancelCall && cancelCall(formatValues(form.getFieldsValue()));
  };

  useEffect(() => {
    const action = {
      ...form,
      reset,
      formatValues,
      collectDateField,
      onValidate: callback => {
        form
          .validateFields()
          .then(values => {
            collectDateField();
            const params = formatValues(values);
            callback && callback(params);
          })
          .catch(errorInfo => {
            onFinishFailed && onFinishFailed(errorInfo);
          });
      },
    };

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = action;
    } else if (actionRef && typeof actionRef === 'function') {
      actionRef(action);
    }

    setAction(action);
  }, []);

  return (
    <div className="gform">
      <Form form={form} {...newFormProps} {...restProps}>
        <div style={{ flex: 1 }}>
          <Row gutter={gutter}>
            {formSet &&
              formSet.map(itemSet => {
                const { column: itemColumn, hideInForm } = itemSet;
                if (hideInForm) {
                  return null;
                }
                const span = Math.min(
                  Number.isNaN(Number(itemColumn)) ? 1 : itemColumn,
                  column,
                ); // 列占比数
                const colSpan = Math.ceil(totalSpan / column) * span;

                return (
                  <Col
                    span={colSpan}
                    key={itemSet.dataIndex || itemSet.name || Math.random()}
                  >
                    <GFormItem itemSet={itemSet} {...formItemProps} />
                  </Col>
                );
              })}
          </Row>
          {children}
        </div>
        {(defaultFooterBar || toolBarRender) && (
          <div className="gform-footer-button">
            {toolBarRender && toolBarRender(action)}
            {defaultFooterBar && (
              <>
                {/* <Button size="large" className="mr10" onClick={reset}>重置</Button> */}
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存
                </Button>
              </>
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

GForm.propTypes = {
  /**
   * 表单配置项
   */
  formSet: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string, //类型
      title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // 标签
      label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // 标签
      dataIndex: PropTypes.string, // 入参名
      name: PropTypes.string, // 入参名
      hideInForm: PropTypes.bool, // 是否失效隐藏
      validOptions: PropTypes.object, // 校验相关
      optionsData: PropTypes.array, // 下拉框数据
      models: PropTypes.array, // 下拉框数据对应的字段名['label','value']
      props: PropTypes.object, // 组件原生的属性
      itemProps: PropTypes.object, // FormItem的原生属性
    }),
  ),

  /**
   * 重置回调
   */
  cancelCall: PropTypes.func,
  /**
   * 提交回调
   */
  submitCall: PropTypes.func,
  /**
   * 正在保存标志
   */
  loading: PropTypes.bool,
  /**
   * 表单初始值
   */
  initialValues: PropTypes.object,

  /**
   * 是否使用默认的按钮 重置、保存
   */
  defaultFooterBar: PropTypes.bool,
  /**
   * 表单底部按钮工具栏的添加
   */
  toolBarRender: PropTypes.func,
  /**
   * 一行显示几列
   */
  column: PropTypes.number,
  /**
   * 列与列之间的间隔
   */
  gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  /**
   * label的占比
   */
  labelBasicSpan: PropTypes.number,
  /**
   * 一行的总占比
   */
  totalSpan: PropTypes.number,
};

GForm.defaultProps = {
  column: 3,
  loading: false,
  gutter: 3,
  defaultFooterBar: true,
  labelBasicSpan: 8,
  totalSpan: 24,
};

export default GForm;
