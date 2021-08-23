let express = require('express');
//載入express模組
let app = express();
// 使用express

let engine = require('ejs-locals');

//使用 public 資料夾，並成功引入裡面的bootstrap、css、js
app.use("/public", express.static(__dirname + "/public"));

app.use("/node_modules", express.static(__dirname + 'node_modules'));

//設定port位置
let port = 3000;
// 監聽 port
app.listen(port);

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '127.0.0.1',
	user : 'root',
	password : 'root',
	port:'3307',
	database : 'shoppingSite'
});
//連線異常報錯
connection.connect(function(err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

//直接做出網頁
// app.get('/', function (req, res) {
//   res.send(`<p>Hello World</p>`)
// })

app.get('/home', function (req, res) {
	res.render('homepage', { 'title': '團購網首頁' });
})

app.get('/home/register', function (req, res) {
	res.render('register', {
		'title': '註冊'
	});
})

app.get('/home/tanstart', function (req, res) {
	res.render('tanstart', { 'title': '上架商品' });
})

app.get("/home/login", function (req, res) {
	var account = req.body.Account;
	var passsword = req.body.Passsword;
	res.render('<p>Hello World</p>');
	res.send("login success. Account：{account}  Passsword：{passsword}");
})