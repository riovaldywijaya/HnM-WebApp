const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    let payload = verifyToken(req.headers.access_token);
    if (!payload) throw { name: 'Unauthenticated' };

    let user = await User.findByPk(payload.id);

    if (!user) throw { name: 'Unauthenticated' };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
