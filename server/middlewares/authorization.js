const { Product } = require('../models');

async function authorization(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw { name: 'ProductNotFound' };

    if (req.user.role !== 'Admin' && req.user.id !== product.authorId) {
      throw { name: 'Forbidden' };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
