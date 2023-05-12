const path = require('path');

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
};
