const { ObjectId } = require("mongodb");
var {
  DetailReparation,
  AddVoitureReparation,
  ChangeVoitureReparationEtat,
  GetAllReparation,
  GetReparationVoiture,
  GetListeReparation,
  ChangeReparationEtat,
  GetPaiementAvalider,
  GetVoitureASortir,
} = require("../repository/reparation-repository");
const { HttpStatusCodes } = require("../utils/statuscode");
const {
  REPARATIONETAT,
  VOITUREREPARATIONETAT,
  SendMail,
  TotalReparation,
} = require("../utils/utils");
const ejs = require('ejs');

function detailReparation(request, response) {
  const idreparation = request.params.idreparation;

  const reparation = DetailReparation(idreparation);
  reparation
    .then((result) => {
      const rep = result;
      console.log(rep);
      if (rep != null) {
        return response.status(HttpStatusCodes.ACCEPTED).json({
          data: { reparation: rep },
          message: "",
          success: true,
          error: false,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function addReparationVoiture(request, response) {
  const body = request.body;
  const reparation_id = body.data.reparation_id;

  const reparations = {
    _id: new ObjectId(),
    cause: body.data.reparations.cause,
    solution: body.data.reparations.solution,
    prix: body.data.reparations.prix,
    etat: VOITUREREPARATIONETAT.encours,
  };

  const add = AddVoitureReparation(reparation_id, reparations);

  add
    .then(() => {
      response.status(HttpStatusCodes.CREATED).json({
        data: {},
        message: "Réparations voiture ajoutés",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function changeVoitureReparationState(request, response) {
  const body = request.body;

  const reparation_detail_id = body.data.reparation_detail_id;
  const reparation_id = body.data.reparation_id;
  const etat = body.data.etat;

  const change = ChangeVoitureReparationEtat(
    reparation_id,
    reparation_detail_id,
    etat
  );
  change
    .then(() => {
      response.status(HttpStatusCodes.CREATED).json({
        data: {},
        message: "Etat changé !",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function GetAllReparations(request, response) {
  const allReparations = GetAllReparation();

  allReparations
    .then((reparartions) => {
      response
        .status(HttpStatusCodes.ACCEPTED)
        .json({ data: { reparartions }, success: true, error: false });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message: error });
    });
}

function getHistoriqueVoiture(request, response) {
  const numeroVoiture = request.params.idvoiture;
  const historiques = GetReparationVoiture(numeroVoiture);

  historiques
    .then((hist) => {
      response
        .status(HttpStatusCodes.ACCEPTED)
        .json({ data: { historiques: hist }, success: true, error: false });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function GetListeReparations(request, response) {
  const etat = request.query.etat;
  console.log(etat);

  const allReparations = GetListeReparation(etat);

  allReparations
    .then((reparartions) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: { reparartions },
        message: "",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function changeReparationEtat(request, response) {
  const body = request.body;

  const reparation_id = body.data.reparation_id;
  const etat = body.data.etat;

  const reparation = DetailReparation(reparation_id).then((response) => {
    const Total = TotalReparation(response.reparation_faire);
    const change = ChangeReparationEtat(reparation_id, etat);

    const data = ejs
      .renderFile("./views/pages/email.ejs", {
        reparation: response,
        total: Total,
      })
      .then((result) => {
        SendMail(result, "robsonatsiory07@gmail.com");
      });
  });

  reparation
    .then((result) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {},
        message: "Etat changé",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response.status(HttpStatusCodes.EXPECTATION_FAILED).json({
        data: {},
        message: error,
        success: false,
        error: true,
      });
    });
}

function getPaiementAValider(request, response){  
    const paiement_a_valider = GetPaiementAvalider();
    paiement_a_valider.then((response) =>{
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: { reparations },
        message: "Liste des paiements à valider",
        success: true,
        error: false,
      });
    }).catch((error) =>{
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: { },
        message: error,
        success: false,
        error: true,
      });
    })
}

function getVoitureASortir(request, response){  
  const voitures = GetVoitureASortir();
  voitures.then((_voitures) =>{
    response.status(HttpStatusCodes.ACCEPTED).json({
      data: _voitures,
      message: "Liste des voiture à sortir",
      success: true,
      error: false,
    });
  }).catch((error) =>{
    response.status(HttpStatusCodes.EXPECTATION_FAILED).json({
      data: { },
      message: error,
      success: false,
      error: true,
    });
  })
}

const reparation = (module.exports = {
  reparationDetail: detailReparation,
  addReparationVoiture: addReparationVoiture,
  changeVoitureReparationEtat: changeVoitureReparationState,
  getAllReparations: GetAllReparations,
  getHistoriqueVoiture: getHistoriqueVoiture,
  getListeReparation: GetListeReparations,
  changeReparationEtat: changeReparationEtat,
  getPaiementAValider: GetPaiementAvalider,
  getVoitureASortir: getVoitureASortir
});
