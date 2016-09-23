var requestsController = function(req, res){
  var url_request_id = url.parse(req.url).pathname.split('/').slice(-1)[0];

  if (req.url == "/requests" && req.method == "GET") {
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
}

module.exports = requestsController;
