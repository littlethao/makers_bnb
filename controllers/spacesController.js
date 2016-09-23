var spacesController = function(req, res) {
if (req.url == "/spaces/new" && req.method == "GET") {
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
}

module.exports = spacesController;
