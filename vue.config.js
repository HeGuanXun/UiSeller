const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const CompressionPlugin = require('compression-webpack-plugin');
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 本地环境是否需要使用cdn
const devNeedCdn = false;

module.exports = {

  productionSourceMap: false,
  configureWebpack: (config) => {
    if (isProduction) {
      // 为生产环境修改配置...
      config.mode = 'production'
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //对超过10k的数据进行压缩
          deleteOriginalAssets: false //是否删除原文件
        })]
      }
    }
  },

  lintOnSave: false,
  //publicPath: 'https://shophome.oss-cn-beijing.aliyuncs.com/platform/',
  chainWebpack: config => {
    config.resolve.alias
        .set("@$", resolve("src"))
        .set("views", resolve("src/views"))
        .set('component',resolve('src/component'))
        .set("api", resolve("src/scripts/api"))
        .set("scripts", resolve("src/scripts"));

    config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({bypassOnDebug: true})
        .end();

    // config.plugin('html').tap(args => {
    //     // 生产环境或本地需要cdn时，才注入cdn
    //     if (isProduction || devNeedCdn) args[0].cdn = cdn
    //     return args
    // });
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

  },
  devServer: {
    port: "8088",
    open: false,
    proxy: {
      "/apiproxy": {
        target: "http://8.129.149.39/apiproxy/",
        //target: "http://192.168.0.32:4003/",
        //target: "MorningStar:
        changeOrigin: true,
        pathRewrite: {
          "^/apiproxy": ""
        }
      },
      "/api7proxy": {
        target: "http://luohuanyu.natapp4.cc/seller/",
        // target: "http://8.129.149.39/api7proxy",
        // target: "http://192.168.0.32:8890",
        //target: "http://192.168.0.145:8890/",
        changeOrigin: true,
        pathRewrite: {
          "^/api7proxy": ""
        }
      },
    }
  }
};
