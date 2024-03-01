import { useRef } from 'react';
import { ConfigProvider } from 'antd';
import { depUtil } from '../core/external';
import {
  getGlobalConfig,
  BaseColor,
  initCustomThemeColor,
} from '../core/globalConfig';
import zhCN from 'antd/es/locale/zh_CN';
/**
 * 获取默认主题
 */
function getDefaultTheme() {
  var color = getGlobalConfig().default.theme;

  return Object.assign(
    {
      colorPrimary: color,
    },
    depUtil.external.getDefaultTheme(),
  );
}

/**
 * 初始化默认主题
 */
function useDefaultTheme() {
  var themeRef = useRef();
  if (!themeRef.current) {
    themeRef.current = getDefaultTheme();
    if (themeRef.current) {
      themeRef.current?.colorPrimary !== BaseColor &&
        ConfigProvider.config({
          theme: {
            token: {
              ...themeRef.current,
            },
          },
        });
      // initCustomThemeColor(themeRef.current?.primaryColor);
    }
  }
}

export default ({ children, componentSize, ...rest }) => {
  useDefaultTheme();
  const configProps = {
    locale: zhCN,
    componentSize,
    ...rest,
  };
  return <ConfigProvider {...configProps}>{children}</ConfigProvider>;
};
