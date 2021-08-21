// 驗證碼 
// https://www.twblogs.net/a/5b8131df2b71772165ab81b8
/**生成一個隨機數**/
function randomNum(min,max){
    return Math.floor( Math.random()*(max-min)+min);
}
/**生成一個隨機色**/
function randomColor(min,max){
    var r = randomNum(min,max);
    var g = randomNum(min,max);
    var b = randomNum(min,max);
    return "rgb("+r+","+g+","+b+")";
}
drawPic();
document.getElementById("changeImg").onclick = function(e){
    e.preventDefault();
    drawPic();
}

/**繪製驗證碼圖片**/
function drawPic(){
    var canvas=document.getElementById("canvas");
    var width=canvas.width;
    var height=canvas.height;
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';

    /**繪製背景色**/
    ctx.fillStyle = randomColor(180,240); //顏色若太深可能導致看不清
    ctx.fillRect(0,0,width,height);
    /**繪製文字**/
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    for(var i=0; i<4; i++){
    var txt = str[randomNum(0,str.length)];
    ctx.fillStyle = randomColor(50,160);  //隨機生成字體顏色
    ctx.font = randomNum(15,40)+'px SimHei'; //隨機生成字體大小
    var x = 10+i*25;
    var y = randomNum(25,45);
    var deg = randomNum(-45, 45);
    //修改座標原點和旋轉角度
    ctx.translate(x,y);
    ctx.rotate(deg*Math.PI/180);
    ctx.fillText(txt, 0,0);
    //恢復座標原點和旋轉角度
    ctx.rotate(-deg*Math.PI/180);
    ctx.translate(-x,-y);
    }
    /**繪製干擾線**/
    for(var i=0; i<8; i++){
    ctx.strokeStyle = randomColor(40,180);
    ctx.beginPath();
    ctx.moveTo( randomNum(0,width), randomNum(0,height) );
    ctx.lineTo( randomNum(0,width), randomNum(0,height) );
    ctx.stroke();
    }
    /**繪製干擾點**/
    for(var i=0; i<100; i++){
    ctx.fillStyle = randomColor(0,255);
    ctx.beginPath();
    ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
    ctx.fill();
    }
}
