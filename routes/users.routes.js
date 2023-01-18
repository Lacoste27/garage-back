var express = require("express");
var userRouter = express.Router();
const {
  signup,
  login,
  getVoituresUser,
  addVoitureUser,
  deposerVoiture,
  alluserreparation,
  paiementReparation,
} = require("../services/user-service");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// Inscription
userRouter.post("/signup", signup);
// Connection
userRouter.post("/login", login);
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

module.exports = userRouter;
