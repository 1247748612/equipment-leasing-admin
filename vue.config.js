const path = require('path')

const name = 'Equipment Lasing Admin'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // TODO: Remember to change this to fit your need
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  devServer: {
    proxy: {
      '/api-dev': {
        target: 'http://127.0.0.1:3301/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api-dev': ''
        }
      }
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
