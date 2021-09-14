import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Tree, Input, Empty, Button, Menu, Popover } from 'antd';
import { keyBy, uniq } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';

const TreeSearchInput = ({ placeholder, onSearch, value }) => {
  return (
    <Input
      className="search-tree-input"
      placeholder={placeholder}
      onChange={e => onSearch?.(e.target.value)}
      value={value}
      suffix={<SearchOutlined />}
      allowClear
    />
  );
};

export default TreeSearchInput;
