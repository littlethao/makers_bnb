var root = require('./controllers/rootController.js');
var session = new NodeSession({secret: 'murtzsecretkey'});

this.server = http.createServer(function (req, res){
  session.startSession(req, res, function(){
    root(req, res);
  });
});

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};
