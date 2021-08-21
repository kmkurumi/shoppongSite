//  1. 載入Node.js原生模組
//http：
const http = require("http");
//操作實體檔案，可以同步或非同步存取檔案系統操作
const fs = require("fs");
//網址後?為填入參數
const qs = require("querystring");

const port = 3000;
const host = "127.0.0.1";

//回傳


// 2. 建立server
const server = http.createServer((request, response) => {
    // 在此處理 客戶端向 http server 發送過來的 req
    const method = request.method;
    let url = request.url;
    if (url == "/register") {
        console.log("url:" + url + " method:" + method);
    
  }


})


// 為server物件，呼叫 listen()
//會在createServer()執行時，讓你決定要監聽哪一個port，並且開始監聽任何進來的requests




// const sendResponse = (filename, statusCode, response) => {
//   fs.readFile(`./html/${filename}`, (error, data) => {
//     if (error) {
//       response.statusCode = 500;
//       response.setHeader("Content-Type", "text/plain");
//       response.end("Sorry, internal error");
//     } else {
//       response.statusCode = statusCode;
//       response.setHeader("Content-Type", "text/html");
//       response.end(data);
//     }
//   });
// };

// const server = http.createServer((request, response) => {
//   const method = request.method;
//   let url = request.url;

//   if (method === "GET") {
//     const requestUrl = new URL(url, `http://${ip}:${port}`);
//     url = requestUrl.pathname;
//     const lang = requestUrl.searchParams.get("lang");
//     let selector;

//     if (lang === null || lang === "en") {
//       selector = "";
//     } else if (lang === "zh") {
//       selector = "-zh";
//     } else {
//       selector = "";
//     }

//     if (url === "/") {
//       sendResponse(`index${selector}.html`, 200, response);
//     } else if (url === "/about.html") {
//       sendResponse(`about${selector}.html`, 200, response);
//     } else {
//       sendResponse(`404${selector}.html`, 404, response);
//     }
//   } else {

//   }
// });

// server.listen(port, ip, () => {
//   console.log(`Server is running at http://${ip}:${port}`);
// });
