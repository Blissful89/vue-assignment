module.exports = {
  css: {
    loaderOptions: {
      sass: { additionalData: `@import "./src/client/styles/00-base/breakpoints";` },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'ViriCiti Demo Application'
      return args
    })
  },
}
