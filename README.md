# webpack打包多页面demo
以github上的项目web-components-examples为例 (https://developer.mozilla.org/en-US/docs/Web/Web_Components).

* 入口entry为多入口，使用node获取源文件的目录及文件夹名称（必要时还要获取源文件的名称）

* 使用html-webpack-plugin插件生成html模板文件，是多文件模板，需要根据获取到的html文件动态设置

* 使用file-loader将css中使用的背景图片提取打包，使用html-loader将html中标签直接引用的图片打包提取

* 使用copy-webpack-plugin将需要复制的文件或文件夹直接提取到输出目录下