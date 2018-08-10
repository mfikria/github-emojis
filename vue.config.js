const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./docs"),
  chainWebpack: config => {
    config.resolve.alias
      .set("@api", path.resolve(__dirname, "./src/api"));
  },

  pluginOptions: {
    quasar: {
      theme: 'mat'
    }
  }
}