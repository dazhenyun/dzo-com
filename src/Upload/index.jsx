import React from 'react';
import FileUpload from './FileUpload';
import NRTUpload from './NRTUpload';

const Upload = ({ isNRT, ...rest }) => {
  return isNRT ? <NRTUpload {...rest} /> : <FileUpload {...rest} />;
};

export default Upload;
