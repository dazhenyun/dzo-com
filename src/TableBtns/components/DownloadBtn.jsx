import React from 'react';

const DownloadBtn = ({ name, fileName, pathname, className }) => {
  return (
    <a download={fileName} href={pathname} className={className}>
      {name}
    </a>
  );
};

export default DownloadBtn;
