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

        const tasks = await Task.getAllTasksByGoalId(goal.id);

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

exports.deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    if (!goalId) {
      return res.status(400).send("O parâmetro 'Id' é obrigatório.");
    }

    await Goal.delete(goalId);

    res.status(200).send("Meta deletada com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar meta:", error);
    res.status(500).send("Erro ao deletar meta.");
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const updatedGoalData = req.body;

    if (!goalId) {
      return res.status(400).send("O parâmetro 'goalId' é obrigatório.");
    }

    if (!updatedGoalData) {
      return res.status(400).send("Dados de atualização não fornecidos.");
    }

    const updatedGoal = await Goal.update(goalId, updatedGoalData);

    res.status(200).json({
      message: "Meta atualizada com sucesso.",
      updatedGoal: updatedGoal,
    });
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    res.status(500).send("Erro ao atualizar meta.");
  }
};
