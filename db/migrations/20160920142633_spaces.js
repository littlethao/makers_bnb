
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('spaces', function(table){
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('price').notNullable();
    table.date('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spaces');
};
