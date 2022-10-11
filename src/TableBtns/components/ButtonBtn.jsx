import React from 'react';
import { Button } from 'antd';
import { confirm } from './utils';

const MoreBtn = ({ name, auth, method, className, confirmText, ...rest }) => {
  const handleMethod = () => {
    if (confirmText) {
      confirm(confirmText, method);
    } else {
      method?.();
    }
  };

  return (
    <Button onClick={handleMethod} disabled={auth === false} {...rest}>
      {name}
    </Button>
  );
};

export default MoreBtn;
