import React, { useRef, useEffect } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import GForm from '../GForm';
import { before } from 'lodash';

const defaultFormProps = {
  column: 1,
  labelBasicSpan: 5,
  defaultFooterBar: false,
};

const ModalForm = ({
  initialValues,
  formSet,
  loading,
  onValuesChange,
  visible,
  onOk,
  onCancel,
  formProps,
  formRef,
  beforeRender,
  afterRender,
  ...restProps
}) => {
  const childFormRef = useRef();
  const modalProps = {
    visible,
    maskClosable: false,
    onCancel,
    cancelText: '取消',
    okText: '保存',
    onOk: () => {
      childFormRef.current.onValidate(onOk);
    },
    ...restProps,
  };

  const fProps = {
    initialValues,
    formSet,
    loading,
    onValuesChange,
    ...defaultFormProps,
    ...formProps,
  };

  useEffect(() => {
    if (visible && formRef && !formRef.current) {
      setTimeout(() => {
        formRef.current = { ...childFormRef.current };
      });
    }
    if (!visible) {
      childFormRef?.current?.resetFields();
    }
  }, [visible]);

  return (
    <Modal {...modalProps}>
      {beforeRender?.(initialValues)}
      <GForm {...fProps} actionRef={childFormRef} />
      {afterRender?.(initialValues)}
    </Modal>
  );
};

ModalForm.propTypes = {
  /**
   * 表单初始值
   */
  initialValues: PropTypes.object,
  /**
   * 表单的配置项，请参考GForm
   */
  formSet: PropTypes.array,
  /**
   * 请求的加载
   */
  loading: PropTypes.bool,
  /**
   * 表单的值变化监听钩子
   */
  onValuesChange: PropTypes.func,
  /**
   * form内部的一些配置，参考GForm的插件
   */
  formProps: PropTypes.object,

  /**
   * 弹窗显示
   */
  visible: PropTypes.bool,
  /**
   * 保存按钮的回调
   */
  onOk: PropTypes.func,
  /**
   * 关闭按钮的回调
   */
  onCancel: PropTypes.func,

  /**
   * 表单formRef操作
   */
  formRef: PropTypes.object,
};

ModalForm.defaultProps = {
  formProps: {},
};

export default ModalForm;
