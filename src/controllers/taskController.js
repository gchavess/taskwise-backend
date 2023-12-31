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

    res
      .status(200)
      .json({ message: "Tarefa atualizada com sucesso.", task: updatedTask });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).send("Erro ao atualizar tarefa.");
  }
};

exports.getAllTasksByGoalId = async (arg1, res) => {
  try {
    let goalId;

    if (arg1.params !== undefined) {
      goalId = arg1.params.goalId;
    } else {
      goalId = arg1;
    }

    const tasks = await Task.getAll({ where: { goalId } });

    if (arg1.params !== undefined) {
      res.status(200).json(tasks);
    }

    return tasks;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
    throw error;
  }
};

exports.getAllTasksByUserIdAndToday = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send("O parâmetro 'userId' é obrigatório.");
    }

    const tasks = await Task.getAllToday(userId);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};

exports.getAllTasksByUserIdAndDate = async (req, res) => {
  try {
    const { userId, data } = req.body;

    if (!userId) {
      return res.status(400).send("O parâmetro 'userId' é obrigatório.");
    }

    if (!data) {
      return res.status(400).send("O parâmetro 'data' é obrigatório.");
    }

    const tasks = await Task.getAllData(userId, data);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};

exports.deleteAllTasksByGoalId = async (goalId) => {
  try {
    await Task.deleteAll({ where: { goalId } });
  } catch (error) {
    console.error("Erro ao deletar tarefas por goalId:", error);
    throw error;
  }
};
