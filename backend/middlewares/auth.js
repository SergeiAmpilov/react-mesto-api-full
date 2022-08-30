const jwt = require('jsonwebtoken');
const BadUserError = require('../errors/bad-user-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new BadUserError('Необходима авторизация.');
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new BadUserError('Необходима авторизация..'));
    return true;
  }

  req.user = payload;
  next();
  return true;
};
