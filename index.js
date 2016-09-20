var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');

var server = http.createServer(function(req, res){

  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World!</h1>');
    res.end();
  }

  else if (req.url == "/spaces") {
    fs.readFile('./views/spaces.html', function(err, page){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(page);
      res.end();
    });
  }

  else if (req.url == "/spaces/new" && req.method == 'POST') {
    var body = "";
    req.on('data', function(data){
      body+= data;
    });

    req.on('end', function() {
      var post = qs.parse(body);
      fs.readFile('./views/viewspaces.ejs',{encoding: "utf8"}, function(err, page){
        res.writeHead(201, {'Content-Type': 'text/html'});
        var html = ejs.render(page, {spaces: post});
        res.write(html);
        res.end();
      });
    });

  }

  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('Page not found');
    res.end();
  }
});

server.listen(8000);
console.log("Server running at port 8000");
