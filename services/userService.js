// services/userService.js
const User = require("../models/userModel");

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

/*
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
  */
