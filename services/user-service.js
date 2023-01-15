const { error } = require("console");
var { Signup, GetUser } = require("../repository/user-repository");
const { HttpStatusCodes } = require("../utils/statuscode");
const { GetSalt, GetHash, VerifyPassword } = require("../utils/utils");
const { validateemail, validateuserdata } = require("../utils/validation");

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

module.exports = {
  signup: signup,
  login: login,
};
