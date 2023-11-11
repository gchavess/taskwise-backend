const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const userController = require("../controllers/userController");

router.post("/", userController.verifyToken, goalController.createGoal);
router.get("/", userController.verifyToken, goalController.getAllGoals);

module.exports = router;
