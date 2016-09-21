'use strict';

let Bookshelf = require('../db/database.js');

require('./user.js');
var Space = Bookshelf.Model.extend({tableName: 'spaces',
  users: function(){
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Space', Space);
