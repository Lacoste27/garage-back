var express = require('express');
var reparationRouter = express.Router();
const { reparationDetail, addReparationVoiture, changeVoitureReparationEtat, getAllReparations, totalReparation } = require('../services/reparation-service');

// receuperer tous les réparations
reparationRouter.get('/', getAllReparations);
// Detail d'une reparation
reparationRouter.get('/:idreparation/detail', reparationDetail);

//ajouter les réparations d'un voitures
reparationRouter.post('/voiture/add', addReparationVoiture);

//total reparation
reparationRouter.get('/:reparation_id/total', totalReparation);

//changer etat details reparartions d'une voitures
reparationRouter.post('/voiture/change', changeVoitureReparationEtat);

module.exports = reparationRouter;