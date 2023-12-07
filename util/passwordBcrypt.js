const bcrypt = require('bcrypt');
require('dotenv').config();
module.exports.hashPassword = async (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(Number(process.env.SALT_ROUNDS), async (err, salt) => {
			try {
				if (err) {
					console.log('failed salt password', err);
					reject(err);
				} else {
					await bcrypt.hash(password, salt, (err, hash) => {
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
		bcrypt.compare(password, hash, (err, result) => {
			if (err) {
				console.log('failed compare password', err);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
