const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../.env' });
const testConnection = async () => {
	const sequelize = new Sequelize(
		process.env.DATABASE,
		process.env.USERNAME,
		null,
		{
			host: process.env.HOST,
			dialect: 'mysql',
		}
	);
	try {
		await sequelize.authenticate();
		return 'Connection has been established successfully.';
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		return error;
	} finally {
		return await sequelize.close();
	}
};

module.exports = testConnection;
