const express = require('express');
const {
	createUser,
	loginUser,
	getAllUsers,
} = require('../controller/usersController');
const router = express.Router();

router.post('/register', createUser);
router.get('/login', loginUser);

router.get('/all-users', getAllUsers);

module.exports = router;
