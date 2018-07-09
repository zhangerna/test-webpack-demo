# test-webpack-demo

### webpack4 demo练习

#### 安装方法：npm install;
#### 测试启动: npm run dev
#### 生产环境启动： npm run build

### mode->production
###### webpack4 废弃commonschunkplugin引入了optimization.splitchunks 和 optimization.runtiechunk
###### babel-minify可进行es6代码压缩，uglifyjs无法支持es6+ code 压缩

###### 内置optimization.minimize来压缩代码，不用再显示引入UglifyJsPlugin；
###### 废弃CommonsChunkPlugin插件，使用optimization.splitChunks和optimization.runtimeChunk来代替；
###### 使用optimization.noEmitOnErrors来替换NoEmitOnErrorsPlugin插件
###### 使用optimization.namedModules来替换NamedModulesPlugin插件

###### 废弃json-loader，友好支持json模块，以ESMoudle的语法引入，还可以对json模块进行tree-shaking处理；
###### happypack多线程打包操作，也需要升级

### mode->dev

###### 调试模式，避免缓存，找到chunk共享模块，取出生成单独chunk
###### 1.开启dev-tool, 方便调试，有详细错误提示，
###### 2.利用缓存机制，实现快速构建