const { error } = require("console");

const {
  GetSalt,
  GetHash,
  VerifyPassword,
  GenerateAccessToken,
} = require("../utils/utils");
const {
  validateemail,
  validateuserdata,
  validatevoituredata,
} = require("../utils/validation");
const { HttpStatusCodes } = require("../utils/statuscode");
var { SECRET_TOKEN } = require("../utils/parametre");
const jwt = require("jsonwebtoken");

const { ObjectId } = require("mongodb");
const { GetAllReparation } = require("../repository/reparation-repository");
const {
  getResponsable,
  addResponsable,
  receptionVoiture,
  validationPaiement,
} = require("../repository/responsable-repository");

function login(request, response) {
  const email = request.body.email;
  const password = request.body.password;

  const user = getResponsable(email);
  user
    .then((result) => {
      const user = result;
      console.log('---------')
      console.log(user)
      console.log('---------')
      if (VerifyPassword(user, password)) {
        const token = GenerateAccessToken(user);
        return response.status(HttpStatusCodes.ACCEPTED).json({
          data: {
            token: token,
          },
          message: "Vous êtes authentifié en tant que responsable",
        });
      } else {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ data: {}, message: "Votre mot de passe est incorrect" });
      }
    })
    .catch((error) => {
      console.log(error);
      return response.status(HttpStatusCodes.EXPECTATION_FAILED).json(error);
    });
}

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
        .json({
          data: {},
          message: "L'email saisi est déjà utilisé!",
          success: false,
          error: true,
        });
    } else {
      const add = addResponsable(responsable);
      add
        .then(() => {
          return response
            .status(HttpStatusCodes.ACCEPTED)
            .json({
              data: {},
              message: "Nouveau responsable ajouter !",
              success: true,
              error: false,
            });
        })
        .catch((error) => {
          return response
            .status(HttpStatusCodes.NOT_ACCEPTABLE)
            .json({ data: {}, message: error, success: false, error: true });
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
        .json({
          data: {},
          message: "Voiture recues",
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

function ValiderPaiement(request, response) {
  const body = request.body;

  const valideur = body.data.valideur;
  const paiement_id = ObjectId(body.data.paiement_id);

  const valider = validationPaiement(valideur, paiement_id);

  valider
    .then(() => {
      response
        .status(HttpStatusCodes.ACCEPTED)
        .json({
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
  login: login,
  newResponsable: newResponsable,
  receptionVoiture: ReceptionVoiture,
  validationPaiement: ValiderPaiement,
};
