var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var NodeSession = require('node-session');
var knex = require('./db/knex.js');

var session = new NodeSession({secret: 'murtzsecretkey'});

this.server = http.createServer(function (req, res){
  session.startSession(req, res, function(){
  var bookshelf = require('bookshelf')(knex);
  var User = bookshelf.Model.extend({tableName: 'users'});


  if (req.url == "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World! Welcome ' + req.session.get('email'));
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
    res.write("Page not found");
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
