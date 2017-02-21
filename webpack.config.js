var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'index': __dirname + '/src/js/index.js'
	},
	output: {
		path: __dirname + '/src/web/js',
		filename: '[name].js'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	externals: {

	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					compact: true
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	},
	vue: {
		loaders: {
			js: 'babel',
			css: ExtractTextPlugin.extract('css'),
			sass: ExtractTextPlugin.extract('css!sass')
		}
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			filename: __dirname + '/src/web/index.html',
			template: __dirname + '/src/html/index.html',
			injext: 'body',
			hash: true,
			chunks: ['index']
		})
	]

}