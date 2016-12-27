var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'), //css单独打包
	HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var projectName = 'react-demo-maizuo', // 定义项目名
	ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH,'src'), // __dirname下的src目录
	APP_FILE = path.resolve(APP_PATH,'app'), // 根目录文件app.jsx地址
	BUILD_PATH = path.resolve(ROOT_PATH,projectName+'/dist'); // 发布文件所存的目录

module.exports = {
	entry:{
		app:APP_FILE,
		common:[
			'react',
			'react-dom',
			'react-router',
			'redux',
			'react-redux',
			'redux-thunk',
			'immutable'
		]
	},
	output:{
		publicPath:'/'+projectName+'/dist/', //编译好的文件，在服务器的路径,域名会自动添加到前面
		path:BUILD_PATH, // 编译到当前目录
		filename:'[name].js', //编译后的文件名字
		chunkFilename:'[name].[chunkhash:5].min.js',
	},
	module:{
		loaders:[{ //es6编译
			test:/\.js$/,
			exclude:/^node_modules$/,
			loader:'babel'
		},{ //less编译提取
			test:/\.css$/,
			exclude:/^node_modules$/,
			loader:ExtractTextPlugin.extract('style',['css','autoprefixer','less'])
		},{ // sass编译提取
			test:/\.(sass|scss)$/,
			exclude:/^node_modules$/,
			loader:ExtractTextPlugin.extract('style',['css','autoprefixer','sass'])
		},{
			test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
			exclude: /^node_modules$/,
			loader: 'file-loader?name=[name].[ext]'
		},{
			test: /\.(png|jpg)$/,
			exclude: /^node_modules$/,
			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
			//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
		},{ //jsx编译
			test: /\.jsx$/,
			exclude: /^node_modules$/,
			loaders: ['jsx', 'babel']
		}]
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify('production') //定义生产环境
			}
		}),
		new HtmlWebpackPlugin({ //根据模版插入css/js等生成最终html
			filename:'../index.html', //生成的html存放路径，相对于path
			template:'./src/template/index.html', //html模版路径
			inject:'body',
			hash:false,
		}),
		//提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
		new webpack.optimize.CommonsChunkPlugin("common", "common.bundle.js"),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false, // remove all comments
			},
			compress: {
				warnings: false
			}
		})
	],
	resolve:{
		extensions:['','.js','.jsx','.less','.css','.sass','.scss'], //后缀名自动补全
	}
}