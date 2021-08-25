//載入express模組
var express = require('express');
var router = express.Router();

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


// 上傳資料
// 到這裡看資料庫
router.get("/", function (req, res) {
	connection.query('select Id,Name,Phone,Email from members',
		function (err, rows) {
			if (err) {
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
router.get('/commodity', function (req, res) {
	var query = req.query;
	res.send(query).end();
})

// 傳商品資料到資料庫
router.post('/commodity', function (req, res) {
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
router.post("/register", function (req, res) {
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

router.post("/login", function (req, res) {
	// 用body需要傳請求
	// var account = req.body.Account;
	// var passsword = req.body.Passsword;
	var account = req.body.account;
	var password = req.body.password;
	// res.send(req[0]);
	res.send(`<h3>login success.</h3> <p>Account：${account}</p> <p>Passsword：${password}</p>`);
})

module.exports = router;
