import { useState, useEffect, useCallback } from 'react';

// 获取窗口高度变化
export default function useWinResize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const resize = useCallback(() => {
    // 使用useCallback减少函数不断创建的消耗
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return size;
}
