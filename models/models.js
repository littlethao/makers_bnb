var bookshelf = require('../db/knex.js');
var Space = bookshelf.Model.extend({
                                    tableName: 'spaces',
                                    users: function() {
                                      return this.belongsTo('User')
                                    }

});

var User = bookshelf.Model.extend({
                                  tableName: 'users',
                                  spaces: function(){
                                    return this.hasMany('Spaces')
                                  }

});

var SpaceCollection = bookshelf.Collection.extend({
  model: Space
});

module.exports = bookshelf.model('Space', Space);
module.exports = bookshelf.model('User', User);
module.exports = bookshelf.collection('SpaceCollection', SpaceCollection);
