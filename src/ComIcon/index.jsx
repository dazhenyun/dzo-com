/**
 * 图标控件
 * type: ICONFONT
 */
import React from 'react';
import './index.less';

export default function ComIcon(props) {
  const { type, className = '', prefix = 'icon-', ...other } = props;

  return (
    <svg aria-hidden="true" className={`com-icon ${className}`} {...other}>
      <use href={`#${prefix}${type}`}> </use>
    </svg>
  );
}
