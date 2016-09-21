var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var knex = require('./db/knex.js');
var bookshelf = require('./db/database.js');
var NodeSession = require('node-session');
var User = require('./models/user.js');
var Space = require('./models/space.js');

var session = new NodeSession({secret: 'murtzsecretkey'});

this.server = http.createServer(function (req, res){
  session.startSession(req, res, function(){


  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World! Welcome ' + req.session.get('email'));
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
          User.forge({email: params.email, password: params.password}).save().then(function(user){
              req.session.put('id', user.toJSON().id);
              req.session.flash('email', user.toJSON().email);
              res.writeHead(302, {Location: '/'});
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
});


exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};
