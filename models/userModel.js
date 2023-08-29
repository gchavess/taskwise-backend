const knex = require('knex')(require('../knexfile').development);

module.exports = {
  async create(user) {
    return knex('users').insert(user);
  },
  async getAll() {
    return knex('users');
  },
  async getById(id) {
    return knex('users').where('id', id).first();
  },
  async update(id, user) {
    return knex('users').where('id', id).update(user);
  },
  async delete(id) {
    return knex('users').where('id', id).del();
  }
};
