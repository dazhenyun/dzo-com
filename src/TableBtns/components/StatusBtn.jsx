import React from 'react';
import { confirm, STATUS_ENUM } from './utils';

const StatusBtn = ({
  className,
  method,
  subText,
  status,
  textEnum = STATUS_ENUM,
}) => {
  const toStatus = status === 1 ? 0 : 1;

  return (
    <span
      className={className}
      onClick={() => {
        confirm(`是否确认${textEnum[toStatus]}${subText || ''}?`, () =>
          method(toStatus),
        );
      }}
    >
      {textEnum[toStatus]}
    </span>
  );
};

export default StatusBtn;
