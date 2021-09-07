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
//var connection = mysql.createConnection...
module.exports = connection;