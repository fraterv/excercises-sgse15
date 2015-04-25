let context = document.getElementById('puzzle').getContext('2d');

let img = new Image();
img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', doDrawTiles, false);

let boardSize = document.getElementById('puzzle').width;
let tileCount = document.getElementById('scale').value;

let tileSize = boardSize / tileCount;

let clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

let emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

let solved = false;

class Board {
    constructor(tileCount = 16) {
	this.tileCount = tileCount;
	this.boardParts = new Array(this.tileCount);
	for (let i = 0; i < this.tileCount; ++i) {
	    boardParts[i] = new Array(this.tileCount);
	    for (let j = 0; j < this.tileCount; ++j) {
		this.boardParts[i][j] = new Object;
		this.boardParts[i][j].x = (this.tileCount - 1) - i;
		this.boardParts[i][j].y = (this.tileCount - 1) - j;
	    }
	}
	this.emptyLoc.x = this.boardParts[tileCount - 1][tileCount - 1].x;
	this.emptyLoc.y = this.boardParts[tileCount - 1][tileCount - 1].y;
	this.solved = false;
    }


    slideTile(toLoc, fromLoc) {
	if (!this.solved) {
	    this.boardParts[toLoc.x][toLoc.y].x = this.boardParts[fromLoc.x][fromLoc.y].x;
	    this.boardParts[toLoc.x][toLoc.y].y = this.boardParts[fromLoc.x][fromLoc.y].y;
	    this.boardParts[fromLoc.x][fromLoc.y].x = this.tileCount - 1;
	    this.boardParts[fromLoc.x][fromLoc.y].y = this.tileCount - 1;
	    toLoc.x = fromLoc.x;
	    toLoc.y = fromLoc.y;
	    this.checkSolved();
	}
    }

    checkSolved() {
	let flag = true;
	for (let i = 0; i < this.tileCount; ++i) {
	    for (let j = 0; j < this.tileCount; ++j) {
		if (this.boardParts[i][j].x != i || this.boardParts[i][j].y != j) {
		    flag = false;
		}
	    }
	}
	this.solved = flag;
    }

    part(index0, index1) {
	return boardParts[index0][index1];
    }

    tiles() {
	return this.tileCount;
    }
}

class BoardViewer {

    constructor(context, board, size) {
	this.context = context;
	this.boardSize = size;
	this.board = board;
    }

    draw() {
	this.context.clearRect ( 0, 0, this.boardSize , this.boardSize );
	const tiles = this.board.tiles();
	for (let i = 0; i < tiles; ++i) {
	    for (let j = 0; j < tiles; ++j) {
		let x = this.board.part(i, j).x;
		let y = this.board.part(i, j).y;
		if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
		    this.context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
					   i * tileSize, j * tileSize, tileSize, tileSize);
		}
	    }
	}
    }
}

let board = Board(tileCount);
//setBoard(tileCount);
let boardViewer = BoardViewer(context, board, boardSize);

function doDrawTiles() {
    boardViewer.draw();
}

document.getElementById('scale').onchange = function() {
  tileCount = this.value;
  tileSize = boardSize / tileCount;
  setBoard();
  drawTiles();
};

document.getElementById('puzzle').onclick = function(e) {
    const distance = (x1, y1, x2, y2) => {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
	board.slideTile(emptyLoc, clickLoc);
	drawTiles();
    }
    if (solved) {
	setTimeout(function() {alert("You solved it!");}, 500);
    }
};

