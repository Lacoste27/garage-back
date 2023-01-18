const { ObjectId } = require("mongodb");
var {
  DetailReparation,
  AddVoitureReparation,
  ChangeVoitureReparationEtat,
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
          .json({ data: rep ,message:"",success: true, error:false});
      }
    })
    .catch((error) => {
      console.log(error);
      return response.status(HttpStatusCodes.EXPECTATION_FAILED).json({data:{},message:error,success: false,error:true});
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
        .json({ data: {},  message: "Réparations voiture ajoutés" ,success: true,error:false});
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: {}, message: error ,success: false,error:true });
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
        .json({ data: {}, message: "Etat changé !" ,success: true,error:false });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: {}, message: error ,success: false,error:true });
    });
}

module.exports = {
  reparationDetail: detailReparation,
  addReparationVoiture: addReparationVoiture,
  changeVoitureReparationEtat: changeVoitureReparationState,
};
