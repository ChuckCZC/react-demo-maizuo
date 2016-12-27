var webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	config = require('./webpack.config.hot'),
	opn = require('opn');

//代理服务器
var proxy = [{
	path:'/*/*', //必须的得一个文件地址，如果顶层文件夹名字不同，则用/*代替
	target:'http://127.0.0.1',
	host:'127.0.0.1',
	secure:false
}];

var server = new WebpackDevServer(webpack(config),{
	publicPath:config.output.publicPath,
	hot: true,
	historyApiFallback:true,
	inline:true,
	progress:true,
	stats:{
		colors:true
	},
	proxy
});

//将其他路由，全部返回index.html
server.app.get('*',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
server.listen(8080,function(){
	var uri = 'http://localhost:8080';
	console.log('Listening at ' + uri);

	if (process.env.NODE_ENV !== 'development') {
		opn(uri)
	}
})
