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
    await queryInterface.bulkInsert('Devices', [
      {
        deviceName: "Thiết bị đo dòng rò",
        serialNumber: "000000001",
        status: "1",
        type: null,
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "Thiết bị đo dòng rò",
        serialNumber: "0000000ab",
        status: "3",
        type: null,
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "Thiết bị đo dòng rò",
        serialNumber: "00000azs",
        status: "1",
        type: null,
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Devices', null, {});
  }
};
