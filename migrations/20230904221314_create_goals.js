exports.up = function (knex) {
  return knex.schema.createTable('goals', function (table) {
    table.increments('id').primary();
    table.integer('userId').unsigned().references('id').inTable('users');
    table.decimal('progress');
    table.string('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('goals');
};
