const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.delete(
  "/:taskId",
  userController.verifyToken,
  taskController.deleteTask
);
router.put("/:taskId", userController.verifyToken, taskController.updateTask);

module.exports = router;
