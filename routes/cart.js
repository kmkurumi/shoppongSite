var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render('cart', { 'title': '購物車' });
	// console.log("success render home.")
})



module.exports = router;