//Node.js Webserver
var httpServer = require("http"),
path = require("path"),  
url = require("url"), 
fileReader = require("fs");
var debugMode = false;
var contentTypes = {
	'.txt': 'text/plain',
    '.html': 'text/html',
    '.css': "text/css",
    '.js': 'application/javascript',
    '.png' : 'image/png',
    //font types Content Type 
    '.woff': 'font/woff',
    '.ttf' : 'font/ttf',
    '.eot' : 'font/eot',
    '.mp4' : 'video/mp4',
    '.avi' : 'video/x-msvideo'
};
//default
var serverConfig = {
	'port': '81',
	'path': '..\\htdocs'
};

var main = function(){
	//console.log(serverConfig);
    httpServer.createServer(function (request,response) {	
	var requestPath = url.parse(request.url).pathname;
	if(requestPath === '/'){
		requestPath += 'index.html';
	}
    var fullPath = path.join(serverConfig.path,requestPath);
	fileReader.readFile(fullPath, "binary", function (err, file){
		if (err) {
			response.writeHeader(500, {"Content-Type": "text/plain"});    
            response.write(err + "\n");    
            response.end();
		} else {
			var contentType = contentTypes[path.extname(fullPath)];
			response.writeHead(200 , {'Content-Type': contentType}); // HTTP "OK" Response
			response.write(file, "binary");
			response.end();
		}
	});
	if(debugMode){
		console.log("Remote connection from: " + request.connection.remoteAddress +" requesting file "+fullPath);
	}
	}).listen(serverConfig.port);
	console.log("Node Webserver running at port", serverConfig.port)
}

if (require.main === module) {
	var input = process.argv;
	for(i = 2, length = input.length; i < length; i++){
		if(input[i] === '-f'){
			var fileInfo = fileReader.readFileSync(input[i+1], 'utf8');
			serverConfig = JSON.parse(fileInfo);
		}
		if(input[i] === '-p'){
			serverConfig.port = input[i+1];
		}
		if(input[i] === '-d'){
			serverConfig.path = input[i+1];
		}
		if(input[i] === '-debug'){
			debugMode = true;
		}
	}
    main();
}

//Catch Server Error
process.on('uncaughtException', function(err){
   console.log('Was founded an error! Do you have any service running at port '+ serverConfig.port + '?');
   console.log('Node Webserver usage : node webserver.js -d <WebServer Directory> -p <Port> -debug');
   console.log('                  or   node webserver.js -f <Configuration File>');
   console.log(err);
})