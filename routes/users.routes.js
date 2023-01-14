var express = require('express');
var userRouter = express.Router();
var crypto = require('crypto');
const { signup, login } = require('../services/user-service');


/* GET users listing. */
userRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

userRouter.post('/signup',signup);
userRouter.post('/login',login);

module.exports = userRouter;
