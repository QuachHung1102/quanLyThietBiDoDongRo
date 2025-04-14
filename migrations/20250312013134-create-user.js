'use strict';
const roles = ['client', 'admin'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the first name',
          },
          notEmpty: true,
          len: [1, 50],
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the last name',
          },
          notEmpty: true,
          len: [1, 50],
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is invalid',
          },
          notNull: {
            msg: 'Please enter the email',
          },
          notEmpty: true,
          len: [5, 100],
        }
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: {
            msg: 'Phone number must be numeric',
          },
          notNull: {
            msg: 'Please enter the phone number',
          },
          notEmpty: true,
          len: [10, 15],
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the password',
          },
          notEmpty: true,
          len: [6, 100],
        }
      },
      avatar: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'client',
        validate: {
          len: [5, 100],
          notEmpty: true,
          isIn: [roles],
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};