require('./requires.js')();
var userController = require('./usersController.js');
var spacesController = require('./spacesController.js');

var root = function(req, res){

    if (req.url == "/" && req.method == 'GET') {
      fs.readFile('./views/home.ejs', {encoding: 'utf8'}, function(err, page){
          var html = ejs.render(page, {message: req.session.get('message')});
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
      });
    }

    userController(req, res);
    spacesController(req, res);

    if (!res) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('Page not found');
      res.end();
      }

};

module.exports = root;
