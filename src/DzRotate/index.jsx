/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import debounce from 'lodash/debounce';

export default ({ children, boxStyle, canScrolle = true }) => {
  const [isScrolle, setIsScrolle] = useState(true);
  const [show, setShow] = useState(false);
  // 滚动速度，值越小，滚动越快
  const speed = 50;
  const warper = useRef();
  const childDom1 = useRef(null);
  const childDom2 = useRef(null);

  useEffect(() => {
    setIsScrolle(canScrolle);
  }, [canScrolle]);
  // 开始滚动

  useEffect(() => {
    let timer;
    if (isScrolle) {
      // childDom2.current.innerHTML = childDom1.current.innerHTML;
      timer = setInterval(
        () => {
          if (childDom1.current) {
            return warper.current.scrollTop >= childDom1.current.scrollHeight
              ? (warper.current.scrollTop = 0)
              : warper.current.scrollTop++
          }
        },
        speed,
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isScrolle]);

  useEffect(() => {
    addWatch(childDom1.current);
    if (warper.current) {
      if (warper.current.clientHeight <= childDom1.current.clientHeight) {
        setShow(true);
      }
    }
    window.onresize = debounce(function () {
      if (warper.current) {
        if (warper.current.clientHeight <= childDom1.current.clientHeight) {
          setShow(true);
          setIsScrolle(true);
        } else {
          setShow(false);
          setIsScrolle(false);
        }
      }
    }, 500);
    return () => {
    };
  }, [])

  const hoverHandler = flag => setIsScrolle(flag && canScrolle);
  function addWatch(element) {
    // 选择需要观察变动的节点
    let targetNode = element;
    // 观察器的配置（需要观察什么变动）
    let config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    // 当观察到变动时执行的回调函数
    const mutationCallback = (mutations) => {
      for (let mutation of mutations) {
        let type = mutation.type;
        switch (type) {
          case "childList":
            setTimeout(() => {
              if (warper.current) {
                if (warper.current.clientHeight <= childDom1.current.clientHeight) {
                  setShow(true);
                }
              }
            }, 1000)
            console.log("A child node has been added or removed.");
            break;
          case "attributes":
            console.log(`The ${mutation.attributeName} attribute was modified.`);
            console.log(mutation.attributeName)
            break;
          case "subtree":
            console.log(`The subtree was modified.`);
            break;
          default:
            break;
        }
      }
    };

    // 创建一个观察器实例并传入回调函数
    let observer = new MutationObserver(mutationCallback);
    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);
    // observer.disconnect();
  }


  console.log('show',show);
  return (
    <div
      className="parent"
      style={{ ...boxStyle }}
      ref={warper}
      onMouseOver={() => hoverHandler(false)}
      onMouseLeave={() => hoverHandler(true)}>
      <div id='childDom1' ref={childDom1}>
        {children?.length && children.map((item, index) =>
          React.createElement(item.type, {
            key: index,
            ...item.props,
          }),
        )}
      </div>
      <div ref={childDom2} >
        {
          show && children?.length && children?.map((item, index) =>
            React.createElement(item.type, {
              key: index,
              ...item.props,
            }),
          )
        }
        {/* {children.map((item, index) =>
          React.createElement(item.type, {
            key: index,
            ...item.props,
          }),
        )} */}
      </div>
    </div>
  );
};
