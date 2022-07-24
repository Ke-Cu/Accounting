// vue.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
  },
  lintOnSave: false, //关闭eslint检查
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '可家账单'
      return args
    })
  },
}
