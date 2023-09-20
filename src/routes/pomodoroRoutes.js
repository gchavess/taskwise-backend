const express = require("express");
const router = express.Router();
const pomodoroController = require("../controllers/pomodoroController");

router.post("/", pomodoroController.createPomodoro);
router.get("/", pomodoroController.getAllPomodoros);
router.get("/:id", pomodoroController.getPomodoroById);
router.put("/:id", pomodoroController.updatePomodoro);
router.delete("/:id", pomodoroController.deletePomodoro);

module.exports = router;
