const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { Product, Category, User, Image, sequelize } = require('../models');

class Controller {
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: 'InvalidEmailOrPassword' };

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: 'InvalidEmailOrPassword' };

      const access_token = signToken({ id: user.id, email: user.email, role: user.role });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static getAllProduct = async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Image,
          },
          {
            model: Category,
          },
        ],
        order: [['id', 'asc']],
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };

  static getDetailProduct = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.findOne({
        where: {
          id,
        },
        include: {
          model: Image,
        },
      });

      if (!product) throw { name: 'ProductNotFound' };

      res.status(200).json({ product });
    } catch (err) {
      next(err);
    }
  };

  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5 } = req.body;
      const authorId = req.user.id;

      const createProduct = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
        },
        {
          transaction: t,
        }
      );

      const productId = createProduct.id;

      await Image.bulkCreate(
        [
          {
            imgUrl: imgUrl1,
            productId,
          },
          {
            imgUrl: imgUrl2,
            productId,
          },
          {
            imgUrl: imgUrl3,
            productId,
          },
          {
            imgUrl: imgUrl4,
            productId,
          },
          {
            imgUrl: imgUrl5,
            productId,
          },
        ],
        {
          transaction: t,
        }
      );

      await t.commit();

      res.status(201).json(createProduct);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5 } = req.body;
      const { id } = req.params;

      await Product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
        },
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        }
      );

      await Image.destroy(
        {
          where: {
            productId: id,
          },
        },
        {
          transaction: t,
        }
      );

      await Image.bulkCreate(
        [
          {
            imgUrl: imgUrl1,
            productId: id,
          },
          {
            imgUrl: imgUrl2,
            productId: id,
          },
          {
            imgUrl: imgUrl3,
            productId: id,
          },
          {
            imgUrl: imgUrl4,
            productId: id,
          },
          {
            imgUrl: imgUrl5,
            productId: id,
          },
        ],
        {
          transaction: t,
        }
      );
      await t.commit();

      res.status(201).json('Product has updated!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      await Image.destroy(
        {
          where: {
            productId: id,
          },
        },
        {
          transaction: t,
        }
      );

      await Product.destroy(
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      res.status(200).json({ message: 'delete product success!' });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      await Category.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ message: 'delete category success!' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) throw { name: 'CategoryNotFound' };

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const createCategory = await Category.create({ name });

      res.status(201).json(createCategory);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json('Category has updated!');
    } catch (error) {
      next(error);
    }
  }

  static async createAdmin(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const createAdmin = await User.create({ username, email, password, phoneNumber, address });

      res.status(201).json({
        username: createAdmin.username,
        email: createAdmin.email,
        role: createAdmin.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
