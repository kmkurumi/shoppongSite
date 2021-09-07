//載入express模組
var express = require('express');
// 使用express
var app = express();
//file
var fs = require('fs');

//設定全域變數
// var config = require('./public/js/config');

var engine = require('ejs-locals');

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
//新版express以內建解析資料
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//--------------------------------------------------------------
// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	port: '3307',
	database: 'shoppingSite'
});
//連線異常報錯
connection.connect(function (err) {
	// if (err) throw err;	
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
	console.log("sql connectted");
});

//--------------------------------------------------------------
//使用 public 資料夾，並成功引入裡面的bootstrap、css、js
app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + 'node_modules'));

// 以 express-session 管理狀態資訊
//中介器，使用cookie
var session = require('express-session');
app.use(session({
	secret: 'secretKey',
	resave: false,
	saveUninitialized: false
	// saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');


//--------------------------------------------------------------
var home = require('./routes/home');
// 第一個參數有點類似命名第一層的網址 /home/XXXX
app.use('/home', home);

var data = require('./routes/data');
app.use('/data', data);

var cart = require('./routes/cart');
app.use('/cart', cart);


// var login = require('./routes/login');
// app.use('/login', login);

// var login = require('./module/login');

// const connection = require('../models/connection_db');

//設定port位置
let port = 80;
// 監聽 port
app.listen(process.env.PORT);
app.listen(port);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");


//--------------------------------------------------------------
//登入


// 在 web 應用中，驗證訊息(credentials) ，只在登入時被傳送，驗證成功後，會記錄在 session 並儲存 cookies 在瀏覽器內。
// 之後的 request 都不會再帶驗證訊息，而是透過 cookie 來辨認 session

// 序列化(serialize)就是把物件轉換成可被儲存在儲存空間的資料的這個過程，
// 例如把 JavaScript 中的物件透過 JSON.stringify() 變成字串儲存。
// 而反序列化則是倒過來把資料轉換成程式碼中的物件，例如把 JSON 字串透過 JSON.parse() 轉換成物件。
var flash = require('connect-flash');
var passport = require('passport');
// passport使用時，還需決定要使用的stategy，在這裡用的是localstrategy
var localStrategy = require('passport-local').Strategy;
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// 透過 passport.user() 建立驗證機制
// 使用「LocalStrategy 本地驗證」時，該策略預設是到req.body中名為 username 和 password 的欄位取得帳號、密碼資訊
passport.use(new localStrategy({
		// 改以名為 email 的欄位資訊作為帳號
		usernameField: 'account',
		// 讓 varify callback 函式可以取得 req 物件
		passReqToCallback: true 
	},
	// 當請 passport 用此驗證機制驗證時，呼叫此 callback 函式驗證
	// Varify Callback: 新增 req 引數
	function (req,account, password, done) {
		connection.query("select * from members where Account ='" + account + "' ",
			function (err, user) {
				// 例如在伺服器端回傳錯誤訊息時，帶入錯誤訊息 err；
				// 無錯誤訊息時，則可以帶入null取代
				// 如果伺服器端回傳錯誤訊息，提供 passport 錯誤訊息
				if (err) {
					// 完成驗證後，呼叫 done，帶入驗證後結果
					console.log('失敗');
					return done(err);				
				}
				// 如果沒有在資料庫裡找到該位使用者，不提供 passport 任何使用者資訊
				if (!user) {
					// 驗證成功時，帶入使用者資料user；
					// 驗證失敗時，則可以帶入false取代
					console.log('沒有這個用戶');
					return done(null, false,req.flash('info', 'User not found.'));
					// { message: '沒有這個用戶' }
				}
				// 如果從資料庫找到了該名使用者，但密碼錯誤時，不提供 passport 任何使用者資訊
				//user.verifyPassword(password)不能用
				// 要和資料庫欄位名一樣
				// 回傳是json格式，還有一個{[]}
				if (user[0].Password != password) {
					console.log(user);
					console.log(user[0].Password);
					console.log('密碼錯誤');
					return done(null, false);
				}
				// 如果帳號及密碼皆正確，提供 passport 使用者資訊
				console.log('成功');
				return done(null, user);
			}
		);
	}
))

// 透過 cookie 上的 session id 至 session 中取得被序列化的用戶資訊，存放到 req.session.passport.user
passport.serializeUser(function (user, done) {
	// 只將用戶 id 序列化存到 session 中
	// console.log(user);
	// console.log(done);
	done(null, user[0].id);
});
// passport.initialize() 被觸發：確認 passport.user 上帶有被序列化的使用者物件，若物件不存在，則創建一個空物件
// passport.session() 被觸發：若有找到被序列化的使用者物件，則判定此請求的用戶是已經通過驗證的狀態

// passport.session() 呼叫 deserializeUser() 方法— 透過用戶 id 前往資料庫找到使用者完整資料，放置在 req.user 上供往後使用
passport.deserializeUser(function (id, done) {
	// 透過使用者 id 到資料庫尋找用戶完整資訊
	connection.query("select * from members where id = " + id,
		function (err,user) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
			}
			if (!err) {
				done(null, result);
			} else {
				done(err, null);
			}
		}
	);
})
// Controller
app.post('/login', passport.authenticate('local',
	{
		// successRedirect: '/',
		// 驗證失敗：使用者將被直接導向於failureRedirect所指定的路徑，且不執行下一個 middleware
		failureRedirect: '/login',
		session: false,
		failureFlash: true
	}),
	function (req, res) {
		// 驗證成功：執行下一個 middleware，且該用戶的資訊將被放到 req.body— 函式中能先執行一些額外的程式碼，才將用戶導向根路徑
		// 在這先執行一些動作 code...
		res.redirect('/home');
	});

// ----------------------------------------



var loginto = function (req, res, next) {
	console.log('驗證成功')
	next();
}

app.get('/', loginto, function (req, res) {
	// req → request
	// res → response
	res.render('layout', {
		title: '開始',
		body: '第一頁-----------'
	});
})


