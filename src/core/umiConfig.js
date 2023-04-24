function mergeConfig(defaultCfg, cfg) {
  Object.keys(cfg).forEach(function(key) {
    if (Object.prototype.toString.call(cfg[key]) === '[object Object]') {
      defaultCfg[key] = { ...defaultCfg[key], ...cfg[key] };
    } else {
      defaultCfg[key] = cfg[key];
    }
  });
  return defaultCfg;
}

/**
 * 配置umi.ts
 * @param config mf: 启用mfsu方案的环境；ngBuild：编译时，去除菜单栏
 */
export default options => {
  const { mf, chainWebpack } = options || {};
  var mfConfig = {
    production: false,
    development: false,
  };
  if (mf) {
    mfConfig.production = mf === true || mf === 'production';
    mfConfig.development = mf === true || mf === 'development';
  }

  var productionConfig = mergeConfig(
    {
      publicPath: './',
      base: '/',
      nodeModulesTransform: {
        type: 'none',
      },
      ignoreMomentLocale: true,
      history: {
        type: 'hash',
      },
      theme: _theme.lessVariables,
      antd: {
        disableBabelPluginImport: true,
      },
      dva: {
        skipModelValidate: true,
        disableModelsReExport: true,
        lazyLoad: true,
      },
      dynamicImport: {
        loading: '@/components/pageLoading',
      },
      terserOptions: {},
    },
    options,
  );
  if (process.env.NODE_ENV === 'production') {
    productionConfig.hash = true;
    if (mfConfig.production) {
      productionConfig.mfsu = {};
      productionConfig.webpack5 = {};
    } else {
      productionConfig.chunks = ['lib', 'umi'];
    }
    productionConfig.chainWebpack = function(config, options) {
      if (!mfConfig.production) {
        config.merge({
          optimization: {
            minimize: true,
            splitChunks: {
              chunks: 'all',
              minSize: 30000,
              minChunks: 1,
              automaticNameDelimiter: '.',
              cacheGroups: {
                lib: {
                  // 基础库(ant\ng-lib-tsx)
                  name: 'lib',
                  chunks: 'all',
                  test: function test(_ref) {
                    var resource = _ref.resource;
                    return /[\\/]node_modules[\\/](react|react-dom|react-dom-router|@antd|antd|@ant-design|@dzo)/.test(
                      resource,
                    );
                  },
                  priority: 99,
                },
                vendors: {
                  // 异步包
                  name: 'vendors',
                  chunks: 'async',
                  minChunks: 2,
                  priority: 50,
                },
              },
            },
          },
        });
      }
      var CompressionWebpackPlugin = require('compression-webpack-plugin');
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.6, // 压缩比例，值为0 ~ 1
        }),
      );

      chainWebpack && chainWebpack(config, options);
    };
  } else {
    if (mfConfig.development) {
      productionConfig.mfsu = {};
      productionConfig.webpack5 = {};
    }
  }
  return productionConfig;
};
