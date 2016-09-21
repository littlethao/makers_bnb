exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('spaces', function(table){
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('price').notNullable();
    table.integer('user_id').notNullable().references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spaces');
};
