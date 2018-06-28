const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniExtractPlugin = require('mini-css-extract-plugin');
console.log(".....")
console.log(process.env.NODE_ENV);

// 页面模版列表
let template = ['index'];

var htmlConcat = () => {
	let a = [];
	template.forEach(function(item){
		a.push(
			new HtmlWebpackPlugin({
				filename: `${item}.html`,
				template: `./src/${item}.html`,
				inject: 'head',
				favico: './images/logo.png',
				chunks: [item],
				title: "hello,world"
			})
		)
	});
	return a;
};

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		index: "./js/index.js",
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
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery":"jquery"
		}),
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