const { addDepense, all } = require("../repository/depense.repository");
const { HttpStatusCodes } = require("../utils/statuscode");

function AddDepense(request, response) {
  const data = request.body.data;
  const add = addDepense(data);

  add
    .then((result) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {},
        message: "Depenses ajoutés !",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response.status(HttpStatusCodes.EXPECTATION_FAILED).json({
        data: { },
        message: error,
        success: false,
        error: true,
      });
    });
}

function All(request, response) {
  const liste = all();

  liste
    .then((depenses) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: { depenses },
        message: "Liste des depenses !",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {},
        message: error,
        success: false,
        error: true,
      });
    });
}

module.exports = {
  addDepense: AddDepense,
  all: All,
};
