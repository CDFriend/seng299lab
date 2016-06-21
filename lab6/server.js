"use strict";

var express     = require("express");
var aiInterface = require("./aiInterface.js");

var app = express();

// server static files from the public/ directory.
app.use(express.static('public'));

function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
    }

    var max = 19;
    var min = 5;

    while(state.size % 2 !== 1){
        state.size = Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    var tmp = []; 
    for(var i = 0; i < state.size; i++){
        tmp = []; 
        for(var j = 0; j < state.size; j++){
            tmp.push(0); 
        }
        state.board.push(tmp);
    }

    return state; 

}



/**
 * Handle a request for task data.
 */
app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
	
    boardState = generateBoard();
    res.json(boardState); 
});


app.post("/move", function(req, res) {
	
	console.log("POST request to: /move");
	
	aiInterface.getRandomMove(boardState.size, boardState.board, lastMove, function(move){
		
		if (!move.pass) {
			boardState.board[move.x][move.y] = move.c;
			lastMove = move;
			res.json(boardState);
		}
		else {
			console.log("AI player passed. Reset.");
			
			lastMove = LAST_DEFAULT;
			boardState = generateBoard();
			res.json(boardState);
		}
		
	});
	
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});

/*initial setup*/

var LAST_DEFAULT = {x:0, y:0, c:0, pass:false};

var boardState = generateBoard();
var lastMove = LAST_DEFAULT;