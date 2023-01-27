var express = require('express');
const { all, addDepense, getDepense } = require('../services/depense-service');
var depenseRouter = express.Router();


// add salaire atelier;
depenseRouter.post("/add", addDepense);

//liste depense 
depenseRouter.get("/all", all);

//
depenseRouter.get("/get", getDepense);



module.exports = depenseRouter;
