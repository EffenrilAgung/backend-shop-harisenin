const express = require('express');
const {
	createUser,
	loginUser,
	getAllUsers,
	updateUser,
	deleteUser,
} = require('../controller/usersController');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/register', upload.single('avatar'), createUser);
router.get('/login', loginUser);

router.get('/all-users', getAllUsers);
router.put('/update-user/:id', upload.single('avatar'), updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
