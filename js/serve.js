//使用需要套件
const http = require("http");
//操作實體檔案，可以同步或非同步存取檔案系統操作
const fs = require("fs");
//網址後?為填入參數
const qs = require("querystring");

const port = 3000;
const host = "127.0.0.1";

//回傳



const server = http.createServer((request, response) => {
    let url = request.url;

    if () {
        
    }
})











const sendResponse = (filename, statusCode, response) => {
  fs.readFile(`./html/${filename}`, (error, data) => {
    if (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Sorry, internal error");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  const method = request.method;
  let url = request.url;

  if (method === "GET") {
    const requestUrl = new URL(url, `http://${ip}:${port}`);
    url = requestUrl.pathname;
    const lang = requestUrl.searchParams.get("lang");
    let selector;

    if (lang === null || lang === "en") {
      selector = "";
    } else if (lang === "zh") {
      selector = "-zh";
    } else {
      selector = "";
    }

    if (url === "/") {
      sendResponse(`index${selector}.html`, 200, response);
    } else if (url === "/about.html") {
      sendResponse(`about${selector}.html`, 200, response);
    } else {
      sendResponse(`404${selector}.html`, 404, response);
    }
  } else {

  }
});

server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
