
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('requests', function(table){
    table.increments('id').primary();
    table.integer('hirer_id');
    table.integer('owner_id').references('users.id');
    table.integer('space_id').references('spaces.id');
    table.date('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests');
};
