import React from 'react';

/**
 *  解决自定义组件跟Form表单结合时 Function components cannot be given refs的报错
 */
const IgnoreRef = React.forwardRef((props, ref) => {
  const child = React.Children.only(props.children);
  return React.cloneElement(child, { ...props, ...child.props });
});

export default IgnoreRef;
