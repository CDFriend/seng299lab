var http = require('http');

function getRandomMove(size, board, lastMove, cb) {

	// construct JSON object
	var inputData = {
		size : size, 
		board: board, 
		last : lastMove
	};
	
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
		
		var responseData = '';
		
		response.on('data', function(chunk) {
			responseData += chunk.toString();
		});
		
		response.on('end', function() {
			
			if (responseData === "Invalid request format.") {
				console.log("Server failed to parse JSON: ");
				console.log(inputData);
				return;
			}
			
			cb(JSON.parse(responseData));
		});
		
	});
	
	req.write(JSON.stringify(inputData));
	
	req.end();

}

module.exports = {
	getRandomMove : getRandomMove
}