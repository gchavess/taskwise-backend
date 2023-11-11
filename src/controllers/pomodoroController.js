const Pomodoro = require("../models/pomodoroModel");
const Task = require("../models/taskModel");

exports.createPomodoro = async (req, res) => {
  try {
    const { taskId, ...pomodoroData } = req.body;

    if (!taskId) {
      return res
        .status(400)
        .send("O campo 'taskId' é obrigatório no corpo da requisição.");
    }

    const newPomodoro = {
      taskId,
      ...pomodoroData,
    };

    const docRef = await Pomodoro.create(newPomodoro);
    const pomodoro = await docRef.get();
    res.status(201).json(pomodoro.data());
  } catch (error) {
    console.error("Erro ao criar Pomodoro:", error);
    res.status(500).send("Erro ao criar Pomodoro.");
  }
};

exports.getAllPomodoros = async (req, res) => {
  try {
    const pomodoros = await Pomodoro.getAll();

    const pomodorosWithTask = await Promise.all(
      pomodoros.map(async (pomodoro) => {
        const task = await Task.getById(pomodoro.taskId);
        delete pomodoro.taskId;
        return {
          ...pomodoro,
          task,
        };
      })
    );

    res.json(pomodorosWithTask);
  } catch (error) {
    console.error("Erro ao buscar Pomodoros:", error);
    res.status(500).send("Erro ao buscar Pomodoros.");
  }
};

exports.getPomodoroById = async (req, res) => {
  try {
    const pomodoroId = req.params.id;
    const pomodoro = await Pomodoro.getById(pomodoroId);
    if (!pomodoro) {
      res.status(404).send("Pomodoro não encontrado.");
    } else {
      res.json(pomodoro);
    }
  } catch (error) {
    console.error("Erro ao buscar Pomodoro por ID:", error);
    res.status(500).send("Erro ao buscar Pomodoro por ID.");
  }
};

exports.updatePomodoro = async (req, res) => {
  try {
    const pomodoroId = req.params.id;
    const updatedData = req.body;
    await Pomodoro.update(pomodoroId, updatedData);
    res.json({ message: "Pomodoro atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar Pomodoro:", error);
    res.status(500).send("Erro ao atualizar Pomodoro.");
  }
};

exports.deletePomodoro = async (req, res) => {
  try {
    const pomodoroId = req.params.id;
    await Pomodoro.delete(pomodoroId);
    res.json({ message: "Pomodoro excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir Pomodoro:", error);
    res.status(500).send("Erro ao excluir Pomodoro.");
  }
};
