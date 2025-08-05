const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
		})
	],
	entry: {
		app: path.resolve(__dirname, './frontend/main.js'),
	},
    devtool: 'source-map',
    mode: "production",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
	},
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: '[name].js',
	}
}