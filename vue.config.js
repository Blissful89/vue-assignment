module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'ViriCiti Demo Application'
      return args
    })
  },
}
