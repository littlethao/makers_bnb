require('./modules.js')();
var userController = require('./userController.js');
var spacesController = require('./spacesController.js');
var requestsController = require('./requestsController.js');

var session = new NodeSession({secret: 'murtzsecretkey'});

var root_controller = function(req, res) {
  session.startSession(req, res, function(){
    fs.readFile('./views/_header.ejs',  {encoding: 'utf8'}, function(err, headerEJS){
    header = ejs.render(headerEJS, {message: req.session.get('message'), user: req.session.get('id')});

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
    // else {
    //   res.writeHead(404, {'Content-Type': 'text/html'});
    //   res.write('Page not found');
    //   res.end();
    //   }

      userController(req, res);
      spacesController(req, res);
      requestsController(req, res);

    });
  });
};

module.exports = root_controller;
