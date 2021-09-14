import React from 'react';
import InputNum from '../GFormItem/InputNum';
import { accMul, accDiv } from './util';
import './index.less';

const MoneyInput = (multiple = 1) => ({ value, onChange, ...rest }) => {
  return (
    <InputNum
      value={!Number.isNaN(Number(value)) ? accDiv(value, multiple) : value}
      onChange={v => {
        onChange(!Number.isNaN(Number(v)) ? accMul(v, multiple) : v);
      }}
      precision={2}
      {...rest}
    />
  );
};

export default MoneyInput;
