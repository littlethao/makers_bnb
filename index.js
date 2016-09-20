var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res){

  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World!</h1>');
    res.end();
  }

  else if (req.url == '/users/new') {
    fs.readFile('./public/users/new.html', 'UTF-8', function(err, html){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);  
    });

  }

  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write("Page not found");
    res.end();
  }
});

server.listen(8000);
console.log("Server running at port 8000");
