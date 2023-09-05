const knex = require('knex')(require('../config/knexfile').development);

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
  },
  async getByEmail(email) {
    try {
      return await knex('users').where({ email }).first();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
