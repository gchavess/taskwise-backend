const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/", UserController.login);

module.exports = router;
