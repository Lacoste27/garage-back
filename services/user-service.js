const { error } = require("console");
const { ObjectId } = require("mongodb");
const { DetailReparation } = require("../repository/reparation-repository");
var {
  Signup,
  GetUser,
  AddUserVoiture,
  DeposerVoiture,
  AllUserReparations,
  PaiementReparation,
} = require("../repository/user-repository");
const { HttpStatusCodes } = require("../utils/statuscode");
const {
  GetSalt,
  GetHash,
  VerifyPassword,
  TotalPaiement,
} = require("../utils/utils");
const {
  validateemail,
  validateuserdata,
  validatevoituredata,
} = require("../utils/validation");

function paiement(request, response) {
  const body = request.body;

  const paiement = {
    _id: new ObjectId(),
    date: new Date(),
    mode: body.data.paiement.mode,
    recu: body.data.paiement.recu,
    rendu: 0,
    valideur: {},
    valid: 0,
  };

  const reparation_id = ObjectId(body.data.reparation_id);

  const detail = DetailReparation(reparation_id).then((result) => {
    const total = TotalPaiement(result.reparation_faire);
    if (total > paiement.recu) {
      response.status(HttpStatusCodes.NOT_ACCEPTABLE).json({
        data: { total: total },
        message: "Le montant est inférieur au total de la facture",
        success: false,
        error: true,
      });
    } else {
      paiement.rendu = paiement.recu - total;
      const paiements = PaiementReparation(paiement, reparation_id);

      paiements
        .then(() => {
          response.status(HttpStatusCodes.ACCEPTED).json({
            data: {},
            message: "Reparations payé",
            success: true,
            error: false,
          });
        })
        .catch((erreur) => {
          response
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ data: {}, message: erreur, success: false, error: true });
        });
    }
  });
}

function signup(request, response) {
  const user = {
    nom: request.body.nom,
    prenom: request.body.prenom,
    email: request.body.email,
    password: request.body.password,
    salt: "",
  };

  const message = validateuserdata(
    user.email,
    user.nom,
    user.prenom,
    user.password
  );
  const _user = GetUser(user.email).then((result) => {
    if (result != null) {
      return response.status(HttpStatusCodes.CONFLICT).json({
        data: {},
        message: "L'email saisi est déjà utilisé!",
        success: false,
        error: true,
      });
    } else {
      if (message.result) {
        const password = user.password;
        const salt = GetSalt();

        user.salt = salt;
        user.password = GetHash(password, salt);

        const insert = Signup(user);

        insert
          .then(() => {
            return response.status(HttpStatusCodes.ACCEPTED).json({
              data: {},
              message: "Nouveau client ajouter !",
              success: false,
              error: true,
            });
          })
          .catch((error) => {
            return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
          });
      } else {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ data: {}, message: "", success: false, error: true });
      }
    }
  });
}

function login(request, response) {
  const email = request.body.email;
  const password = request.body.password;

  const user = GetUser(email);
  user
    .then((result) => {
      const user = result;
      if (VerifyPassword(user, password)) {
        return response.status(HttpStatusCodes.ACCEPTED).json({
          data: {},
          message: "Vous êtes authentifié",
          success: false,
          error: true,
        });
      } else {
        return response.status(HttpStatusCodes.UNAUTHORIZED).json({
          data: {},
          message: "Votre mot de passe est incorrect",
          success: false,
          error: true,
        });
      }
    })
    .catch((error) => {
      return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("error");
    });
}

function getVoituresUser(request, response) {
  // const email = request.email;
  const email = "tsiory@email.com";

  // if user is authenticated
  if (email != null) {
    const user = GetUser(email);
    user
      .then((result) => {
        const utilisateur = result;
        if (utilisateur != null) {
          return response.status(HttpStatusCodes.ACCEPTED).json({
            data: utilisateur.voitures,
            message: "",
            success: true,
            error: false,
          });
        } else {
          return response
            .status(HttpStatusCodes.EXPECTATION_FAILED)
            .json("Utilisateur non trouvée");
        }
      })
      .catch((error) => {
        console.log(error);
        return response
          .status(HttpStatusCodes.EXPECTATION_FAILED)
          .json("error");
      });
  } else {
    return response
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json("Pas d'utilisateur connectée");
  }
}

function addVoitureUser(request, response) {
  const email = "yroist@email.com";

  const voiture = {
    numero: request.body.numero,
    marque: request.body.marque,
    model: request.body.model,
  };

  const message = validatevoituredata(
    voiture.numero,
    voiture.marque,
    voiture.model
  );

  // if user is authenticated
  if (email != null) {
    if (message.result) {
      const insert = AddUserVoiture(voiture, email);

      insert
        .then((result) => {
          return response
            .status(HttpStatusCodes.ACCEPTED)
            .json({ data: {}, message: "Nouvel voiture ajouté" });
        })
        .catch((error) => {
          return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
        });
    } else {
      return response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message });
    }
  } else {
    return response
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json("Pas d'utilisateur connectée");
  }
}

function deposerVoitureUser(request, response) {
  const email = "yroist@email.com";

  const numeroVoiture = request.params.voiture;

  const user = GetUser(email);

  var voiture = null;

  user
    .then((result) => {
      result.voitures.forEach((element) => {
        if (element.numero == numeroVoiture) {
          console.log(element);
          voiture = element;
        }
      });

      if (voiture != null) {
        const deposerVoiture = DeposerVoiture(voiture, {
          id: result._id,
          nom: result.nom,
          prenom: result.prenom,
          email: result.email,
        });
        deposerVoiture
          .then((value) => {
            return response
              .status(HttpStatusCodes.ACCEPTED)
              .json({ data: {}, message: "Nouveau reparation ajouté" });
          })
          .catch((error) => {
            console.log(error);
            return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
          });
      } else {
        return response.status(HttpStatusCodes.BAD_REQUEST).json({
          data: {},
          message:
            "La voiture n'appartient pas à l'utilisateur ou n'existe pas",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
    });
}

function getAllReparation(request, response) {
  const email = "yroist@email.com";

  const reparations = AllUserReparations(email);
  reparations
    .then((result) => {
      const reps = result;
      if (reps != null) {
        return response
          .status(HttpStatusCodes.ACCEPTED)
          .json({ reparations: reps });
      }
    })
    .catch((error) => {
      console.log(error);
      return response
        .status(HttpStatusCodes.EXPECTATION_FAILED)
        .json("Reparations non trouvée");
    });
}

module.exports = {
  signup: signup,
  login: login,
  getVoituresUser: getVoituresUser,
  addVoitureUser: addVoitureUser,
  deposerVoiture: deposerVoitureUser,
  alluserreparation: getAllReparation,
  paiementReparation: paiement,
};
