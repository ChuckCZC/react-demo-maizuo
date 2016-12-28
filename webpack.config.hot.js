var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'), //css单独打包
	HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var projectName = 'react-demo-maizuo', // 定义项目名
	ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH,'src'), // __dirname下的src目录
	APP_FILE = path.resolve(APP_PATH,'app'), // 根目录文件app.jsx地址
	BUILD_PATH = path.resolve(ROOT_PATH,'/'+projectName+'/dist'); // 发布文件所存的目录

module.exports = {
	entry:{
		app:[
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			APP_FILE
		]
	},
	output:{
		publicPath:'/'+projectName+'/dist', //编译好的文件，在服务器的路径，静态资源引用路径
		path:BUILD_PATH, //编译到当前目录
		filename:'[name].js', //编译后的文件名字
		chunkFilename:'[name].[chunkhash:5].min.js',
	},
	module:{
		loaders:[{ //es6编译
			test:/\.js$/,
			exclude:/^node_modules$/,
			loader:'babel',
			include:[APP_PATH]
		},{ //less编译提取
			test:/\.css$/,
			exclude:/^node_modules$/,
			loader:ExtractTextPlugin.extract('style',['css','autoprefixer']),
			include:[APP_PATH]
		},{ // sass编译提取
			test:/\.(sass|scss)$/,
			exclude:/^node_modules$/,
			loader:ExtractTextPlugin.extract('style',['css','autoprefixer','sass']),
			include:[APP_PATH]
		},{
			test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
			exclude: /^node_modules$/,
			loader: 'file-loader?name=[name].[ext]',
			include: [APP_PATH]
		},{
			test: /\.(png|jpg)$/,
			exclude: /^node_modules$/,
			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
			//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
			include: [APP_PATH]
		},{ //jsx编译
			test: /\.jsx$/,
			exclude: /^node_modules$/,
			loaders: ['jsx', 'babel'],
			include: [APP_PATH]
		}]
	},
	plugins:[
		require('autoprefixer'),
		new webpack.DefinePlugin({
			//process.argv：当前进程的命令行参数数组。
			//process.env：指向当前shell的环境变量，比如process.env.HOME。
			'process.env':{
				NODE_ENV:JSON.stringify('development') //定义编译环境
			}
		}),
		new HtmlWebpackPlugin({ //根据模版插入css/js等生成最终html
			filename:'../index.html', //生成的html存放路径，相对于path
			template:'./src/template/index.html', //html模版路径
			hash:false,
		}),
		new ExtractTextPlugin('base.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve:{
		extensions:['','.js','.jsx','.less','.css','.sass','.scss'], //后缀名自动补全
	}
}
