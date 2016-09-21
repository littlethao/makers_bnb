'use strict';

let Bookshelf = require('../db/database.js');

require('./space.js');
require('./request.js');
var User = Bookshelf.Model.extend({
  tableName: 'users',
  spaces: function(){
      return this.hasMany('Spaces');
  },
  requests: function(){
    return this.hasMany('Requests');
  }
});

module.exports = Bookshelf.model('User', User);
