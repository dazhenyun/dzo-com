import React from 'react';

// 空白处点击
export default function useScroll(elRef, callback) {
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleScroll = e => {
      callbackRef.current(e);
    };

    if (elRef?.current) {
      elRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (elRef?.current) {
        elRef.current.removeEventListener('click', handleScroll);
      }
    };
  }, [callbackRef, elRef]);
}
