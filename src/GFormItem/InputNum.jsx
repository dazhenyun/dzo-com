import React from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';
import './index.less';

const InputNum = ({
  className,
  style,
  suffix,
  prefix,
  addonBefore,
  addonAfter,
  ...rest
}) => {
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
      {addonBefore && <div className="g-input-addon"> {addonBefore} </div>}
      <InputNumber
        className={classnames(className, {
          'g-input-number-before': !!addonBefore || !!prefix,
          'g-input-number-after': !!addonAfter || !!suffix,
        })}
        precision={2}
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
