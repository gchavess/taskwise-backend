const express = require('express');
const UserController = require('../controllers/UserController');
const verify = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verify.verifyToken, UserController.getAllUsers);
router.get('/:id', verify.verifyToken, UserController.getUserById);
router.put('/:id', verify.verifyToken, UserController.updateUser);
router.delete('/:id', verify.verifyToken, UserController.deleteUser);
router.post('/', UserController.createUser);

module.exports = router;
