/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
import { notification, message } from 'antd';
import { getDvaApp, history } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 下载文件
const downLoadFile = (blob, fileName) => {
  if (!blob) return;

  const url = window.URL.createObjectURL(blob); // 只兼容到IE10
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName ? decodeURIComponent(fileName) : '文件.xlsx';
  a.click();
};

// 转换url
function formatUrl(url, data = {}) {
  const { id, ...rest } = data;
  if (id) {
    url = `${url}/${id}`;
  }
  return {
    data: rest,
    url,
  };
}

/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw response;
};

/**
 * 配置extendRequest请求时的默认参数
 */
const extendRequest = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 1000 * 60 * 2,
  prefix: '/oper',
});

// 请求函数
const myRequest = (url, options) =>
  extendRequest(url, options)
    .then(res => {
      const { code, msg } = res;

      // 未登录或过期
      if (code === 98) {
        try {
          getDvaApp()._store.dispatch({ type: 'login/logout' });
          message.error('登录过期，请重新登录', 2);
        } catch (error) {
          console.log(error);
          history.push('/user/login');
        }
      } else if (code !== 200) {
        message.error(`${msg}` || '未知错误，待排查', 2);
      }
      return res;
    })
    .catch(() => {
      // do something
      return {};
    });

export default {
  post: (url, data) => {
    return myRequest(url, { data, method: 'post' });
  },
  get: (url, data) => {
    const { current, ...rest } = data || {};
    const params = rest;

    // 给分页参数换名
    if (current) {
      params.page = current;
    }
    return myRequest(url, { params, method: 'get' });
  },
  put: (url, data) => {
    const { url: newUrl, data: newData } = formatUrl(url, data);
    return myRequest(newUrl, { data: newData, method: 'put' });
  },
  delete: (url, data) => {
    const { url: newUrl, data: newData } = formatUrl(url, data);
    return myRequest(newUrl, { data: newData, method: 'delete' });
  },
  exportExcel: (url, data, fileName) => {
    // 下载excel
    return request(url, { data, method: 'post', responseType: 'blob' })
      .then(blob => {
        downLoadFile(blob, fileName);
        return {
          success: true,
        };
      })
      .catch(error => {
        return {
          success: false,
        };
      });
  },
  fileUpload: (url, data) => {
    // 文件、图片上传
    return request(url, {
      method: 'post',
      data,
    });
  },
};
