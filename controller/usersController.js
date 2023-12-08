const { User } = require('../db/models/index');
const { hashPassword, comparePassword } = require('../util/passwordBcrypt');
const searchDuplicate = require('../validation/searchDuplicate');
const {
	userRegisterAreValid,
	userLoginAreValid,
} = require('../validation/usersValidate');
const { Buffer } = require('node:buffer');
const { StatusCodes } = require('http-status-codes');

module.exports.createUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const base64Image = req.file.buffer.toString('base64');

		if (!userRegisterAreValid(name, email, password)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Invalid name, email or password',
			});
		}

		const emailExist = await searchDuplicate(User, {
			email: email,
		});

		if (emailExist) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'Email sudah terdaftar',
			});
		}
		const users = User.create({
			name: name,
			email: email,
			password: await hashPassword(password),
			isAdmin: false,
			avatar: req.file.buffer ? base64Image : 'https://www.gravatar.com/avatar',
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'User created',
			data: { ...users },
		});
	} catch (error) {
		next(error);
	}
};

module.exports.loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const buff = Buffer.from(password, 'utf-8');

		console.log(buff.toString('base64url'));

		if (!userLoginAreValid(username, password)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Invalid username or password',
			});
		}

		const checkUser = await searchDuplicate(User, { email: username });
		const checkPassword = await comparePassword(password, checkUser.password);
		if (!checkUser && !checkPassword) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'Invalid username or password',
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: 'Login success',
				data: checkUser,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.findAll();
		return res.status(StatusCodes.OK).json({
			message: 'Get all users',
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

module.exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;

		const base64Image = req.file.buffer.toString('base64');

		if (!userRegisterAreValid(name, email, password)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Invalid name, email or password',
			});
		}
		const searchUser = await searchDuplicate(User, { id: id });

		if (!searchUser) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
		} else {
			const users = await User.update(
				{
					name: name,
					password: await hashPassword(password),
					email: email,
					avatar: base64Image,
				},
				{
					where: {
						id: id,
					},
				}
			);
			return res.status(StatusCodes.OK).json({
				message: 'User updated',
				data: { ...users },
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports.deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		const users = User.destroy({
			where: {
				id: id,
			},
		});
		if (!users) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
				userID: id,
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: 'User deleted',
				id: { ...users },
			});
		}
	} catch (error) {
		next(error);
	}
};
