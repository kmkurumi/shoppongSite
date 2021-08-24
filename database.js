// 以 Express 建立 Web 伺服器
var express = require("express");

var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));


// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 一切就緒，開始接受用戶端連線
app.listen(process.env.PORT);
app.listen(80);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

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

// 依 HTTP 的 Method (POST/GET/PUT/DELETE) 進行增查修刪
//callback函式
//app.method(url,callback)

// --------------------------------------------------------------
// 資料庫介面
app.get("/home/news", function (req, res) {

	connection.query('select Id,Name,Phone,Email from members', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			//傳回Json陣列
			res.send(JSON.stringify(rows));
		}
	);
})

//增加：create(不需要id）
app.post("/home/news", function (req, res) {
	connection.query(
		"insert into members set Name = ?, Phone = ? ,Email = ? ",
			[
				req.body.Name, 
				req.body.Phone,
				req.body.Email
			]);
	res.send("row inserted.");   
})

app.put("/home/news", function (req, res) {
	connection.query(
		"update members set Name = ?, Phone = ? ,Email = ? where Id = "
		+ req.body.Id, 
			[
				req.body.Name, 
				req.body.Phone,
				req.body.Email
			]);
	res.send("row updated.");  
})
//刪：delete(只需要id)
app.delete("/home/news", function (req, res) {
	connection.query(
		"delete from members where Id = " + req.body.Id,
			[]
		);
	res.send("row deleted.");
})

