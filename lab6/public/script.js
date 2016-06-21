
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        if (textStatus !== 'success') {
			alert("Failed to retrieve board data.");
		}

        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas"); 
	
	var BOARD_COLOR = "#E2A76F";
	var WHITE = "#FFFFFF";
	var BLACK = "#000000";

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 500, H = 500; 
    canvas.css("height", H); 
    canvas.css("width", W); 

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));
	
	var squareWidth = W/state.size;
	var squareHeight = H/state.size;
	
	for (var y = 0; y < state.size; y++) {
		for (var x = 0; x < state.size; x++) {
			
			xPos = x * (W/state.size);
			yPos = y * (H/state.size);
			
			//board background
			svg.append(makeRectangle(xPos, yPos, squareWidth, squareHeight, BOARD_COLOR));
			
			//piece, if applicable
			if (state.board[x][y] == 1) {
				svg.append(makeCircle(xPos + (squareWidth/2), yPos + (squareWidth/2), squareWidth/2, WHITE));
			}
			else if (state.board[x][y] == 2) {
				svg.append(makeCircle(xPos + (squareWidth/2), yPos + (squareWidth/2), squareWidth/2, BLACK));
			}
			
		}
	}
	
	//draw lines
	for (var y = 0; y < H; y += squareHeight) {
		svg.append(makeLine(0, y, W, y));
	}
	for (var x = 0; x < W; x += squareWidth) {
		svg.append(makeLine(x, 0, x, H));
	}

    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
