var modules = function(){
  http = require('http');
  fs = require('fs');
  qs = require('querystring');
  ejs = require('ejs');
  knex = require('../db/knex.js');
  bookshelf = require('../db/database.js');
  NodeSession = require('node-session');
  User = require('../models/user.js');
  Request = require('../models/request.js');
  Space = require('../models/space.js');
  bcrypt = require('bcrypt');
  url = require('url');
  validator = require('validator');
};

module.exports = modules;
