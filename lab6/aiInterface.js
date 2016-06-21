var http = require('http');

function getRandomMove(size, board, lastMove, cb) {

	// construct JSON object
	var inputData = {
		size : size, 
		board: board, 
		last : lastMove
	};
	
	console.log(inputData);
	
	// create post request
	var options = {
		host : "roberts.seng.uvic.ca", 
		path : "/ai/random", 
		port : "30000", 
		method : "POST",
		headers : {
			"content-type" : "application/json"
		}
	};
	var req = http.request(options, function(response) {
		
		console.log("Server response: ")
		var responseData = '';
		
		response.on('data', function(chunk) {
			console.log(chunk.toString());
			responseData += chunk.toString();
		});
		
		response.on('end', function() {
			console.log("Response ended.");
			cb(JSON.parse(responseData));
		});
		
	});
	
	req.write(JSON.stringify(inputData));
	
	req.end();

}

module.exports = {
	getRandomMove : getRandomMove
}