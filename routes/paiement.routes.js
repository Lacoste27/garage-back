var express = require("express");
const { Liste, ValiderPaiement } = require("../services/paiement-service");
var paiementRouter = express.Router();

//Liste de paiement reparations à valider
paiementRouter.get("/liste", Liste);

//Validaiton paiement
paiementRouter.post("/validation",ValiderPaiement);

module.exports = paiementRouter;
