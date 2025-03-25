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
        deviceName: "DV001",
        serialNumber: "000000001",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        coordinates: Sequelize.fn('ST_GeomFromText', `POINT(9.906674 105.849961 )`, 4326),
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "DV002",
        serialNumber: "000000002",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        coordinates: Sequelize.fn('ST_GeomFromText', `POINT(9.896331 105.864997)`, 4326),
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "DV003",
        serialNumber: "000000003",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        coordinates: Sequelize.fn('ST_GeomFromText', `POINT(9.890507 105.873462)`, 4326),
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "DV004",
        serialNumber: "000000004",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        coordinates: Sequelize.fn('ST_GeomFromText', `POINT(9.884242 105.890140)`, 4326),
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
