const GoalModel = require('../models/goalModel');

module.exports = {
  async createGoal(req, res) {
    const { userId, progress, description } = req.body;
    try {
      const goal = await GoalModel.create({
        userId,
        progress,
        description,
      });

      res.json(goal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating goal' });
    }
  },

  async getAllGoals(req, res) {
    try {
      const goals = await GoalModel.getAll();
      res.json(goals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving goals' });
    }
  },

  async getGoalById(req, res) {
    const id = req.params.id;
    try {
      const goal = await GoalModel.getById(id);
      if (goal) {
        res.json(goal);
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving goal' });
    }
  },

  async updateGoal(req, res) {
    const id = req.params.id;
    const { userId, progress, description } = req.body;
    try {
      const goal = await GoalModel.update(id, {
        userId,
        progress,
        description,
      });
      if (goal) {
        res.json(goal);
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating goal' });
    }
  },

  async deleteGoal(req, res) {
    const id = req.params.id;
    try {
      const result = await GoalModel.delete(id);
      if (result) {
        res.json({ message: 'Goal deleted' });
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting goal' });
    }
  },
};
