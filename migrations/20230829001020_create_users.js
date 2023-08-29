exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.string('password'); // Armazenará o hash da senha
    table.string('salt'); // Armazenará o salt usado para criar o hash
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
