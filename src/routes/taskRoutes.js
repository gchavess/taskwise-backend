const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:userId', taskController.getTasksForTodayByUserId);
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.delete('/:taskId', taskController.deleteTask);
router.put('/:taskId', taskController.updateTask);
router.get('/:goalId', taskController.getAllTasksByGoalId);

module.exports = router;
