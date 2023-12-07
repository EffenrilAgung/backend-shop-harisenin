'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Products.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			image: DataTypes.STRING,
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			price: DataTypes.NUMBER,
			stock: DataTypes.NUMBER,
			sold: DataTypes.NUMBER,
			userId: DataTypes.CHAR,
		},
		{
			sequelize,
			modelName: 'Products',
		}
	);
	return Products;
};
