const { User } = require('../db/models/index');
const { hashPassword, comparePassword } = require('../util/passwordBcrypt');
const searchDuplicate = require('../validation/searchDuplicate');
const {
	userRegisterAreValid,
	userLoginAreValid,
} = require('../validation/usersValidate');
const { StatusCodes } = require('http-status-codes');

module.exports.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
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
			avatar: 'https://www.gravatar.com/avatar',
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'User created',
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

module.exports.loginUser = () => {
	const { username, password } = req.body;

	const checkUser = searchDuplicate(User, {
		where: {
			email: username,
		},
	});

	console.log(checkUser);

	if (!userLoginAreValid(username, password)) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'username and password are required',
		});
	}
};
