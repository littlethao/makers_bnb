var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var knex = require('./db/knex.js');
var bookshelf = require('bookshelf')(knex);

var server = http.createServer(function(req, res){
  var Space = bookshelf.Model.extend({tableName: 'spaces'});

  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World!</h1>');
    res.end();
  }

  else if (req.url == "/spaces/new" && req.method == "GET") {
    fs.readFile('./views/spaces/spaces.html', function(err, page){
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
      new Space({title: post.title, description: post.description, price: post.price}).save();
      res.writeHead(302, {Location: "/spaces"});
      res.end();
    });

  }

  else if (req.url == "/spaces" && req.method == "GET" ) {
    fs.readFile('./views/spaces/viewspaces.ejs',{encoding: "utf8"}, function(err, page){
      res.writeHead(200, {'Content-Type': 'text/html'});
      Space.fetchAll().then(function(spaces){
        var html = ejs.render(page, {spaces: spaces.toJSON()});
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
