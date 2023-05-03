const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.config');

module.exports = merge(config, {
	mode: 'production',

	output: {
		path: path.join(__dirname, 'public'),
		assetModuleFilename: '[name].[ext]',
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
			}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 10 }],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								'svgo',
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false,
											addAttributesToSVGElement: {
												params: {
													attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
												},
											},
										},
									},
								},
							],
						],
					},
				},
			}),
		],
	},
});
