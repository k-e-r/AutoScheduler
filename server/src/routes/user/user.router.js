const express = require('express');
const { setUser, searchUser } = require('./user.controller');

const userRouter = express.Router();

userRouter.post('/register', setUser);
userRouter.post('/login', searchUser);

module.exports = userRouter;
