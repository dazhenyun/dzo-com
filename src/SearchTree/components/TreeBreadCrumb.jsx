import React from 'react';
import '../index.less';
/**
 * 左边树的面包屑
 */
const TreeBreadCrumb = ({ title, rightRender, className = '', ...rest }) => {
  return (
    <h5 className={`tree-breadCrumb ${className}`} {...rest}>
      <span>{title}</span>
      <div>{rightRender?.()}</div>
    </h5>
  );
};

export default TreeBreadCrumb;
