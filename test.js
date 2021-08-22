var eat = true;

var p = new Promise(function(reslove, reject) {
    if(eat) {
        console.log("yes");
        reslove();       
    }else {
        console.log("no");
        reject();
    }
});

var 