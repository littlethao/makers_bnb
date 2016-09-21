'use strict';

let Bookshelf = require('../db/database.js');

require('./user.js');
require('./request.js');
var Space = Bookshelf.Model.extend({
  tableName: 'spaces',
  users: function(){
    return this.belongsTo('User', 'user_id');
  },

  requests: function(){
    return this.hasMany('Requests');
  }
});

module.exports = Bookshelf.model('Space', Space);
