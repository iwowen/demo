/**
 * size = 50px
 */
function draw() {
    canvas = document.getElementById("canvas");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    ctx = canvas.getContext("2d")
    ctx.strokeStyle="#4e2727";
    ctx.lineWidth = 10;
    ctx.strokeRect(0,0,800,500);
}
draw()

/**
 * 初始化墙
 */
function initWall() {
    
}