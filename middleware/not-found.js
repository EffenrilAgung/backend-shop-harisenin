const notFound = (req, res) => {
	res.status(404).send({
		message: 'Router does not exist',
	});
};

module.exports = notFound;
