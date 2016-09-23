'use strict';

let Bookshelf = require('../db/database.js');

require('./space.js');
require('./request.js');

var User = Bookshelf.Model.extend({
  tableName: 'users',

  initialize: function() {
    this.on('saving', this._assertEmailUnique);
  },
  _assertEmailUnique: function(model, attributes, options) {
    if (this.hasChanged('email')) {
      return User
      .query('where', 'email', this.get('email'))
      .fetch()
      .then(function(existing){
        if (existing) {
          throw new Error('Email already in use');
        }
      });
    }
  },

  spaces: function(){
      return this.hasMany('Spaces');
  },
  requests: function(){
    return this.hasMany('Requests');
  }
});

module.exports = Bookshelf.model('User', User);
