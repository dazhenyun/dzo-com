import React, { useState, useEffect } from 'react';
import { Input, InputNumber } from 'antd';

const InputGroup = Input.Group;

/**
 * 数字区间组件
 */
const NumRange = ({
  value,
  onChange,
  precision,
  minProps,
  maxProps,
  ...rest
}) => {
  const [minNum, setMinNum] = useState(undefined);
  const [maxNum, setMaxNum] = useState(undefined);

  useEffect(() => {
    if (onChange) {
      onChange([minNum, maxNum]);
    }
  }, [minNum, maxNum]);

  useEffect(() => {
    const [outMin, outMax] = value || [];
    if (outMin !== minNum) {
      setMinNum(outMin);
    }
    if (outMax !== maxNum) {
      setMaxNum(outMax);
    }
  }, [value]);

  const onMinChange = v => {
    if (maxNum && v > maxNum) v = maxNum;
    setMinNum(v);
  };

  const onMaxChange = v => {
    if (minNum && v < minNum) v = minNum;
    setMaxNum(v);
  };

  return (
    <InputGroup compact {...rest}>
      <InputNumber
        min={0}
        max={10000000000}
        precision={precision}
        value={minNum}
        onChange={onMinChange}
        style={{ width: '42.5%' }}
        {...minProps}
      />
      <Input
        style={{
          width: '15%',
          borderLeft: 0,
          pointerEvents: 'none',
          backgroundColor: '#fff',
        }}
        placeholder="~"
        disabled
      />
      <InputNumber
        style={{ borderLeft: 0, width: '42.5%' }}
        max={10000000000}
        min={0}
        precision={precision}
        value={maxNum}
        onChange={onMaxChange}
        {...maxProps}
      />
    </InputGroup>
  );
};

NumRange.defaultProps = {
  precision: 0,
  onChange: () => {},
};

export default NumRange;
