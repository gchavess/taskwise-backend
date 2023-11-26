const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskController.updateTask);
router.get("/:goalId", taskController.getAllTasksByGoalId);

module.exports = router;
