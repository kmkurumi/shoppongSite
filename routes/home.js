//載入express模組
var express = require('express');
var router = express.Router();
//首頁
router.get('/', function (req, res) {
	res.render('homepage', { 'title': '團購網首頁' });
	// console.log("success render home.")
})
//團長註冊
router.get('/register', function (req, res) {
	res.render('register', {'title': '註冊'});
})
//團長上架商品
router.get('/tanstart', function (req, res) {
	res.render('tanstart', { 'title': '上架商品' });
})
//團長商品管理
router.get('/tansetting', function (req, res) {
	res.render('tansetting', { 'title': '商品管理' });
})
//商品
router.get('/commodity', function (req, res) {
	res.render('commodity', { 'title': '商品列表' });
})
//購物車
router.get('/shoppingcart', function (req, res) {
	res.render('shoppingcart', { 'title': '購物車' });
})
//商品欄位
router.get('/mycart', function (req, res) {
	res.render('mycart', { 'title': '商品欄位' });
})

//商品欄位
router.get('/search', function (req, res) {
	res.render('search', { 'title': '查詢' });
})
module.exports = router;