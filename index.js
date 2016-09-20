var http = require('http');

var server = http.createServer(function(req, res){

  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World!</h1>');
    res.end();
  }

});

server.listen(8000);
console.log("Server running at port 8000");
