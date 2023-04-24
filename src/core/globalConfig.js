import { TinyColor } from '@ctrl/tinycolor';
import { generate } from '@ant-design/colors';
import { isFunction, isObject } from '@dzo/utils';

// 基础颜色值
export var BaseColor = '#1890ff';

// 组件注册地址
const GlobalComponents = {
  pc: {},
  app: {},
  global: {},
};

const globalVar = {};

/**
 * 全局配置信息
 */
const globalConfig = {
  default: {
    tableConfig: {
      headerHeight: 39,
      rowHeight: 32,
      headerMenu: true,
      align: 'left',
    },
    amountPrecision: 2,
    theme: BaseColor,
  },
  iconScriptUrl: '',
  themeOptions: [
    {
      id: 'blue',
      text: '蓝',
      rtBgColor: '#4A90E2',
    },
    {
      id: 'gray',
      text: '灰',
      rtBgColor: '#828282',
    },
    {
      id: 'lightgreen',
      text: '绿',
      rtBgColor: '#51ac76',
    },
    {
      id: 'darkblue',
      text: '深蓝',
      rtBgColor: '#394b58',
    },
    {
      id: 'lightgray',
      text: '浅灰',
      rtBgColor: '#91929e',
    },
    {
      id: 'darkgreen',
      text: '深绿',
      rtBgColor: '#018867',
    },
    {
      id: 'pink',
      text: '粉',
      rtBgColor: '#ff75a2',
    },
    {
      id: 'orange',
      text: '橙',
      rtBgColor: '#F1924E',
    },
  ],
};

/**
 * 获取基础配置信息
 * @returns
 */
export function getGlobalConfig() {
  return globalConfig;
}

/**
 * 设置基本信息
 * @param {*} config
 */
export function setGlobalConfig(config) {
  if (config) {
    if (isFunction(config)) {
      Object.assign(globalConfig, config(globalConfig));
    } else {
      var loop = function loop(oldCfg, newCfg) {
        Object.keys(newCfg).forEach(function(key) {
          if (isObject(oldCfg[key])) {
            loop(oldCfg[key], newCfg[key]);
          } else {
            oldCfg[key] = newCfg[key];
          }
        });
      };
      loop(globalConfig, config);
    }
  }
}

/**
 * 注册组件
 * @param {*} Components
 * @param {*} options
 */
export function registerComponent(Components, options) {
  const platform = options?.platform || 'pc';
  Object.assign(GlobalComponents[platform], Components);
}

/**
 * 获取组件信息
 * @param {*} type
 * @param {*} platform
 * @returns
 */
export function getRegisterComponent(type, platform = 'pc') {
  if (type) {
    if (typeof type === 'string') {
      return GlobalComponents[platform][type] || null;
    }
    return undefined;
  }
  return GlobalComponents[platform];
}

/**
 * 初始化自定义的css3变量
 * @param colorVal
 * @param themeObj
 */
export function initCustomThemeColor(colorVal, themeObj = {}) {
  if (!colorVal) return;
  var baseColor = new TinyColor(colorVal);
  var colorPalettes = generate(baseColor.toRgbString());
  var rootStyle = [':root{'];
  Object.keys(themeObj).forEach(function(k) {
    rootStyle.push(''.concat(k, ':').concat(themeObj[k], ';'));
  });
  colorPalettes.forEach(function(color, index) {
    rootStyle.push(
      '--primary-'
        .concat(index + 1, '-5:')
        .concat(new TinyColor(color).setAlpha(0.5).toRgbString(), ';'),
    );
  });
  rootStyle.push('}');
  var style =
    document.getElementById('custom_theme_css') ||
    document.createElement('style');
  style.id = 'custom_theme_css';
  style.innerText = rootStyle.join('');
  document.head.appendChild(style);
}

/**
 * 暴露全局变量api
 */
export function setGlobalVar(key, value) {
  globalVar[key] = Object.freeze(value);
  if (!window.hasOwnProperty(key)) {
    Object.defineProperty(window, key, {
      get: function get() {
        return globalVar[key];
      },
    });
  }
}
