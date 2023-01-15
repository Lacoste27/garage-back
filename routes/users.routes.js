var express = require('express');
var userRouter = express.Router();
var crypto = require('crypto');
const { signup, login, getVoituresUser, addVoitureUser } = require('../services/user-service');


/* GET users listing. */
userRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// Inscription 
userRouter.post('/signup', signup);
// Connection
userRouter.post('/login', login);
// Liste des voitures de l'utilisateur connecté
userRouter.get('/voitures', getVoituresUser);
// Ajouter une voiture pour l'utilisateur connecté
userRouter.post('/voitures', addVoitureUser);

module.exports = userRouter;
