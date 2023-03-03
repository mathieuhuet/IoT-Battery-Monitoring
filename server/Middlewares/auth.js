const jwt = require('jsonwebtoken');
const User = require('./../Models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'this isnt secure';


const authMiddleware = async (ctx, next) => {
  // extract token from auth headers
  const authHeaders = ctx.request.headers['authorization'];
  if (!authHeaders) return ctx.status = 403;
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({where: { id }});
    if (!user) return ctx.status = 401;
    ctx.request.user = user;
    next();
  } catch (error) {
    ctx.status = 401;
    console.log(error);
  }
};

module.exports = authMiddleware;
