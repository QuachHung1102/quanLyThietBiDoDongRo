'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        firstName: "Quách",
        lastName: "Ngọc Hưng",
        email: "quachhung389@gmail.com",
        password: "$2a$10$k8wBJFtFBOtytuXRkXj38eADyIgU1tkSz3rH0l/nJgDMWd7MdKA/6",
        phoneNumber: "0776322272",
        type: "admin",
        createdAt: "2025-03-12 08:35:10.000",
        updatedAt: "2025-03-12 08:35:10.000"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
