const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

/*

router.get("/", verify.verifyToken, UserController.getAllUsers);
router.get("/:id", verify.verifyToken, UserController.getUserById);
router.put("/:id", verify.verifyToken, UserController.updateUser);
router.delete("/:id", verify.verifyToken, UserController.deleteUser);
router.post("/", UserController.createUser);
*/
