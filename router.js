//載入express模組
var express = require('express');
// 使用express
var app = express();

//file
var fs = require('fs');

var engine = require('ejs-locals');

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
//新版express以內建解析資料
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//使用 public 資料夾，並成功引入裡面的bootstrap、css、js
app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + 'node_modules'));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
	secret: 'secretKey',
	resave: false,
	saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//設定port位置
let port = 80;
// 監聽 port
app.listen(process.env.PORT);
app.listen(port);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");
// ----------------------------------------
var home = require('./routes/home');
// 第一個參數有點類似命名第一層的網址 /home/XXXX
app.use('/home', home);
var data = require('./routes/data');
app.use('/data', data);
// ----------------------------------------


var login = function (req, res, next) {
	console.log('驗證成功')
	next();
}

app.get('/', login, function (req, res) {
	// req → request
	// res → response
	res.render('layout', {
		title: '開始',
		body: '第一頁'
	});
})


