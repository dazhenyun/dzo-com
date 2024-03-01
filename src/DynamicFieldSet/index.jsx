import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { createStyles } from 'antd-style';
import GFormItem from '../GFormItem';
import './index.less';

const useStyles = createStyles(({ token, css }) => ({
  'dynamic-header': css`
    background: ${token.headerBg};
    border-bottom: 1px solid ${token.colorBorder};
  `,
  'dynamic-header-cell': css`
    color: ${token.colorTextBase};
  `,
}));

const DynamicFieldSet = ({
  name,
  listFormSet = [],
  hasHead = false,
  hasAdd = true,
  hasDel = true,
  okButtonRender,
}) => {
  const { styles, cx } = useStyles();

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {hasHead && (
              <Row className={cx('dynamic-header', styles['dynamic-header'])}>
                <Col flex={1}>
                  <Row gutter={8}>
                    {listFormSet.map(itemSet => {
                      const {
                        dataIndex,
                        name,
                        title,
                        label,
                        column: itemColumn,
                      } = itemSet;
                      const column = listFormSet.length;
                      const labelSpan =
                        itemColumn === undefined
                          ? 1
                          : Math.min(itemColumn, column); // 列占比数
                      const colSpan = Math.ceil(24 / column) * labelSpan;
                      return (
                        <Col
                          span={colSpan}
                          key={dataIndex || name}
                          className="dynamic-header-cell"
                        >
                          {title || label}
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
                {hasDel && (
                  <Col
                    flex="none"
                    style={{ width: '80px' }}
                    className="dynamic-header-cell"
                  >
                    操作
                  </Col>
                )}
              </Row>
            )}

            {fields.map((field, i) => (
              <Row
                key={field.key}
                gutter={4}
                className={hasHead ? 'dynamic-tr' : ''}
              >
                <Col flex={1}>
                  <Row gutter={8}>
                    {listFormSet.map(itemSet => {
                      const { dataIndex, name, column: itemColumn } = itemSet;
                      const fieldKey = [field.fieldKey, dataIndex || name];
                      itemSet = {
                        ...itemSet,
                        dataIndex: [field.name, dataIndex || name],
                        fieldKey,
                        fieldIndex: i,
                        itemProps: {
                          colon: false,
                          wrapperCol: { span: 24 },
                        },
                      };
                      if (hasHead) {
                        delete itemSet.title;
                        delete itemSet.label;
                      }
                      const column = listFormSet.length;
                      const span = Math.min(
                        Number.isNaN(Number(itemColumn)) ? 1 : itemColumn,
                        column,
                      ); // 列占比数
                      const colSpan = Math.ceil(24 / column) * span;
                      return (
                        <Col span={colSpan} key={`${fieldKey.join('_')}`}>
                          <GFormItem itemSet={itemSet} column={column} />
                        </Col>
                      );
                    })}
                  </Row>
                </Col>

                {/* 删除按钮 */}
                {hasDel && (
                  <Col flex="none" className="dynamic-header-cell">
                    <Button
                      type="link"
                      onClick={() => {
                        remove(field.name);
                      }}
                      icon={<MinusCircleOutlined />}
                    />
                  </Col>
                )}
              </Row>
            ))}

            {okButtonRender?.({ fields, hasHead, add, remove })}

            {/* 新增按钮 */}
            {hasAdd && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%', marginLeft: hasHead ? '20%' : '' }}
                >
                  <PlusOutlined /> 新增
                </Button>
              </Form.Item>
            )}
          </div>
        );
      }}
    </Form.List>
  );
};
DynamicFieldSet.propTypes = {
  /**
   * 表单对应的name
   */
  name: PropTypes.string.isRequired,
  /**
   * 一行的输入框配置
   */
  listFormSet: PropTypes.array,
  /**
   * 是否有头部
   */
  hasHead: PropTypes.bool,
  /**
   * 新增按钮
   */
  hasAdd: PropTypes.bool,
  /**
   * 删除按钮
   */
  hasDel: PropTypes.bool,
};

export default DynamicFieldSet;
