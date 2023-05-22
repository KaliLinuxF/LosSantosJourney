import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'

const config: webpack.Configuration = {
	entry: path.join(__dirname, 'index.tsx'),
	output: {
		path: path.join(__dirname, '../dist/ui'),
		assetModuleFilename: 'assets/[hash][ext][query]',
		clean: true,
	},
	devtool: 'inline-source-map',
	devServer: {
		port: 3000,
		hot: true,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.sass'],
		alias: {
			Styles: path.join(__dirname, 'src', 'styles'),
			Fonts: path.join(__dirname, 'src', 'fonts'),
			Interfaces: path.resolve(__dirname, 'src', 'interfaces'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
					},
				},
			},
			{
				test: /\.(s[ac]|c)ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico|woff2?|eot|ttf|otf)$/,
				type: 'asset/resource',
			},
		],
	},
}

export default config