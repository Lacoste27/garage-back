const { ObjectId } = require("mongodb");
const { getListePaiement, validerPaiement } = require("../repository/paiement-repository");
const { HttpStatusCodes } = require("../utils/statuscode");

function liste(request, response) {
  const paiement_list = getListePaiement();
  paiement_list
    .then((paiements) => {
      return response
        .status(HttpStatusCodes.ACCEPTED)
        .json({ data: { paiements }, message:"Listes de paiements" ,success: true, error: false });
    })
    .catch((error) => {
      return response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {  }, message:error ,success: false, error: true });
    });
}

function ValiderPaiement(request, response) {
    const body = request.body;
  
    const valideur = body.data.valideur;
    const paiement_id = ObjectId(body.data.paiement_id);
  
    const valider = validerPaiement(valideur, paiement_id);

    console.log(valider);
  
    valider
      .then(() => {
        response.status(HttpStatusCodes.ACCEPTED).json({
          data: {},
          message: "Paiement validé !",
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
  

module.exports = {
  Liste: liste,
  ValiderPaiement: ValiderPaiement
};
