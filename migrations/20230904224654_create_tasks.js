exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary();
    table.integer('goalId').unsigned().references('id').inTable('goals');
    table.string('description');
    table.date('date');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
