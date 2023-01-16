const { error } = require("console");
var { Signup, GetUser, AddUserVoiture, DeposerVoiture, AllUserReparations } = require("../repository/user-repository");
const { GetSalt, GetHash, VerifyPassword } = require("../utils/utils");
const { validateemail, validateuserdata, validatevoituredata } = require("../utils/validation");

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
      return response
        .status(HttpStatusCodes.CONFLICT)
        .json({ data: { message: "L'email saisi est déjà utilisé!" } });
    } else {
      if (message.result) {
        const password = user.password;
        const salt = GetSalt();

        user.salt = salt;
        user.password = GetHash(password, salt);

        const insert = Signup(user);

        insert
          .then(() => {
            return response
              .status(HttpStatusCodes.ACCEPTED)
              .json({ data: {}, message: "Nouveau client ajouter !" });
          })
          .catch((error) => {
            return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
          });
      } else {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ data: {}, message });
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
        return response
          .status(HttpStatusCodes.ACCEPTED)
          .json({ data: {}, message: "Vous êtes authentifié" });
      } else {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ data: {}, message: "Votre mot de passe est incorrect" });
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
    user.then((result) => {
      const utilisateur = result;
      if (utilisateur != null) {
        return response.status(HttpStatusCodes.ACCEPTED).json({ voitures: utilisateur.voitures })
      } else {
        return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("Utilisateur non trouvée");
      }

    }).catch((error) => {
      console.log(error);
      return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("error");
    })
  } else {
    return response.status(HttpStatusCodes.UNAUTHORIZED).json("Pas d'utilisateur connectée");
  }
};

function addVoitureUser(request, response) {
  const email = "yroist@email.com";

  const voiture = {
    numero: request.body.numero,
    marque: request.body.marque,
    model: request.body.model
  };

  const message = validatevoituredata(voiture.numero, voiture.marque, voiture.model);

  // if user is authenticated
  if (email != null) {
    if (message.result) {
      const insert = AddUserVoiture(voiture, email);

      insert.then((result) => {
        return response
          .status(HttpStatusCodes.ACCEPTED)
          .json({ data: {}, message: "Nouvel voiture ajouté" });
      }).catch((error) => {
        return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
      });
    } else {
      return response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message });
    }
  } else {
    return response.status(HttpStatusCodes.UNAUTHORIZED).json("Pas d'utilisateur connectée");
  }
}

function deposerVoitureUser(request, response) {
  const email = "yroist@email.com";

  const numeroVoiture = request.params.voiture;

  const user = GetUser(email);

  var voiture = null;

  user.then((result) => {
    result.voitures.forEach(element => {
      if (element.numero == numeroVoiture) {
        console.log(element);
        voiture = element;
      }
    });

    if (voiture != null) {
      const deposerVoiture = DeposerVoiture(voiture, { id: result._id, nom: result.nom, prenom: result.prenom, email: result.email });
      deposerVoiture.then((value) => {
        return response
          .status(HttpStatusCodes.ACCEPTED)
          .json({ data: {}, message: "Nouveau reparation ajouté" });
      }).catch((error) => {
        console.log(error)
        return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
      })
    } else {
      return response
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ data: {}, message: "La voiture n'appartient pas à l'utilisateur ou n'existe pas" });
    }

  }).catch((error) => {
    console.log(error)
    return response.status(HttpStatusCodes.NOT_ACCEPTABLE).json(error);
  });
}

function getAllReparation(request, response) {
  const email = "yroist@email.com";

  const reparations = AllUserReparations(email);
  reparations.then((result) => {
    const reps = result;
    if (reps != null) {
      return response.status(HttpStatusCodes.ACCEPTED).json({ reparations: reps });
    }
  }).catch((error) => {
    console.log(error);
    return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("Reparations non trouvée");
  })
}


module.exports = {
  signup: signup,
  login: login,
  getVoituresUser: getVoituresUser,
  addVoitureUser: addVoitureUser,
  deposerVoiture: deposerVoitureUser,
  alluserreparation: getAllReparation
};