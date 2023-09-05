const knex = require('knex')(require('../knexfile').development);

module.exports = {
  async create(task) {
    return knex('tasks').insert(task);
  },
  async getAll() {
    return knex('tasks');
  },
  async getById(id) {
    return knex('tasks').where('id', id).first();
  },
  async update(id, task) {
    return knex('tasks').where('id', id).update(task);
  },
  async delete(id) {
    return knex('tasks').where('id', id).del();
  },
};
