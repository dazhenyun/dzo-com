import React from 'react';
import { Button } from 'antd';
import { confirm } from './utils';

export default ({ name, auth, method, className, confirmText, ...rest }) => {
  return (
    <Button
      disabled={auth === false}
      {...rest}
      onClick={() => {
        if (confirmText) {
          confirm(confirmText, method);
        } else {
          method?.();
        }
      }}
    >
      {name}
    </Button>
  );
};
