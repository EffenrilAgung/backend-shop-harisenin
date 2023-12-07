const bcrypt = require('bcrypt');
const { Buffer } = require('node:buffer');
require('dotenv').config();

const convertToBuffer = (password) => {
	const buff = Buffer.from(password + process.env.RANDOM_PASSWORD, 'utf-8');
	return buff.toString('base64');
};
module.exports.hashPassword = async (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(Number(process.env.SALT_ROUNDS), async (err, salt) => {
			try {
				if (err) {
					console.log('failed salt password', err);
					reject(err);
				} else {
					await bcrypt.hash(convertToBuffer(password), salt, (err, hash) => {
						if (err) {
							console.log('failed hash password', err);
							reject(err);
						}
						if (hash) {
							resolve(hash);
						}
					});
				}
			} catch (error) {
				console.log(error.message);
			}
		});
	});
};

module.exports.comparePassword = async (password, hash) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(convertToBuffer(password), hash, (err, result) => {
			if (err) {
				console.log('failed compare password', err);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
