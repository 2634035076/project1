var path=require('path')

var htmlWebpackPlugin=require('html-webpack-plugin')

const {VueLoaderPlugin}=require('vue-loader')

module.exports={
	entry:path.join(__dirname,'./src/main.js'),//入口文件
	output:{
		path:path.join(__dirname,'./dist'),//输出路径
		filename:'bundle.js'//输出文件名称
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html'),
			filename:'index.html'//设置生成内存页面名称
		}),
		new VueLoaderPlugin()
	],
	module:{
		rules:[
			{test:/\.css$/,use:['style-loader','css-loader']},
			{test:/\.less$/,use:['style-loader','css-loader','less-loader']},
			{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:['url-loader?limit=76&name=[hash:8]-[name].[ext]']},
			{test:/\.(ttf|woff|woff2|eot|svg)$/,use:'url-loader'},
			{test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
			{test:/\.vue$/,use:'vue-loader'}
		]
	}
}