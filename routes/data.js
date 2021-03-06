//載入express模組
var express = require('express');
// const { connection } = require('mongoose');
var router = express.Router();
// const db = require('../models');

// const MemberController = require('../controllers/members_controller');
// memberController = new MemberController();
// const connection = require('../models/connection_db');
// 上傳資料
// 到這裡看資料庫
router.get("/", function (req, res) {
	connection.query('select Id,Name,Account,Password from members',
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
			req.body.name
		], function (err, results) {
			if (err) {
				console.log(JSON.stringify(err));
				console.log("error can not insert");
				console.log(req.body.name);
			} else {
				if (results.lenght > 0) {
					//傳回Json陣列	
					res.send(JSON.stringify(results));
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
		], function (err, results) {
			if (err) {
				console.log(JSON.stringify(err));
				console.log("\nerror can not insert");
			} else {
				if (results.lenght > 0) {
					//傳回Json陣列	
					res.send(JSON.stringify(results));
					console.log("\nsuccess insert1.");
				}
			}
		}
	);
	res.send(req.body);
	console.log("\nsuccess insert2.");
	console.log("ok");
	// res.redirect('/home');
})

router.post("/product", function (req, res) {
	res.send(req.body);
})
// insert into commodities set Name = 'food1',Price= 10
router.get("/product", function (req, res) {
	connection.query(
		'select Id,Name,Price from commodities', '',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			//傳回Json陣列
			res.send(JSON.stringify(rows));	
		}
	);
})

router.post("/login", function (req, res) {
	// 用body需要傳請求
	var account = req.body.account;
	var password = req.body.password;
	var user = {"Account":account,"Password": password};
	// connection.query("select Id,Account,Password from members",
	// 	function (err, results) {
	// 		if (err) {
	// 			console.log(JSON.stringify(err));
	// 			console.log(JSON.stringify(results));
	// 		} else {
	// 			if (results.Account == user.Account && results.Password == user.Password) {
	// 				console.log("帳密正確");
	// 			}
	// 			console.log("帳密不正確");
	// 		}
	// 		res.send(JSON.stringify(results));
	// 	});
	// 	console.log(user);
	res.send(`<h3>login success.</h3> <p>Account：${account}</p> <p>Password：${password}`);
})

module.exports = router;
