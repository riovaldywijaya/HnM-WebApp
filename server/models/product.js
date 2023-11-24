'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, { foreignKey: 'productId' });
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.User, { foreignKey: 'authorId' });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required' },
          notEmpty: { msg: 'Description is required' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price is required' },
          notEmpty: { msg: 'Price is required' },
          min: {
            args: 1,
            msg: 'Minimal price is 1',
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Main image is required' },
          notEmpty: { msg: 'Main image is required' },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      authorId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  Product.beforeCreate((instance) => {
    function converter(string) {
      const lowercaseString = string.toLowerCase();
      const removeSpaces = lowercaseString.replace(' ', '-');
      return removeSpaces;
    }
    instance.slug = converter(instance.name);
  });
  return Product;
};
