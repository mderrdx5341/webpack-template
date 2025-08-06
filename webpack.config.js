const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const { ProvidePlugin } = require("webpack");
const path = require('path');

module.exports = {
    externals: {
        jquery : 'jQuery',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
		}),
        /*new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",

        })*/
	],
	entry: {
		app: path.resolve(__dirname, './frontend/main.js'),
	},
    devtool: 'source-map',
    mode: "development", //production, development
    stats: {
        errorDetails: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                type: 'asset/resource',
                generator: {
                    // Optional: Customize the output filename and path for the SVG files
                    filename: 'images/[name][ext][query]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    // Optional: Customize the output filename and path for the SVG files
                    filename: 'fonts/[name][ext][query]',
                },
            },
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
            },

        ],
	},
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: '[name].js',
	}
}