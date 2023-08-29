const UserModel = require('../models/userModel');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your_secret_key';

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        salt,
      });

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
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userService.authenticateUser(email, password);

      console.log(user);
      if (user) {
        // Gerar um token JWT
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in' });
    }
  },
};
