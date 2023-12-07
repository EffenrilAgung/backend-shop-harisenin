const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	const defaultError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong, try again later',
	};

	if (err.name === 'ValidationError') {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',');
	}

	if (err.code && err.code === 11000) {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
	}
	if (err.code === 'LIMIT_FILE_SIZE') {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = 'File size too large';
	}
	if (err.code === 'CastError') {
		customError.msg = `No item found with that ID : ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
