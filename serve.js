// 以 Express 建立 Web 伺服器
var express = require("express");
var exphbs = require('express-handlebars');
// var ejs = require("ejs");
var path = require("path");
var pug = require("pug");

var app = express();

// setting template engine
//範本檔所在的目錄
// app.engine('handlebars', exphbs('defaultLayout: main'))
//要使用的範本引擎
// app.set('view engine', 'handlebars')

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

//使用bootstrap並放於public
//用虛擬路徑lib來取代'node_modules'
// __dirname目前路徑
// app.use("/lib",express.static(path.join(__dirname, 'node_modules')));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
// Embedded Javascript」，內嵌式的樣板引擎，將邏輯與內容直接嵌入到 HTML 頁面上
// view engine 我們宣告為 ejs，而 view engine 的樣板不只有 ejs，還有 pug
// 如果你是使用 Express 應用程式產生器(express - generator)設置工作環境的話，預設的 view engine 將為 jade
// __dirname 是node.js關鍵字，代表著目前 sdserver.js所在的‵實體目錄‵喔！__dirname 是node.js關鍵字，代表著目前 sdserver.js所在的‵實體目錄‵喔！

//設置渲染引擎
app.set('view engine', 'pug');
//利用檢視引擎...進行試圖匹配
// app.engine('html', pug.render);

app.set('views', path.join(__dirname, './views'));

const router = express.Router();

// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(80);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// 建立資料庫連線
// var mysql = require('mysql');
// var connection = mysql.createConnection({
// 	host : '127.0.0.1',
// 	user : 'root',
// 	password : 'root',
// 	port:'3307',
// 	database : 'shoppingSite'
// });
// //連線異常報錯
// connection.connect(function(err) {
// 	// if (err) throw err;
// 	if (err) {
// 		console.log(JSON.stringify(err));
// 		return;
// 	}
// });

// 依 HTTP 的 Method (POST/GET/PUT/DELETE) 進行增查修刪
//callback函式
//app.method(url,callback)



//轉到登入頁面
app.get("/", function (req,res) {
	res.render("home");
})
module.exports = router;
// app.get("/login", function (req,res) {
// 	res.render(view, (err,html) => {
		
// 	})

// })

// //轉到註冊頁面
// app.get("/register", function (req,res) {
// 	res.render(view, (err,html) => {
		
// 	})

// })