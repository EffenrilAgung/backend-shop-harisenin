const isEmpty = (value) => {
	return !value == null;
};

const userRegisterAreValid = (name, email, password) => {
	return name && email && password && email.includes('@');
};

const userLoginAreValid = (email, password) => {
	return !isEmpty(email) && !isEmpty(password) && email.includes('@');
};

module.exports = { isEmpty, userLoginAreValid, userRegisterAreValid };
