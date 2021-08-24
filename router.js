let express = require('express');
//載入express模組
let app = express();
// 使用express

let engine = require('ejs-locals');

// 以 body-parser 模組協助 Express 解析表單與JSON資料
// var bodyParser = require('body-parser');

//新版express以內建解析資料
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}) );

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

//設定port位置
let port = 80;
// 監聽 port
app.listen(process.env.PORT);
app.listen(port);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// 指定 esj 為 Express 的畫面處理引擎
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
	console.log("sql connectted");
});

//-----------------------------------------------------------
//路由器

//首頁
app.get('/home', function (req, res) {
	res.render('homepage', { 'title': '團購網首頁' });
	// console.log("success render home.")
})
//團長註冊
app.get('/home/register', function (req, res) {
	res.render('register', {'title': '註冊'});
})
//團長上架商品
app.get('/home/tanstart', function (req, res) {
	res.render('tanstart', { 'title': '上架商品' });
})
//團長商品管理
app.get('/home/tansetting', function (req, res) {
	res.render('tansetting', { 'title': '商品管理' });
})
//
app.get('/home/commodity', function (req, res) {
	res.render('commodity', { 'title': '商品列表' });
})
//購物車
app.get('/home/shoppingcart', function (req, res) {
	res.render('shoppingcart', { 'title': '購物車' });
})

//-----------------------------------------------------------

//上傳資料
//到這裡看資料庫
app.get("/data", function (req, res) {
	connection.query('select Id,Name,Phone,Email from members', 
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			//傳回Json陣列
			res.send(JSON.stringify(rows));
			console.log("success get.");
		}
	);
})

//'/:id' req.params
// commodity表單資料
app.get('/data/commodity', function (req, res) {
	var query = req.query;
	res.send(query).end();
})

// 傳商品資料到資料庫
app.post('/data/commodity', function (req, res) {
	connection.query(
		"insert into commodity set Name = ?",
		[
			req.body.postname
		], function (err, result) {
			if (err) {
				console.log(JSON.stringify(err));
				console.log("error can not insert");
				console.log(req.body.name);
			} else {
				if (result.lenght > 0) {
					//傳回Json陣列	
					res.send(JSON.stringify(result));
				}
			}
		}
	);
	res.send(req.body);
	console.log("ok");
})
// test app.post
// app.post('/data/commodity', function (req, res) {
// 	connection.query(
// 		"insert into commodity set Name = 252",
// 		[]
// 	)
// 	console.log(req.body.postname);
// })

// 測試用insert into members set Name = "fb", Phone = "4141414" , Email = "g@gmail.com" ,Account = "fb", Password = "fb", Birthday = "2021-02-08", county = "澎湖縣", district = "馬公市",  Gender= "on"
//傳註冊資料到資料庫
app.post("/data/register", function (req, res) {
	connection.query(
		"insert into members set Name = ?, Phone = ? ,Email = ? ,Account = ?, Password = ?, Birthday = ?, County = ?, District = ?, CompanyPhone = ?, Gender= ?",
		[
		req.body.secondName,
		req.body.phone,
		req.body.email,
		req.body.account,
		req.body.password,
		req.body.birthday,
		req.body.county,
		req.body.district,
		req.body.companyPhone,
		req.body.gender
		], function (err, result) {
			if (err) {
				console.log(JSON.stringify(err));
				console.log("\nerror can not insert");
			} else {
				if (result.lenght > 0) {
					//傳回Json陣列	
					res.send(JSON.stringify(result));
					console.log("\nsuccess insert1.");
				}
			}
		}
	);
	res.send(req.body);
	console.log("\nsuccess insert2.");
})

app.post("/data/login", function (req, res) {	
	// 用body需要傳請求
	// var account = req.body.Account;
	// var passsword = req.body.Passsword;
	var account = req.body.account;
	var password = req.body.password;	
	// res.send(req[0]);
	res.send(`<h3>login success.</h3> <p>Account：${account}</p> <p>Passsword：${password}</p>`);
})
