const TaskModel = require('../models/taskModel');

module.exports = {
  async createTask(req, res) {
    const { goalId, description, date } = req.body;
    try {
      const task = await TaskModel.create({
        goalId,
        description,
        date,
      });

      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating task' });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving tasks' });
    }
  },

  async getTaskById(req, res) {
    const id = req.params.id;
    try {
      const task = await TaskModel.getById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving task' });
    }
  },

  async updateTask(req, res) {
    const id = req.params.id;
    const { goalId, description, date } = req.body;
    try {
      const task = await TaskModel.update(id, {
        goalId,
        description,
        date,
      });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating task' });
    }
  },

  async deleteTask(req, res) {
    const id = req.params.id;
    try {
      const result = await TaskModel.delete(id);
      if (result) {
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  },
};
