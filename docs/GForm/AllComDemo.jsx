import React from 'react';
import { GForm } from '@dzo/com';
import { complexForm } from './AllComMap';

export default () => {
  const props = {
    layout: 'vertical',
    gutter: 20,
    formSet: complexForm,
    submitCall: values => {
      console.log(values);
    },
  };
  return <GForm {...props} />;
};
