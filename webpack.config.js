const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniExtractPlugin = require('mini-css-extract-plugin');
console.log(".....")
console.log(process.env.NODE_ENV);

// 页面模版列表
let template = ['index', 'about'];

var htmlConcat = () => {
	let a = [];
	template.forEach(function(item){
		a.push(
			new HtmlWebpackPlugin({
				filename: `${item}.html`,
				template: `./src/${item}.html`,
				inject: true,
				favico: './images/logo.png',
				chunks: [item],
				title: "hello,world"
			})
		)
	});
	return a;
};

module.exports = {
	// webpack4 
	// model-> develop
	// 调试模式，避免缓存，找到chunk共享模块，取出生成单独chunk
	// 1.开启dev-tool, 方便调试，有详细错误提示，
	// 2.利用缓存机制，实现快速构建
	// 3.
	mode: process.env.NODE_ENV,
	entry: {
		index: "./js/index.js",
		about: "./js/about.js"
	},
	output: {
		path: resolve(__dirname, "./dist"),
		filename: "[name].js?[hash]"
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
	plugins: [
		// 全局模块声明，在js模块中可直接使用，不用声明
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery":"jquery"
		}),
		// 提取css，单独大包css
		new miniExtractPlugin({
			filename: "[name].css"
		}),
	].concat(htmlConcat()),
	resolve: {
		alias: {
			"~": resolve(__dirname),
			owl: resolve(__dirname, "./node_modules/owl.carousel/dist/"),
			bootstrapJs: resolve(__dirname, "./node_modules/bootstrap/js"),
			bootstrapScss: resolve(__dirname, "./node_modules/bootstrap/scss")
		}
	}
}