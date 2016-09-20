var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var NodeSession = require('node-session');
var knex = require('./db/knex.js');

var server = http.createServer(function (req, res){
  var bookshelf = require('bookshelf')(knex);
  var User = bookshelf.Model.extend({tableName: 'users'});

  session = new NodeSession({secret: 'murtzsecretkey'});

  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World! Welcome rosie@allott.com');
    res.end();
  }

  else if (req.url == '/users/new' && req.method == 'GET') {
    fs.readFile('./views/users/new.html', 'UTF-8', function(err, html){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    });

  }

  else if (req.url == '/users/new' && req.method == 'POST') {
    var body = '';
    req.on('data', function(data){
      body += data;
    });

      req.on('end', function(){
        var params = qs.parse(body);
        new User({email: params.email, password: params.password}).save();
        res.writeHead(302, {Location: '/'});
        res.end();
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
