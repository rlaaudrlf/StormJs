const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

const config = {
	entry: {
		index: path.resolve(__dirname, "./Src/main.ts"),
		runTime: path.resolve(__dirname, "./Src/Core/StormLoader.ts")
	},
	mode: "development", // "production" | "development" | "none"
	output: {
		filename: "[hash].[name].js",
		path: path.resolve(__dirname, "./build/dist")
	},

	devServer: {// 开发模式启用服务器
		contentBase: "./",
		port: 8080,
		compress: true
	},

	plugins: [
		new AssetsPlugin({
			filename: "./build/dist/webpack.assets.js",
			processOutput (assets) {
				return `window.WEBPACK_ASSETS=${JSON.stringify(assets)}`;
			}
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				"./build/dist/*.*.js",
				"./build/dist/*.*.js.map",
				"./build/dist/*.js"
			]
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	devtool: "source-map",

	devServer: {
		port: 8080,
		host: "localhost",
		historyApiFallbac: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		open: true
	},

	resolve: {
		alias: {
			vue$: "vue/dist/vue.js"
		},

		extensions: [
			".ts",
			".js",
			".json"
		]
	},
	externals: [
		(function () {
			const IGNORES = ["electron"];


			return function (context, request, callback) {
				if (IGNORES.indexOf(request) >= 0) {
					return callback(null, `require('${request}')`);
				}

				return callback();
			};
		}())
	],

	target: "node",
	module: {
		rules: [
			{
				test: /\.html$/,
				use: "html-loader"
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.txt$/,
				use: "raw-loader"
			},
			{
				test: /\.ts$/,
				use: "ts-loader"
			},
			{
				test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
				loader: "file-loader",
				options: {
					name: (path) => {
						if (!(/node_modules|bower_components/).test(path)) {
							return "fonts" + "/[name].[ext]?[hash]";
						}

						return (
							`${"fonts" +
							"/vendor/"}${
								path.
									replace(/\\/g, "/").
									replace(
										/((.*(node_modules|bower_components))|fonts|font|assets)\//g,
										""
									)
							}?[hash]`
						);
					},
					publicPath: "img"
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	}
};

module.exports = config;