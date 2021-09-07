// const login = (user) => {
    
// }

var log = {
    info: function (info) {
        console.log('Info: ' + info);
    },
    warning:function (warning) {
        console.log('Warning: ' + warning);
    },
    error:function (error) {
        console.log('Error: ' + error);
    }
};
// 分派了這個物件給 module.exports，就是宣告，這個登入物件，
// 是一個modules，可以讓任何程式使用require調用這個模組，使用裡面的物件，方法及變數…。
module.exports = log;