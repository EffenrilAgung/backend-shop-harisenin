'use strict';

const { hashPassword } = require('../../util/passwordBcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: 'bca007b0-14bb-4f53-8414-bdcf9aa07173',
					name: 'John Doe',
					email: 'john@example.com',
					password: await hashPassword('123456'),
					avatar: 'https://www.gravatar.com/avatar',
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '17aed6f4-36a8-47b2-8f6d-664b8850aec5',
					name: 'Albert Jhonson',
					email: 'albert@example.com',
					password: await hashPassword('123456'),
					avatar: 'https://www.gravatar.com/avatar',
					isAdmin: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '1cb3a78c-9e19-48b0-9832-afa50b8e3165',
					name: 'effenril',
					email: 'effenril@example.com',
					password: await hashPassword('123456'),
					avatar: 'https://www.gravatar.com/avatar',
					isAdmin: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
