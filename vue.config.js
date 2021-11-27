module.exports = {
  css: {
    loaderOptions: {
      sass: { additionalData: `@import "./src/client/styles/00-base/breakpoints";` },
    },
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10_000,
        maxSize: 200_000,
      }
    }
  },
  chainWebpack: (config) => {
    config.performance
      .maxEntrypointSize(2_000_000)
      .maxAssetSize(300_000)
    config.plugin('html').tap((args) => {
      args[0].title = 'ViriCiti Demo Application'
      return args
    })
  },
}
