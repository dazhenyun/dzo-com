import React from 'react';
import { Statistic } from 'antd';
import classnames from 'classnames';
import { accDiv } from './util';
import './index.less';

// 功能：将浮点数四舍五入，取小数点后几位
function toDecimal(x, precision) {
  let f = parseFloat(x);
  if (Number.isNaN(Number(f))) {
    return x;
  }
  const d = precision ? 10 ** precision : 1;
  f = Math.round(x * d) / d;
  return f;
}

const MoneyShow = dividend => ({
  prefix = '￥',
  value = 0,
  bold,
  precision = 2,
  className,
  size = 'md',
  color,
  align, // 'horizontal '
  ...rest
}) => {
  return (
    <Statistic
      className={classnames(className, 'g-statistic', {
        ['g-statistic-bold']: bold,
        [`g-statistic-${size}`]: !!size,
        [`g-statistic-${color}`]: !!color,
        [`g-statistic-${align}`]: !!align,
      })}
      prefix={prefix}
      value={
        Number.isNaN(Number(value))
          ? value
          : toDecimal(accDiv(value, dividend || 1), precision)
      }
      precision={precision}
      {...rest}
    />
  );
};

export default MoneyShow;
