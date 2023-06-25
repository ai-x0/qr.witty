const { override, disableEsLint, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");
var path = require("path");

module.exports = {
  webpack: override(
    disableEsLint(),

    (config, env) => {
      // 修改打包输出output
      if (env === "production") {
        config.output.path = path.resolve(__dirname, "dist");
      }

      return config;
    }
  ),
};
