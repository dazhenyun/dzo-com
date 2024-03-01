import React from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';
import './index.less';

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  'g-input-addon': css`
    background-color: ${token.addonBg};
    border: 1px solid ${token.colorBorder};
  `,
}));

const InputNum = ({
  className,
  style,
  suffix,
  prefix,
  addonBefore,
  addonAfter,
  ...rest
}) => {
  const { styles, cx } = useStyles();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {prefix && (
        <div
          className="g-input-fix"
          style={{ borderRight: 'none', paddingRight: 4 }}
        >
          {prefix}
        </div>
      )}
      {addonBefore && (
        <div className={cx('g-input-addon', styles['g-input-addon'])}>
          {' '}
          {addonBefore}{' '}
        </div>
      )}
      <InputNumber
        className={classnames(className, {
          'g-input-number-before': !!addonBefore || !!prefix,
          'g-input-number-after': !!addonAfter || !!suffix,
        })}
        precision={2}
        placeholder="请输入"
        style={{ flex: 1, ...style }}
        {...rest}
      />
      {addonAfter && <div className="g-input-addon"> {addonAfter} </div>}
      {suffix && (
        <div
          className="g-input-fix"
          style={{ borderLeft: 'none', paddingLeft: 4 }}
        >
          {suffix}
        </div>
      )}
    </div>
  );
};

export default InputNum;
