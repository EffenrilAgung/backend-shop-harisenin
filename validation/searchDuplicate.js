const searchDuplicate = async (model, field) => {
	try {
		const result = await model.findOne({
			where: {
				...field,
			},
		});
		if (result) {
			return result;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error Searching for duplicate', error);
		return error;
	}
};

module.exports = searchDuplicate;
