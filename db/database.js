var knex = require('./knex');
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
module.exports = bookshelf;
