import { ConfigProvider, Modal } from 'antd';
import { store } from '@dzo/utils';
import { initCustomThemeColor } from './globalConfig';

const USER_INFO = '__user__info__';

const appExternalObj = {};

const externalObj = {
  getDefaultTheme() {
    const theme = store.get('__default__theme__');
    return typeof theme === 'string'
      ? {
          primaryColor: theme,
        }
      : theme;
  },
  switchTheme(theme) {
    store.set('__default__theme__', theme);
    var newTheme =
      typeof theme === 'string'
        ? {
            primaryColor: theme,
          }
        : theme;
    ConfigProvider.config({
      theme: newTheme,
    });
    // initCustomThemeColor(newTheme);
  },
};

/**
 * 依赖其他库或当前环境的对象和方法
 */
const depUtil = {
  external: externalObj,
  /**
   * 获取当前登录用户信息
   */
  getUser() {
    return store.get(USER_INFO) || {};
  },
  /**
   * 设置当前登录用户信息
   * @param user
   */
  setUser(data) {
    return store.set(USER_INFO, data);
  },
};

/**
 * 注册外部扩展方法到DZ
 * @param obj
 */
function registerExternal(obj) {
  Object.keys(obj).forEach(key => {
    if (!externalObj[key]) {
      Object.defineProperty(externalObj, key, {
        get() {
          if (appExternalObj[key]) {
            return appExternalObj[key];
          }
          return obj[key];
        },
      });
    }
  });
}

export { registerExternal, depUtil };
