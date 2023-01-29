var express = require("express");
var userRouter = express.Router();
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {
  signup,
  login,
  getVoituresUser,
  addVoitureUser,
  deposerVoiture,
  alluserreparation,
  paiementReparation,
  recuperationVoiture,
} = require("../services/user-service");
const { authenticateToken } = require('../middleware/client-middleware');
const { authenticateAtelierToken } = require('../middleware/atelier-middleware');
const { authenticateFinancierToken } = require('../middleware/financier-middleware')

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// Inscription
userRouter.post("/signup", signup);
// Connection
userRouter.post("/login", login);


//Utilisation Authentification
userRouter.use(authenticateToken);

// Liste des voitures de l'utilisateur connecté
userRouter.get('/voitures', getVoituresUser);

// Liste des voitures de l'utilisateur connecté
userRouter.get("/voitures", getVoituresUser);

// Ajouter une voiture pour l'utilisateur connecté
userRouter.post("/voitures", addVoitureUser);
// Deposer une voiture au garage
userRouter.get("/:voiture/depot", deposerVoiture);
// Liste des reparations de l'utilisateur
userRouter.get("/reparations", alluserreparation);
// Payer une factures
userRouter.post("/reparations/paiement", paiementReparation);
//recupere voiture 
userRouter.post("/recuperation", recuperationVoiture);

module.exports = userRouter;
