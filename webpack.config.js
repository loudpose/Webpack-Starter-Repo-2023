const PugPlugin = require('pug-plugin');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const BundleAnalyzerPlugin =
// 	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

const dirApp = path.join(__dirname, 'app');
const dirShared = path.join(__dirname, 'shared');
const dirImages = path.join(__dirname, 'shared', 'images');
const dirModels = path.join(__dirname, 'shared', 'models');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

module.exports = {
	mode: 'development',

	resolve: {
		modules: [dirApp, dirShared, dirStyles, dirModels, dirNode],
	},

	entry: {
		index: './views/index.pug',
	},

	plugins: [
		new webpack.DefinePlugin({ IS_DEVELOPMENT }),
		new CopyWebpackPlugin({
			patterns: [{ from: dirImages, to: './images' }],
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: dirModels, to: './models' }],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new CleanWebpackPlugin(),
		// new HtmlWebpackPlugin({
		// 	filename: 'index.html',
		// 	template: path.join(__dirname, 'views', 'index.pug'),
		// }),
		new PugPlugin({
			pretty: true,
			//☝🏽 Format HTML (only in dev mode)
			css: {
				// output filename of extracted CSS file from source style
				filename: '[name].[contenthash:8].css',
			},
			js: {
				// output filename of extracted JS file from source script
				filename: '[name].[contenthash:8].js',
			},
		}),
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name][contenthash].js',
		assetModuleFilename: '[name][ext]',
		publicPath: '/',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							import: true,
						},
					},
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				exclude: /node_modules/,
				use: ['raw-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.(glb|gltf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'models/[name][ext]',
				},
			},
			{
				test: /\.(woff|woff2|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/inline',
				// Inline assets with the "inline" query parameter.
				resourceQuery: /inline/,
			},
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
				//☝🏽 Load Pug files
			},
		],
	},
};
