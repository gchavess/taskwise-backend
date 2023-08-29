const UserModel = require('../models/userModel');

module.exports = {
  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const user = await UserModel.create({ name, email });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving users' });
    }
  },

  async getUserById(req, res) {
    const id = req.params.id;
    try {
      const user = await UserModel.getById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving user' });
    }
  },

  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email } = req.body;
    try {
      const user = await UserModel.update(id, { name, email });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating user' });
    }
  },

  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const result = await UserModel.delete(id);
      if (result) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};
