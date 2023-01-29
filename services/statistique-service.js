const { ObjectId } = require("mongodb");
const { HttpStatusCodes } = require("../utils/statuscode");
const {
  temps,
  chiffrejour,
  chiffreMois,
  depenseMois,
  countClientReparation,
  countAtelierReparation,
} = require("../repository/statistique-repository");
const { REPARATIONETAT } = require("../utils/utils");
const query = require("node:querystring")

function tempsMoyen(request, response) {
  const temp = temps();
  temp
    .then((reponse) => {
      console.log(reponse);
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {
          tempsmoyen: reponse,
        },
        message: "",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      console.log(error);
      response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function chiffreParJour(request, response) {
  const chiffrebyDay = chiffrejour();
  chiffrebyDay
    .then((reponse) => {
      console.log(reponse);
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {
          chiffreJour: reponse,
        },
        message: "",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      console.log(error);
      response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function chiffreParMois(request, response) {
  const chiffreByMonth = chiffreMois();
  chiffreByMonth
    .then((reponse) => {
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {
          chiffreMonth: reponse,
        },
        message: "",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      console.log(error);
      response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function depenseParMois(request, response) {
  const depenseByMonth = depenseMois();
  depenseByMonth
    .then((reponse) => {
      console.log(reponse);
      response.status(HttpStatusCodes.ACCEPTED).json({
        data: {
          depenseMonth: reponse,
        },
        message: "",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      console.log(error);
      response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json({ data: {}, message: error, success: false, error: true });
    });
}

function CountClientReparation(request, response) {
  const client = request.query.email;

  const all = countClientReparation(client, "all");
  const encours = countClientReparation(client, REPARATIONETAT.encours);
  const finis = countClientReparation(client, REPARATIONETAT.fini);
  const sortie = countClientReparation(client, REPARATIONETAT.sortie);

  Promise.all([all, encours, finis, sortie])
    .then((values) => {
      const count = {
        all: values[0],
        encours: values[1],
        finis: values[2],
        sortie: values[3],
      };

      response.status(HttpStatusCodes.ACCEPTED).json({
        data: count,
        message: "Statistique de réparation client",
        success: true,
        error: false,
      });
    })
    .catch((error) => {
      response.status(HttpStatusCodes.EXPECTATION_FAILED).json({
        data: {},
        message: erro,
        success: false,
        error: true,
      });
    });
}

function CountAtelierReparation(request, response) {
  const atelier = request.query.email;

  const all = countAtelierReparation(atelier, "all");
  const encours = countAtelierReparation(atelier, REPARATIONETAT.encours);
  const finis = countAtelierReparation(atelier, REPARATIONETAT.fini);
  const sortie = countAtelierReparation(atelier, REPARATIONETAT.sortie);

  Promise.all([all, encours, finis, sortie])
    .then((values) => {
      const count = {
        all: values[0],
        encours: values[1],
        finis: values[2],
        sortie: values[3],
      };

      response.status(HttpStatusCodes.ACCEPTED).json({
        data: count,
        message: "Statistique de réparation atelier",
        success: true,
        error: false,
      }); // [3, 1337, "foo"]
    })
    .catch((error) => {
      response.status(HttpStatusCodes.EXPECTATION_FAILED).json({
        data: {},
        message: erro,
        success: false,
        error: true,
      });
    });
}

module.exports = {
  moyen: tempsMoyen,
  chiffreParJour: chiffreParJour,
  chiffreParMois: chiffreParMois,
  depenseParMois: depenseParMois,
  countAtelierReparation: CountAtelierReparation,
  countClientReparation: CountClientReparation,
};
