// 以 Express 建立 Web 伺服器
var express = require("express");
// var exphbs = require('express-handlebars');
var engine = require('ejs-locals');

var app = express();

// setting template engine
//範本檔所在的目錄
app.engine('ejs', engine)
//要使用的範本引擎
app.set('view engine', 'ejs')

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

//使用bootstrap並放於public
//用虛擬路徑lib來取代'node_modules'
// app.use("/lib",express.static(path.join(__dirname, 'node_modules')));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
// Embedded Javascript」，顧名思義就是內嵌式的樣板引擎，可以將邏輯與內容直接嵌入到 HTML 頁面上
// view engine 我們宣告為 ejs，而 view engine 的樣板不只有 ejs，還有 hbs、hjs、jade、pug、twig、vash
// 如果你是使用 Express 應用程式產生器(express - generator)設置工作環境的話，預設的 view engine 將為 jade
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(80);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");


//連線異常報錯
connection.connect(function(err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

