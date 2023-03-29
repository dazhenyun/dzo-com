import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Ellipsis } from '@dzo/com';
import { Descriptions, Skeleton, Typography } from 'antd';
import './index.less';

export default ({
  title,
  column = 1,
  dataSource,
  columns = [],
  titleRender,
  hasBtn = false,
  loading = false,
  ...rest
}) => {
  const [open, setOpen] = useState();

  const restPorps = {
    column,
    ...rest,
  };

  return (
    <div className={`dz_descriptions ${open ? 'none' : ''}`}>
      <Skeleton loading={loading}>
        <Descriptions
          title={
            <div className="dz_descriptions_header">
              <div className="dz_descriptions_header__title">
                {title ? title : titleRender?.()}
              </div>
              {hasBtn ? (
                <span
                  onClick={() => setOpen(orgin => !orgin)}
                  className="dz_descriptions_header__close"
                >
                  {open ? <DownOutlined /> : <UpOutlined />}
                </span>
              ) : null}
            </div>
          }
          {...restPorps}
        >
          {columns.map(
            (
              {
                title,
                render,
                dataIndex,
                name,
                props,
                key,
                span,
                column: itemColumn,
                ellipsis = false,
                ...el
              },
              index,
            ) => {
              const txtKey = dataIndex || name || key;
              const itemProps = {
                key: `${txtKey}_${index}`,
                label: title,
                ...props,
                ...el,
              };
              return (
                <Descriptions.Item {...itemProps}>
                  {ellipsis ? (
                    dataSource?.[txtKey] ? (
                      <Typography.Paragraph rows={1} {...ellipsis}>
                        {dataSource?.[txtKey] || '-'}
                      </Typography.Paragraph>
                    ) : (
                      '-'
                    )
                  ) : render ? (
                    render?.(dataSource?.[txtKey], dataSource, itemProps)
                  ) : (
                    dataSource?.[txtKey] || '-'
                  )}
                </Descriptions.Item>
              );
            },
          )}
        </Descriptions>
      </Skeleton>
    </div>
  );
};
