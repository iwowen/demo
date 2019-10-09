/**
 * 初始化数据
 */
var walls = {} // {id_id: true/false}}
var nodes = {} // id: {x:0,y:0}
var unionData = {} // 并查集数据结构
init()
draw()

/**
 * size = 50px
 */
function draw() {
    canvas = document.getElementById("canvas");
    // var width = canvas.offsetWidth;
    // var height = canvas.offsetHeight;
    ctx = canvas.getContext("2d")
    ctx.save()
    ctx.strokeStyle="#4e2727";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, 800, 500);
    ctx.restore()

    /**
     * 画墙
     */
    // 获取所有为true的墙
    var isWalls = []
    Object.keys(walls).forEach(function(e) {
        if (walls[e] === true){
            isWalls.push(e)
        }
    })
    // 开始画墙
    ctx.strokeStyle="#4e2727";
    ctx.lineWidth = 2;
    isWalls.forEach(function(key){
        var wall = getWalls(key)
        ctx.moveTo(wall.x * 20, wall.y * 20);
        if (wall.type === 0) {
            ctx.lineTo(wall.x * 20 + 20, wall.y * 20);
        } else {
            ctx.lineTo(wall.x * 20, wall.y * 20 + 20);
        }
        ctx.stroke()
    })

}

/**
 * 初始化墙\节点
 */
function init() {
    var cols = 800 / 20
    var rows = 500 / 20
    var num = cols * rows
    // 初始化节点
    for (var i = 0; i < num;i ++) {
        var node = {
            x: i % cols,
            y: Math.floor(i / cols)
        }
        nodes[i] = node
    }
    // 初始化墙
    for (var i = 0; i < rows; i ++) {
        for (var k = 0; k < cols; k ++) {
            var id = i * cols + k;
            // 不是每排最后一个则有墙
            if (k !== cols - 1) {
                var key = getKeys(id, id + 1)
                walls[key] = true
            }
            if (i !== rows - 1) {
                var key = getKeys(id, id + cols)
                walls[key] = true
            }
        }
    }
    getMazeByUnion()
}

/**
 * 使用并查集进行地图绘制
 * {
 *  id: parentId
 * }
 */
function getMazeByUnion () {
    // 选中任意的一个节点, 将节点的父节点指向自己
    var cols = 800 / 20
    var rows = 500 / 20
    var num = cols * rows
    var randomId = Math.floor(Math.random() * num)
    unionData[randomId] = randomId
    // 设置墙列表
    // 选出来的墙
    wallList = []
    // 已删除的墙
    delWalls = []
    // 取第一个节点的几面墙
    selectWalls(randomId)
    var currentId = randomId
    while(wallList.length > 0) {
        var len = wallList.length
        var randomWall = wallList[Math.floor(Math.random() * len)]
    }
}

/**
 * 根据节点id获取墙列表，过滤掉已经删除掉的墙
 */
function selectWalls(id) {
    Object.keys(walls).forEach(function(e) {
        if (e.indexOf(id.toString()) !== -1 && delWalls.indexOf(e) === -1) {
            wallList.push(e)
        }
    })
}

/**
 * 将两id墙转化为key
 */
function getKeys(id1, id2) {
    if (id1 < id2) {
        return id1 + '_' + id2
    } else if (id1 > id2) {
        return id2 + '_' + id1
    }
}

/**
 * 根据walls的key获取墙的位置和画法
 * {x: 0, y: 0, type: 0} type==0为横
 */
function getWalls(key) {
    var id1 = key.split('_')[0]
    var id2 = key.split('_')[1]
    var item = {
        x : nodes[id2].x,
        y: nodes[id2].y
    }
    if (parseInt(id1) === parseInt(id2) - 1 ) {
        item.type = 1
    } else {
        item.type = 0
    }
    return item
}