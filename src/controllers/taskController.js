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

    const tasksWithGoal = await Promise.all(
      tasks.map(async (task) => {
        const goal = await Goal.getById(task.goalId);
        delete task.goalId;

        return {
          ...task,
          goal,
        };
      })
    );

    res.json(tasksWithGoal);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).send("O parâmetro 'taskId' é obrigatório.");
    }

    await Task.delete(taskId);

    res.status(200).send("Tarefa deletada com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).send("Erro ao deletar tarefa.");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTaskData = req.body;

    if (!taskId) {
      return res.status(400).send("O parâmetro 'taskId' é obrigatório.");
    }

    if (!updatedTaskData) {
      return res.status(400).send("Dados de atualização não fornecidos.");
    }

    const updatedTask = await Task.update(taskId, updatedTaskData);

    res.status(200).json({ message: "Tarefa atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).send("Erro ao atualizar tarefa.");
  }
};
