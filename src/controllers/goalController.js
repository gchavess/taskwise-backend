const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const Task = require("./taskController");

exports.createGoal = async (req, res) => {
  try {
    const { userId, ...goalData } = req.body;

    if (!userId) {
      return res
        .status(400)
        .send("O campo 'userId' é obrigatório no corpo da requisição.");
    }

    const newGoal = {
      userId,
      ...goalData,
    };

    const docRef = await Goal.create(newGoal);
    const goal = await docRef.get();
    res.status(201).json(goal.data());
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    res.status(500).send("Erro ao criar meta.");
  }
};

exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.getAll();

    const goalsWithTasks = await Promise.all(
      goals.map(async (goal) => {
        const user = await User.getById(goal.userId);
        delete goal.userId;

        const tasks = await Task.getAllTasksByGoalId(goal.id); // Add this line

        return {
          ...goal,
          user,
          tasks,
        };
      })
    );

    res.json(goalsWithTasks);
  } catch (error) {
    console.error("Erro ao buscar goals:", error);
    res.status(500).send("Erro ao buscar goals.");
  }
};
