import { useState, useMemo, useRef, useEffect } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { GFormItem, GForm } from '@dzo/com';
import './index.less';

export default ({
  formRef,
  params,
  columns = [],
  column = 3,
  loading = false,
  defaultCollapsed = true,
  totalSpan = 24,
  labelWidth = 80,
  searchText = '查询',
  resetText = '重置',
  defaultColsNumber = 3,
  onCollapse,
  hasCollapse = true,
  onSubmit,
  onReset,
  layout,
  ...rest
}) => {
  const actionRef = useRef();
  const [expand, setExpand] = useState(defaultCollapsed);

  const newColumns = useMemo(() => {
    return columns
      .filter((_, index) => (expand ? true : index <= defaultColsNumber - 1))
      .map(el => {
        const { dataIndex, name, label, title, column: itemColumn } = el;
        const nDataIndex = dataIndex || name || Math.random();
        const span = Math.min(
          Number.isNaN(Number(itemColumn)) ? 1 : itemColumn,
          column,
        ); // 列占比数
        const colSpan = Math.ceil(totalSpan / column) * span;

        return (
          <Col key={nDataIndex} span={colSpan}>
            <div className="dz_form_item">
              <div
                className="dz_form_item_label"
                style={{ flex: `0 0 ${labelWidth}px` }}
              >
                <label>{title || label}</label>
              </div>
              <div className="dz_form_item_content">
                <GFormItem
                  itemSet={{
                    ...el,
                    itemProps: { noStyle: true, ...el.itemProps },
                  }}
                  layout={layout}
                />
              </div>
            </div>
          </Col>
        );
      });
  }, [columns, expand]);

  useEffect(() => {
    if (formRef && !formRef.current) {
      setTimeout(() => {
        formRef.current = { ...actionRef.current };
      });
    }
  }, [params, newColumns]);

  const hanldeFinish = values => {
    onSubmit?.(values);
  };

  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const props = {
    initialValues: params,
    ...formItemLayout,
    ...rest,
  };

  const hanldeCollapse = () => {
    const flag = !expand;
    setExpand(flag);
    onCollapse?.(flag);
  };

  // console.log(totalSpan/)

  return (
    <GForm
      {...props}
      actionRef={actionRef}
      className="search-form"
      onFinish={hanldeFinish}
      defaultFooterBar={null}
    >
      <Row gutter={24}>
        {newColumns}
        <Col className="search-btn">
          <Space>
            <Button
              onClick={() => {
                actionRef.current?.resetFields();
                onReset?.();
              }}
            >
              {resetText}
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {searchText}
            </Button>
            {!hasCollapse ? (
              <Button
                type="link"
                icon={expand ? <UpOutlined /> : <DownOutlined />}
                onClick={hanldeCollapse}
              >
                {expand ? '收起' : '展开'}
              </Button>
            ) : null}
          </Space>
        </Col>
      </Row>
    </GForm>
  );
};
