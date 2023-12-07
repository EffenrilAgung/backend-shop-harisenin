const isEmpty = (value) => {
	return !value == null;
};

const userRegisterAreValid = (name, email, password) => {
	return (
		!isEmpty(name) &&
		!isEmpty(email) &&
		!isEmpty(password) &&
		password.length >= 6 &&
		email.includes('@')
	);
};

const userLoginAreValid = (email, password) => {
	return !isEmpty(email) && !isEmpty(password) && email.includes('@');
};

module.exports = { isEmpty, userLoginAreValid, userRegisterAreValid };
