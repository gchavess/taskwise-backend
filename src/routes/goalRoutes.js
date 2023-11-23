const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const userController = require("../controllers/userController");

router.post("/", goalController.createGoal);
router.get("/:userId", goalController.getAllGoals);
router.delete(
  "/:goalId",
  userController.verifyToken,
  goalController.deleteGoal
);
router.put("/:goalId", userController.verifyToken, goalController.updateGoal);

module.exports = router;
