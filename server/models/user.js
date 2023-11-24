'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'authorId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Email must be unique' },
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email format' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password is required' },
          min: {
            args: 5,
            msg: 'Minimal length of password is 5',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
