'use strict';

let Bookshelf = require('../db/database.js');

require('./space.js');
require('./user.js');
var Request = Bookshelf.Model.extend({
  tableName: 'requests',
  spaces: function(){
    return this.belongsTo('Space', 'space_id');
  },
  
  users: function(){
    return this.belongsTo('User', 'owner_id');
  }
});

module.exports = Bookshelf.model('Request', Request);
