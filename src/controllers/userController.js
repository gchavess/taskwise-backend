const admin = require("firebase-admin");
const db = admin.firestore();
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const docRef = await User.create(newUser);
    const user = await docRef.get();
    res.status(201).json(user.data());
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário.");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro ao buscar usuários.");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getById(userId);
    if (!user) {
      res.status(404).send("Usuário não encontrado.");
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).send("Erro ao buscar usuário por ID.");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    await User.update(userId, updatedData);
    res.json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro ao atualizar usuário.");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.delete(userId);
    res.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send("Erro ao excluir usuário.");
  }
};

// Implemente as demais funções de controle de usuário aqui

/*
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
  */
