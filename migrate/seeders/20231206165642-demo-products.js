'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Products',
			[
				{
					image: 'products/ophidia-small-belt-bag.jpg',
					title: 'Ophidia Small Belt Bag',
					description: 'Ophidia Small Belt Bag',
					price: 100,
					stock: 10,
					sold: 0,
					userId: '3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'products/ophidia-tote-bag.jpg',
					title: 'Ophidia Tote Bag',
					description: 'Ophidia Tote Bag',
					price: 100,
					stock: 10,
					sold: 0,
					userId: '3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'products/polyster-backpack.jpg',
					title: 'Polyster Backpack',
					description: 'Polyster Backpack',
					price: 100,
					stock: 10,
					sold: 0,
					userId: '3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Products', null, {});
	},
};
