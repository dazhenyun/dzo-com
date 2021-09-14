import React from 'react';

// 空白处点击
export default function useClickOutside(elRef, callback) {
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleClickOutside = e => {
      if (
        elRef?.current?.contains &&
        !elRef.current.contains(e.target) &&
        callback
      ) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callbackRef, elRef]);
}
