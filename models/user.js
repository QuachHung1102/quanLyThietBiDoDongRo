'use strict';
const roles = ['client', 'admin'];

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Permissions }) {
      // define association here
      this.hasMany(Permissions, { foreignKey: 'userId' });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the password',
        },
        notEmpty: true,
        len: [6, 100],
      }
    },
    avatar: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client',
      validate: {
        len: [5, 100],
        notEmpty: true,
        isIn: [roles],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};