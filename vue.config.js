module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: require.resolve('./src/plugins/panoplayer.min'),
          use: 'imports-loader?videojs=video.js,THREE=three',
        },
      ],
    },
  },
};
