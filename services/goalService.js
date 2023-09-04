const goalModel = require('../models/goalModel');

module.exports = {
  createGoal: async (goalData) => goalModel.create(goalData),
  getAllGoals: async () => goalModel.getAll(),
  getGoalById: async (goalId) => goalModel.getById(goalId),
  updateGoal: async (goalId, goalData) => goalModel.update(goalId, goalData),
  deleteGoal: async (goalId) => goalModel.delete(goalId),
};
