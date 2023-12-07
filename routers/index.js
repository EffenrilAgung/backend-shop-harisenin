const express = require('express');
const { createUser, loginUser } = require('../controller/usersController');
const router = express.Router();

router.post('/register', createUser);
router.get('/login', loginUser);

module.exports = router;
