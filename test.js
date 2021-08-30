//測試
// var eat = true;
// var p = new Promise(function(reslove, reject) {
//     if(eat) {
//         console.log("yes");
//         reslove();       
//     }else {
//         console.log("no");
//         reject();
//     }
// });
//------------------------------------------------
//測試登入帳號密碼是否在資料庫
var a = [
    {Account: "kevin123",Password: "123456"},{Account: "andy123",Password: "123456"}];
var task = false;
a.forEach(i =>
{
    if (i.Account == "kevin123" && i.Password =="123456")
    {
        task = true;
        console.log("true");
    } else {
        console.log("flse");
    } 
})
console.log(task);
//------------------------------------------------