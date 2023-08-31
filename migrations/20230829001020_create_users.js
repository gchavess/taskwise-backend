exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.string('salt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
