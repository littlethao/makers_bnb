var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var knex = require('./db/knex.js');
var bookshelf = require('./db/database.js');
var NodeSession = require('node-session');
var User = require('./models/user.js');
var Space = require('./models/space.js');
var bcrypt = require('bcrypt');

var session = new NodeSession({secret: 'murtzsecretkey'});

this.server = http.createServer(function (req, res){
  session.startSession(req, res, function(){


  if (req.url == "/" && req.method == 'GET') {
    fs.readFile('./views/home.ejs', {encoding: 'utf8'}, function(err, page){
        var html = ejs.render(page, {message: req.session.get('message')});
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
    });
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
      Space.forge({title: post.title, description: post.description, price: post.price, date: post.date, user_id: req.session.get('id')}).save();
      res.writeHead(302, {Location: "/spaces"});
      res.end();
    });

  }

  else if (req.url == "/spaces" && req.method == "GET" ) {
    fs.readFile('./views/spaces/viewspaces.ejs',{encoding: "utf8"}, function(err, page){
      res.writeHead(200, {'Content-Type': 'text/html'});
      Space.fetchAll({
          withRelated: 'users'
      }).then(function(spaces){
        var html = ejs.render(page, {spaces: spaces.toJSON(), message: req.session.get('message')});
        res.write(html);
        res.end();
      });
    });
  }

  else if (req.url == '/users/new' && req.method == 'GET' && !req.session.get('id')) {


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
          bcrypt.hash(params.password, 10, function(err, hash){
            User.forge({email: params.email, password: hash}).save().then(function(user){
                req.session.put('id', user.toJSON().id);
                req.session.flash('message', 'Welcome ' + user.toJSON().email);
                res.writeHead(302, {Location: '/spaces'});
                res.end();
            });
          });
        });
  }

  else if (req.url == '/users/login' && req.method == 'GET' && !req.session.get('id')) {
    fs.readFile('./views/users/login.ejs', 'UTF-8', function(err, page){
      var html = ejs.render(page, {message: req.session.get('message')});
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    });
  }

  else if (req.url == '/users/login' && req.method == 'POST') {

    var body = '';
    req.on('data', function(data){
      body += data;
    });

      req.on('end', function(){
          var params = qs.parse(body);
          User.where({email: params.email}).fetch().then(function(user){

            if (user && bcrypt.compareSync(params.password, user.toJSON().password)) {
              req.session.put('id', user.toJSON().id);
              req.session.flash('message', 'Successfuly logged in');
              res.writeHead(302, {Location: '/spaces'});
              res.end();
            }
            else {
              req.session.flash('message', 'Incorrect email or password');
              res.writeHead(302, {Location: '/users/login'});
              res.end();
            }
          });
      });
  }

  else if (req.url == '/users/logout' && req.method == 'GET') {
    req.session.forget('id');
    req.session.flash('message', "See you again soon");
    res.writeHead(302, {Location: '/'});
    res.end();
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
