//載入express模組
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    console.log("success");
	res.send(req);
})
//登入驗證成功
router.get('/success', function (req, res) {
    console.log("success");
	res.send(req);
})
//登入驗證失敗
router.get('/fail', function (req, res) {
    console.log("fail");
	res.send(req);
})

module.exports = router;