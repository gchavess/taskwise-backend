const taskModel = require('../models/taskModel');

module.exports = {
  createTask: async (taskData) => taskModel.create(taskData),
  getAllTasks: async () => taskModel.getAll(),
  getTaskById: async (taskId) => taskModel.getById(taskId),
  updateTask: async (taskId, taskData) => taskModel.update(taskId, taskData),
  deleteTask: async (taskId) => taskModel.delete(taskId),
};
