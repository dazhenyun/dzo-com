import React from 'react';
import { Button } from 'antd';

const MoreBtn = ({ name, auth, method, className, ...rest }) => {
  return (
    <Button onClick={() => method?.()} disabled={auth === false} {...rest}>
      {name}
    </Button>
  );
};

export default MoreBtn;
