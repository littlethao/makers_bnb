'use strict';

let Bookshelf = require('../db/database.js');

require('./space.js');
var User = Bookshelf.Model.extend({
  tableName: 'users',
  spaces: function(){
      return this.hasMany('Spaces');
  },
});

module.exports = Bookshelf.model('User', User);
