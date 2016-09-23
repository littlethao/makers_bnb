var userController = function(req,res) {


if (req.url == '/users/new' && req.method == 'GET' ) {
  if (req.session.get('id')) {
    res.writeHead(302, {Location: '/spaces'});
    res.end();
  }
  else {
    fs.readFile('./views/users/new.ejs', 'UTF-8', function(err, page){
      var html = ejs.render(page, {message: req.session.get('message')});
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(header);
      res.write(html)
      res.end();
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
      res.write(header)
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

}

module.exports = userController;
