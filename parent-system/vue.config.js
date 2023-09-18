const path = require("path");

module.exports = {
  lintOnSave: false,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("assets", path.resolve(__dirname, "./src/assets"))
      .set("styles", path.resolve(__dirname, "./src/styles"))
      .set("components", path.resolve(__dirname, "./src/components"));

    // 优化打包
    config.optimization.splitChunks({
      minSize: 300000,
      maxInitialRequests: 6
    });

    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 1024 }));
  }
};
