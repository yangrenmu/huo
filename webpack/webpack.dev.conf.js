const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 识别 webpack 错误，清理一些无用的打包信息
const FirendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
// 编译完成后，打开浏览器
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const config = require('../config')
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FirendlyErrorWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.host}:${config.port}`],
      },
      clearConsole: true,
    }),
    new OpenBrowserPlugin({
      url: `http://${config.host}:${config.port}`
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': '"development"'
      },
    })
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.js|jsx$/, use: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          { loader: 'css-loader', options: { importLoaders: 1 } }, // 将 CSS 转化成 CommonJS 模块
          'postcss-loader',
          'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  devServer: {
    host: config.host,
    port: config.port,
    stats: 'errors-only',
    // 避免前端路由变成后端请求，true 时，所有路径都执行 index.html
    historyApiFallback: true,
    // 浏览器控制台会出现实时重载的脚本
    inline: true,
    // 热替换
    // hot: true,
    // 显示打包进度
    // progress: true
  },
  // 将一些在浏览器中不起作用，但是被引用的库，置为空
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}