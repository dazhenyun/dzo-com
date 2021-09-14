/**
 * 图标控件
 * type: ICONFONT
 */
import React from 'react';
import './index.less';

export default function ComIcon(props) {
  const { type, className = '', ...other } = props;

  return (
    <svg aria-hidden="true" className={`com-icon ${className}`} {...other}>
      <use href={`#icon-${type}`}> </use>
    </svg>
  );
}
