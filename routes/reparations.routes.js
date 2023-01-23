var express = require('express');
var reparationRouter = express.Router();

const { reparationDetail, addReparationVoiture, changeVoitureReparationEtat, getAllReparations, getListeReparation, getHistoriqueVoiture } = require('../services/reparation-service');

// receuperer tous les réparations
reparationRouter.get('/', getAllReparations);

// liste avec filtre réparations
reparationRouter.get('/liste', getListeReparation);

// Detail d'une reparation
reparationRouter.get('/:idreparation/detail', reparationDetail);

//ajouter les réparations d'un voitures
reparationRouter.post('/voiture/add', addReparationVoiture);

//changer etat details reparartions d'une voitures
reparationRouter.post('/voiture/change', changeVoitureReparationEtat);

//Historique de réparation d'une voiture
reparationRouter.get('/:idvoiture/historique', getHistoriqueVoiture);

module.exports = reparationRouter;