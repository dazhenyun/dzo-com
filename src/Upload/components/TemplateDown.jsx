import React from 'react';
/**
 * 下载模板
 * @param {*} param0
 */
const TemplateDown = ({ templateUrl }) => {
  return (
    !!templateUrl && (
      <>
        &nbsp;&nbsp;
        <a
          onClick={e => {
            e.stopPropagation();
            if (typeof templateUrl === 'string') {
              window.open(templateUrl);
            } else if (typeof templateUrl === 'function') {
              templateUrl(e);
            }
          }}
        >
          下载模板
        </a>
      </>
    )
  );
};

export default TemplateDown;
