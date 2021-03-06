var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var knex = require('./db/knex.js');
var bookshelf = require('./db/database.js');
var NodeSession = require('node-session');
var User = require('./models/user.js');
var Request = require('./models/request.js');
var Space = require('./models/space.js');
var bcrypt = require('bcrypt');
var url = require('url');
var validator = require('validator');

var session = new NodeSession({secret: 'murtzsecretkey'});

this.server = http.createServer(function (req, res){
  session.startSession(req, res, function(){
    fs.readFile('./views/_header.ejs',  {encoding: 'utf8'}, function(err, headerEJS){
    var header = ejs.render(headerEJS, {message: req.session.get('message'), user: req.session.get('id')});
    var url_request_id = url.parse(req.url).pathname;
    url_request_id = url_request_id.split('/');
    url_request_id = url_request_id.slice(-1)[0];

    if(req.url == "/public/style.css") {
      fs.readFile('./public/style.css', {encoding: 'utf8'}, function(err, page){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(page);
        res.end();
      });
    }

    else if (req.url == "/" && req.method == 'GET') {
      fs.readFile('./views/home.ejs', {encoding: 'utf8'}, function(err, page){
          var html = ejs.render(page, {message: req.session.get('message')});
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(header);
      res.write(html);
      res.end();
      });
    }

    else if (req.url == "/spaces/new" && req.method == "GET") {
      fs.readFile('./views/spaces/new.ejs', function(err, page){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(header);
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
        Space.forge({title: post.title, description: post.description, price: post.price, date: post.date, user_id: req.session.get('id')}).save().then(function(){
          req.session.flash('message', 'Your space has been listed');
          res.writeHead(302, {Location: "/spaces"});
          res.end();
        });
      });
    }

    else if (req.url == "/spaces" && req.method == "GET" ) {
      fs.readFile('./views/spaces/viewspaces.ejs',{encoding: "utf8"}, function(err, page){
        res.writeHead(200, {'Content-Type': 'text/html'});
        Space.fetchAll({
            withRelated: 'users'
        }).then(function(spaces){
          var html = ejs.render(page, {spaces: spaces.toJSON(), message: req.session.get('message'), user: req.session.get('id')});
          res.write(header);
          res.write(html);
          res.end();
        });
      });
    }

    else if (req.url == "/spaces/request/"+url_request_id && req.method == "GET") {
      var spaces = Space.where("id", url_request_id).fetchAll({
        withRelated: 'users'
      }).then(function(spaces){
        Request.forge({hirer_id: req.session.get('id'), space_id: spaces.toJSON()[0]['id'], owner_id: spaces.toJSON()[0]['user_id'], date: spaces.toJSON()[0]['date']}).save().then(function(){
          req.session.flash('message', 'Request sent :-)');
          res.writeHead(302, {Location: '/requests'});
          res.end();
        });
      });
    }

    else if (req.url == "/requests" && req.method == "GET") {
      fs.readFile('./views/requests/requests.ejs', {encoding: 'utf8'}, function(err, page){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var requests = Request.where("hirer_id", req.session.get('id')).fetchAll({withRelated: ['users', 'spaces']})
        .then(function(requests){
          var html = ejs.render(page, {requests: requests.toJSON(), message: req.session.get('message')});
          res.write(header);
          res.write(html);
          res.end();
        });
      });
    }

    else if (req.url == '/users/new' && req.method == 'GET' ) {
      fs.readFile('./views/users/new.ejs', 'UTF-8', function(err, html){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(header);
        res.write(html);
        res.end();
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
        res.write(header);
        res.write(html);
        res.end();
      });
    }

  else if (req.url == '/users/new' && req.method == 'GET' ) {
    if (req.session.get('id')) {
      res.writeHead(302, {Location: '/spaces'});
      res.end();
    }
    else {
      fs.readFile('./views/users/new.ejs', 'UTF-8', function(err, page){
        var html = ejs.render(page, {message: req.session.get('message')});
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      });
    }
  }

  else if (req.url == '/users/new' && req.method == 'POST') {
    var body = '';
    req.on('data', function(data){
      body += data;
    });
    req.on('end', function(){
      var params = qs.parse(body);
          bcrypt.hash(params.password, 10, function(err, hash){
            User.forge({
              email: params.email,
              password: hash
            }).save().then(function(user){
              req.session.put('id', user.toJSON().id);
              req.session.flash('message', 'Welcome ' + user.toJSON().email);
              res.writeHead(302, {Location: '/spaces'});
              res.end();
            }, function(errors) {
              req.session.flash('message', errors.message);
              res.writeHead(302, {Location: '/users/new'});
              res.end();
            }
            );
          });
        });
      }

  else if (req.url == '/users/login' && req.method == 'GET') {
    if (!req.session.get('id')) {
      fs.readFile('./views/users/login.ejs', 'UTF-8', function(err, page){
        var html = ejs.render(page, {message: req.session.get('message')});
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
      });
    }
    else {
      req.session.flash('message', 'Welcome back');
      res.writeHead(302, {Location: '/spaces'});
      res.end();
    }
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
          req.session.flash('message', 'Successfully logged in');
          res.writeHead(302, {Location: '/spaces'});
          res.end();
          }
        });
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
});

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};
