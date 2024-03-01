import React, { useRef, useEffect } from 'react';
import { Button, Drawer, Space } from 'antd';
import PropTypes from 'prop-types';
import GForm from '../GForm';

const defaultFormProps = {
  column: 1,
  labelBasicSpan: 5,
  defaultFooterBar: false,
};

const DrawerForm = ({
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
  cancelText = '取消',
  okText = '保存',
  okButtonProps,
  cancelButtonProps,
  ...restProps
}) => {
  const childFormRef = useRef();
  const drawerProps = {
    visible,
    open: visible,
    maskClosable: false,
    onClose: onCancel,
    placement: 'right',
    onOk: () => {
      childFormRef.current.onValidate(onOk);
    },
    footer: (
      <>
        <Space>
          <Button
            type={'primary'}
            onClick={() => {
              childFormRef.current.onValidate(onOk);
            }}
            {...okButtonProps}
          >
            {okText}
          </Button>
          <Button
            onClick={() => {
              onCancel?.();
            }}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        </Space>
      </>
    ),
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
    <Drawer {...drawerProps}>
      {beforeRender?.(initialValues)}
      <GForm {...fProps} actionRef={childFormRef} />
      {afterRender?.(initialValues)}
    </Drawer>
  );
};

DrawerForm.propTypes = {
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

DrawerForm.defaultProps = {
  formProps: {},
  okButtonProps: {},
  cancelButtonProps: {},
};

export default DrawerForm;
