import React from 'react';

const LinkBtn = ({ name, className, pathname }) => {
  return (
    <a href={pathname} className={className}>
      {name}
    </a>
  );
};

export default LinkBtn;
