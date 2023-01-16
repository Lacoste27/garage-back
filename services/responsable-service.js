const { ObjectId } = require("mongodb");
const { response } = require("../app");
const { GetAllReparation } = require("../repository/reparation-repository");
const {
  getResponsable,
  addResponsable,
  receptionVoiture,
} = require("../repository/responsable-repository");
const { HttpStatusCodes } = require("../utils/statuscode");
const { GetSalt, GetHash } = require("../utils/utils");

function newResponsable(request, response) {
  const data = request.body;

  const responsable = {
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    password: data.password,
    salt: "",
    roles: data.roles,
  };

  const password = responsable.password;
  const salt = GetSalt();

  responsable.salt = salt;
  responsable.password = GetHash(password, salt);

  getResponsable(responsable.email).then((result) => {
    if (result != null) {
      return response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: { message: "L'email saisi est déjà utilisé!" } });
    } else {
      const add = addResponsable(responsable);
      add
        .then(() => {
          return response
            .status(HttpStatusCodes.ACCEPTED)
            .json({ data: {}, message: "Nouveau responsable ajouter !" });
        })
        .catch((error) => {
          return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
        });
    }
  });
}

function ReceptionVoiture(request, response) {
  const body = request.body;
  const reparateur = {
    id: ObjectId(body.data.reparateur.id),
    nom: body.data.reparateur.nom,
    prenom: body.data.reparateur.prenom,
    email: body.data.reparateur.email,
  };

  const reparation_id = body.data.reparation_id;

  const reception = receptionVoiture(reparation_id, reparateur);
  reception
    .then(() => {
      response
        .status(HttpStatusCodes.ACCEPTED)
        .json({ data: { message: "Voiture recues" } });
    })
    .catch((error) => {
      response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: { message: error } });
    });
}


module.exports = {
  newResponsable: newResponsable,
  receptionVoiture: ReceptionVoiture
};
