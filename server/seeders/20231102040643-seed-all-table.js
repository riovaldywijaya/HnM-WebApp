'use strict';
const db = require('../db.json');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      db.users.map((user) => {
        delete user.id;
        user.createdAt = user.updatedAt = new Date();
        user.role = 'admin';
        user.password = hashPassword(user.password);
        return user;
      })
    );

    await queryInterface.bulkInsert(
      'Categories',
      db.categories.map((category) => {
        delete category.id;
        category.createdAt = category.updatedAt = new Date();
        return category;
      })
    );

    await queryInterface.bulkInsert(
      'Products',
      db.products.map((product) => {
        delete product.id;
        product.createdAt = product.updatedAt = new Date();
        return product;
      })
    );

    await queryInterface.bulkInsert(
      'Images',
      db.images.map((image) => {
        delete image.id;
        image.createdAt = image.updatedAt = new Date();
        return image;
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete('Products', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete('Categories', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete('Users', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
