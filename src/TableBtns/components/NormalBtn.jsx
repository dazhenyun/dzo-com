import React from 'react';
import { confirm } from './utils';

const NormalBtn = ({ name, className, method, confirmText, type }) => {
  return (
    <span
      className={className}
      onClick={() => {
        if (['confirm'].includes(type)) {
          confirm(confirmText, method);
        } else {
          method?.();
        }
      }}
    >
      {name}
    </span>
  );
};

export default NormalBtn;
