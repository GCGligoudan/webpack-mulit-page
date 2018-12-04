const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './popup-info-box-web-component/main.js',
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(png|gif|jpg|svg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash].[ext]',
            limit: 8192,
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './popup-info-box-web-component/index.html',
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin() // 实例化内联资源插件
  ],
  devServer: {
    contentBase: '/dist',
    port: 4396,
    compress: true,
    open: true
  },
  mode: 'development',
}