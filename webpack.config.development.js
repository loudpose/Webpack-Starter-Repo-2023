const path = require('path');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
module.exports = {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 3000,
		open: false,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new ImageminWebpWebpackPlugin()
		]
	}
};
