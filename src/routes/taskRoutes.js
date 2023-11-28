const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/today/:userId", taskController.getAllTasksByUserIdAndToday);
router.post("/data", taskController.getAllTasksByUserIdAndDate);
router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskController.updateTask);
router.get("/:goalId", taskController.getAllTasksByGoalId);

module.exports = router;
