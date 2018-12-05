const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
// var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

function getEntry() {
  let globPath = 'src/**/*.html'
  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)'
  let files = glob.sync(globPath)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    entries.push(dirname.replace(new RegExp('^' + pathDir), '$2').replace('src/', ''))
  }
  return entries
}

function addEntry() {
  let entryObj = {}
  getEntry().forEach(item => {
    entryObj[item] = path.resolve(__dirname,'src', item, 'main.js')
  })
  return entryObj
}

const webpackconfig = {
  entry: addEntry(),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   template: './src/popup-info-box-web-component/index.html',
    //   minify: {
    //     removeComments: false,
    //     collapseWhitespace: false
    //   },
    //   inlineSource: '.(js|css)$'
    // }),
    // new HtmlWebpackInlineSourcePlugin() // 实例化内联资源插件
  ],
  devServer: {
    contentBase: '/dist',
    port: 4396,
    compress: true,
    open: true
  },
  mode: 'development',
} 

getEntry().forEach(pathname => {
  let conf = {
    filename: pathname.replace('src/', '') + '.html',
    template: path.join(__dirname,'src',pathname, 'index.html'),
    chunks: Array.call([], pathname)
  }
  webpackconfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = webpackconfig 