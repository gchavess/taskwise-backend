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

      res.status(200).json({ status: 'Success', data: goal, code: 200 });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: 'Error', message: 'Failed to create goal', code: 500 });
    }
  },

  async getAllGoals(req, res) {
    try {
      const goals = await GoalModel.getAll();
      res.status(200).json({ status: 'Success', data: goals, code: 200 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'Error',
        message: 'Failed to retrieve goals',
        code: 500,
      });
    }
  },

  async getGoalById(req, res) {
    const id = req.params.id;
    try {
      const goal = await GoalModel.getById(id);
      if (goal) {
        res.status(200).json({ status: 'Success', data: goal, code: 200 });
      } else {
        res
          .status(404)
          .json({ status: 'Not Found', message: 'Goal not found', code: 404 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'Error',
        message: 'Failed to retrieve goal',
        code: 500,
      });
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
        res.status(200).json({ status: 'Success', data: goal, code: 200 });
      } else {
        res
          .status(404)
          .json({ status: 'Not Found', message: 'Goal not found', code: 404 });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: 'Error', message: 'Failed to update goal', code: 500 });
    }
  },

  async deleteGoal(req, res) {
    const id = req.params.id;
    try {
      const result = await GoalModel.delete(id);
      if (result) {
        res
          .status(200)
          .json({ status: 'Success', message: 'Goal deleted', code: 200 });
      } else {
        res
          .status(404)
          .json({ status: 'Not Found', message: 'Goal not found', code: 404 });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: 'Error', message: 'Failed to delete goal', code: 500 });
    }
  },
};
