import React from 'react';
import { Statistic, theme } from 'antd';
import { createStyles } from 'antd-style';
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

const useStyles = createStyles(({ token, css }) => ({
  'g-statistic-green': css`
    .ant-statistic-content-prefix,
    .ant-statistic-content-value {
      color: ${token.colorSuccess};
    }
  `,
  'g-statistic-red': css`
    .ant-statistic-content-prefix,
    .ant-statistic-content-value {
      color: ${token.colorError};
    }
  `,
  'g-statistic-primary': css`
    .ant-statistic-content-prefix,
    .ant-statistic-content-value {
      color: ${token.colorPrimary};
    }
  `,
  'g-statistic-orange': css`
    .ant-statistic-content-prefix,
    .ant-statistic-content-value {
      color: ${token.colorWarning};
    }
  `,
}));

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
  const { styles, cx } = useStyles();
  return (
    <Statistic
      className={cx(className, 'g-statistic', {
        ['g-statistic-bold']: bold,
        [`g-statistic-${size}`]: !!size,
        [styles[`g-statistic-${color}`]]: !!color,
        [`g-statistic-${align} `]: !!align,
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
