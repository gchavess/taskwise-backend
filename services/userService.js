const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt'); // Make sure to require bcrypt if you haven't already

module.exports = {
  createUser: async (userData) => userModel.create(userData),
  getAllUsers: async () => userModel.findAll(),
  getUserById: async (userId) => userModel.findById(userId),
  updateUser: async (userId, userData) => userModel.update(userId, userData),
  deleteUser: async (userId) => userModel.remove(userId),
  async authenticateUser(email, password) {
    try {
      const user = await userModel.getByEmail(email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          return user;
        }
      }

      return null;
    } catch (error) {
      throw error;
    }
  },
};
