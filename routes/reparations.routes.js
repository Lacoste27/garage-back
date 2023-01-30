var express = require("express");
var reparationRouter = express.Router();

const {
  reparationDetail,
  addReparationVoiture,
  changeVoitureReparationEtat,
  getAllReparations,
  getListeReparation,
  getHistoriqueVoiture,
  changeReparationEtat,
  getPaiementAValider,
  getVoitureASortir,
} = require("../services/reparation-service");

// receuperer tous les réparations
reparationRouter.get("/", getAllReparations);

// liste avec filtre réparations
reparationRouter.get("/liste", getListeReparation);

// Detail d'une reparation
reparationRouter.get("/:idreparation/detail", reparationDetail);

//ajouter les réparations d'un voitures
reparationRouter.post("/voiture/add", addReparationVoiture);

//changer etat details reparartions d'une voitures
reparationRouter.post("/voiture/change", changeVoitureReparationEtat);

//changer etat réparations
reparationRouter.post("/change", changeReparationEtat);

//Historique de réparation d'une voiture
reparationRouter.get("/:idvoiture/historique", getHistoriqueVoiture);

//Liste de paiement reparations à valider
reparationRouter.get("/paiements/liste", getPaiementAValider);

//Liste des voitures à sortir
reparationRouter.get("/sortir/liste", getVoitureASortir);

module.exports = reparationRouter;
