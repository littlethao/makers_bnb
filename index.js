var root_controller = require('./controllers/root_controller.js')

this.server = http.createServer(function (req, res){
  root_controller(req,res);
});

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};
