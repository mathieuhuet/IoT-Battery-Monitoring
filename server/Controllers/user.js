const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'this isnt secure';


const create = async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ where: { email: email }});
  if (user) {
    ctx.status = 409;
    ctx.body = {
      error: true,
      message: 'user already exist',
      data: null,
    }
    return
  }
  try {
    if (password === '') throw new Error('Password cannot be empty');
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...ctx.request.body,
      password: hash,
    });
    const { id } = await newUser.save();
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    ctx.status = 201;
    ctx.body = { error: false, message: 'User created successfully', data: {accessToken}}
  } catch (error) {
    console.log('Error at User controller (create)', error);
    if (error.message === 'Password cannot be empty') {
      ctx.status = 400;
      ctx.body = {
        error: true,
        message: error.message,
        data: null,
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        error: true,
        message: 'Internal server error',
        data: null,
      }
    }
  }
};

const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error('Wrong Password (or username)');
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    ctx.status = 200;
    ctx.body = { error: false, message: 'User loged in successfully', data: {accessToken}}
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error: true,
      message: 'Username or password incorrect',
      data: null,
    }
  }
};

const profile = async (ctx) => {
  try {
    const { id, firstName, lastName } = ctx.request.user;
    const user = { id, firstName, lastName };
    ctx.status = 200;
    ctx.body = { error: false, message: 'User data loaded successfully', data: user}
  } catch {
    ctx.status = 504;
    ctx.body = {
      error: true,
      message: 'Resource not found, from User Controller profile function',
      data: null,
    }
  }
};

const logout = (ctx) => {
  // delete the token client side upon logout.
  // you would invalidate the token here.
};

module.exports = { create, login, profile, logout };
