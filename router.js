let express = require('express');
  //載入express模組
let app = express();
  // 使用express

let engine = require('ejs-locals');

//使用 public 資料夾，並成功引入裡面的bootstrap、css、js
app.use("/public",express.static(__dirname +"/public"));

//設定port位置
let port = 3000;
// 監聽 port
app.listen(port);
  
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//直接做出網頁
// app.get('/', function (req, res) {
//   res.send(`<p>Hello World</p>`)
// })
//
// app.get('/', function (req, res) {
//   res.render('index', {'title': '首頁'});
// })

app.get('/home', function (req, res) {
  res.render('layout', { 'body': '首頁' ,'title':'團購網首頁' });
})

app.get('/home/register', function (req, res) {
  res.render('register', {
    'title': '註冊'
    // ,' script':'<script src="./js/garbageGenerator.js"></script>'
  });
})

app.get('/home/tanstart', function (req, res) {
  res.render('tanstart', {'title':'上架商品' });
})