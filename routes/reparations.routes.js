var express = require('express');
var reparationRouter = express.Router();
const { reparationDetail, addReparationVoiture, changeVoitureReparationEtat } = require('../services/reparation-service');

// Detail d'une reparation
reparationRouter.get('/:idreparation/detail', reparationDetail);

//ajouter les réparations d'un voitures
reparationRouter.post('/voiture/add', addReparationVoiture);

//changer etat details reparartions d'une voitures
reparationRouter.post('/voiture/change', changeVoitureReparationEtat);

module.exports = reparationRouter;