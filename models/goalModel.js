const knex = require('knex')(require('../config/knexfile').development);

module.exports = {
  async create(goal) {
    return knex('goals').insert(goal);
  },
  async getAll() {
    return knex('goals');
  },
  async getById(id) {
    return knex('goals').where('id', id).first();
  },
  async update(id, goal) {
    return knex('goals').where('id', id).update(goal);
  },
  async delete(id) {
    return knex('goals').where('id', id).del();
  },
};
