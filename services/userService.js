const userModel = require('../models/userModel.js');

module.exports = {
  createUser: async (userData) => userModel.create(userData),
  getAllUsers: async () => userModel.findAll(),
  getUserById: async (userId) => userModel.findById(userId),
  updateUser: async (userId, userData) => userModel.update(userId, userData),
  deleteUser: async (userId) => userModel.remove(userId),
};