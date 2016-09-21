var requires = function(){
   fs = require('fs');
   qs = require('querystring');
   ejs = require('ejs');
   knex = require('../db/knex.js');
   bookshelf = require('../db/database.js');
   User = require('../models/user.js');
   Space = require('../models/space.js');
   bcrypt = require('bcrypt');
   http = require('http');
   NodeSession = require('node-session');
};

module.exports = requires;
