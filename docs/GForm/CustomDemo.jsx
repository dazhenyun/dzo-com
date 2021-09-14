import React from 'react';
import { GForm } from '@dzo/com';
import NumRange from '../../src/NumRange';

export default () => {
  const props = {
    column: 1,
    style: { width: 500 },
    formSet: [
      {
        type: 'custom',
        label: '年龄区间',
        name: 'ageRange',
        renderChild: <NumRange precision={2} />,
        props: {
          onChange(v) {
            console.log(v);
          },
        },
      },
    ],
    submitCall: values => {
      console.log(values);
    },
  };
  return <GForm {...props} />;
};
