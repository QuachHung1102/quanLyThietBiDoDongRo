'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Bước 1: Thêm cột với allowNull: true
    await queryInterface.addColumn('Devices', 'coordinates', {
      type: Sequelize.GEOMETRY('POINT', 4326), // SRID 4326 cho tọa độ địa lý
      allowNull: true, // Tạm thời cho phép NULL
    });

    // Bước 2: Cập nhật giá trị cho các bản ghi hiện tại
    await queryInterface.sequelize.query(`
      UPDATE Devices
      SET coordinates = ST_GeomFromText('POINT(105.84887867029437 21.02866357141868)')
      WHERE coordinates IS NULL
    `);

    // Bước 3: Thay đổi cột thành allowNull: false
    await queryInterface.changeColumn('Devices', 'coordinates', {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false, // Không cho phép NULL sau khi cập nhật
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Devices', 'coordinates');
  }
};
