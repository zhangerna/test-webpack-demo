const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin')
console.log(".....")
console.log(process.env.NODE_ENV);

// webpack4 废弃commonschunkplugin引入了optimization.splitchunks 和 optimization.runtiechunk
// babel-minify可进行es6代码压缩，uglifyjs无法支持es6+ code 压缩

// 内置optimization.minimize来压缩代码，不用再显示引入UglifyJsPlugin；
// 废弃CommonsChunkPlugin插件，使用optimization.splitChunks和optimization.runtimeChunk来代替；
// 使用optimization.noEmitOnErrors来替换NoEmitOnErrorsPlugin插件
// 使用optimization.namedModules来替换NamedModulesPlugin插件

// 废弃json-loader，友好支持json模块，以ESMoudle的语法引入，还可以对json模块进行tree-shaking处理；
// happypack多线程打包操作，也需要升级

// 页面模版列表
let template = ['index', 'about'];

var htmlConcat = () => {
	let a = [];
	template.forEach(function(item){
		a.push(
			new HtmlWebpackPlugin({
				filename: `${item}.html`,
				template: `!!html-withimg-loader!./src/${item}.html`,
				inject: 'head',
				favico: './images/logo.png',
				chunks: ["vendor", "commons","manifest", item],
				title: "hello,world"
			})
		)
	});
	return a;
};

module.exports = {
	// webpack4 　新增model
	// model->production 
	// uglify-js代码默认压缩
	// 1.启用ModuleConcatenationPlugin,optimization.minimize,tree-shaking压缩，合并，拆分，产出更小的体积的chunk
	// 2.关闭内存缓存
	// 3.开启noemitonerrorsplugin
	mode: process.env.NODE_ENV,
	entry: {
		// controls: "./js/controls.js",
		index: "./js/index.js",
		about: "./js/about.js"
	},
	output: {
		path: resolve(__dirname, "./dist"),
		filename: "[name].js?[hash]",
		chunkFilename:"[name].js?[hash]"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"less-loader",
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
			},
			{
				test:/\.less$/,
				use: [
					miniExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			},
			{
				test:/\.scss$/,
				use: [
					miniExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test:/\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 10000
					}
				}]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize:0,
					name: "commons"
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		},
		runtimeChunk: {
			name: "manifest"
		}
	},
	plugins: [
		// 清除当前包里的内容
		new cleanWebpackPlugin('dist'),
		// 取出webpack公共函数代码
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery":"jquery"
		}),
		new miniExtractPlugin({
			filename: "[name].css?[hash]"
		}),
		// new optimizeCss(),
		// new webpack.HotModuleReplacementPlugin(),
	].concat(htmlConcat()),
	// 全局变量声明，可全文使用不用声明
	resolve: {
		alias: {
			"~": resolve(__dirname),
			owl: resolve(__dirname, "./node_modules/owl.carousel/dist/"),
			bootstrapJs: resolve(__dirname, "./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js"),
			bootstrapScss: resolve(__dirname, "./node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss")
		}
	}
}