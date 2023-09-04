const express = require('express');
const TaskController = require('../controllers/taskController');
const verify = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/', verify.verifyToken, TaskController.createTask);
router.get('/', verify.verifyToken, TaskController.getAllTasks);
router.get('/:id', verify.verifyToken, TaskController.getTaskById);
router.put('/:id', verify.verifyToken, TaskController.updateTask);
router.delete('/:id', verify.verifyToken, TaskController.deleteTask);

module.exports = router;
