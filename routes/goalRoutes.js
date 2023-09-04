const express = require('express');
const GoalController = require('../controllers/GoalController');
const verify = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/', verify.verifyToken, GoalController.createGoal);
router.get('/', verify.verifyToken, GoalController.getAllGoals);
router.get('/:id', verify.verifyToken, GoalController.getGoalById);
router.put('/:id', verify.verifyToken, GoalController.updateGoal);
router.delete('/:id', verify.verifyToken, GoalController.deleteGoal);

module.exports = router;
