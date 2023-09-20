const Task = require("../models/taskModel");
const Goal = require("../models/goalModel");

exports.createTask = async (req, res) => {
  try {
    const { goalId, ...taskData } = req.body;

    if (!goalId) {
      return res
        .status(400)
        .send("O campo 'goalId' é obrigatório no corpo da requisição.");
    }

    const newTask = {
      goalId,
      ...taskData,
    };

    const docRef = await Task.create(newTask);
    const task = await docRef.get();
    res.status(201).json(task.data());
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).send("Erro ao criar tarefa.");
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();

    const tasksWithUser = await Promise.all(
      tasks.map(async (task) => {
        const goal = await Goal.getById(task.goalId);
        delete task.goalId;
        return {
          ...task,
          goal,
        };
      })
    );

    res.json(tasksWithUser);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};
