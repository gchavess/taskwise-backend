const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { email, senha, nome } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Credenciais incompletas" });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const newUser = {
      email,
      nome,
      senha: hashedSenha,
    };

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

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Credenciais incompletas" });
    }

    const user = await User.findOne(["email", "==", email]);

    if (user) {
      const senhaCorreta = await bcrypt.compare(senha, user.senha);

      if (senhaCorreta) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const userInfo = {
          id: user?.id,
          email: user?.email,
          nome: user?.nome,
        };
        return res.json({ token, user: userInfo });
      }
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).send("Erro ao realizar login.");
  }
};

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};
