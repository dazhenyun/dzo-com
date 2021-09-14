import React from 'react';
import { Empty, Button } from 'antd';

const SearchEmpty = ({ onBack }) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <>
          <span>当前搜索无匹配内容</span>
          <br />
          <span>请返回重新搜索</span>
          <br />
          <Button
            className="mt20"
            size="small"
            type="primary"
            onClick={() => {
              onBack?.();
            }}
          >
            返回
          </Button>
        </>
      }
    />
  );
};

export default SearchEmpty;
