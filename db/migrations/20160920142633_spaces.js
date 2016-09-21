
exports.up = function(knex, Promise) {
  return knex.schema.createTable('spaces', function(table){
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('price').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spaces');
};
