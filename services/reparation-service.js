const { ObjectId } = require("mongodb");
var {
  DetailReparation,
  AddVoitureReparation,
  ChangeVoitureReparationEtat,
  GetAllReparation,
} = require("../repository/reparation-repository");
const { HttpStatusCodes } = require("../utils/statuscode");
const { REPARATIONETAT, VOITUREREPARATIONETAT } = require("../utils/utils");

function detailReparation(request, response) {
  const idreparation = request.params.idreparation;

  const reparation = DetailReparation(idreparation);
  reparation
    .then((result) => {
      const rep = result;
      console.log(rep);
      if (rep != null) {
        return response
          .status(HttpStatusCodes.ACCEPTED)
          .json({ reparation: rep });
      }
    })
    .catch((error) => {
      console.log(error);
      return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("error");
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
      response
        .status(HttpStatusCodes.CREATED)
        .json({ data: {}, message: "Réparations voiture ajoutés" });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: {}, message: error });
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
      response
        .status(HttpStatusCodes.CREATED)
        .json({ data: { message: "Etat changé !" } });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: { message: error } });
    });
}

function GetAllReparations(request, response) {
  const allReparations = GetAllReparation();

  allReparations
    .then((reparartions) => {
      response.status(HttpStatusCodes.ACCEPTED).json({ data: { reparartions } });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message: error });
    });
}

module.exports = {
  reparationDetail: detailReparation,
  addReparationVoiture: addReparationVoiture,
  changeVoitureReparationEtat: changeVoitureReparationState,
  getAllReparations: GetAllReparations,
};
