import { useEffect, useRef } from 'react';

// 定时器
export default function useInterval(callback, delay) {
  const saveCallback = useRef();

  useEffect(() => {
    // 每次渲染后，保存新的回调到我们的 ref 里
    saveCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      saveCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return null;
  }, [delay]);
}
