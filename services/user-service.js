const { error } = require("console");
var { Signup, GetUser } = require("../repository/user-repository");
const { GetSalt, GetHash, VerifyPassword } = require("../utils/utils");

function signup(request, response) {
  const user = {
    nom: request.body.nom,
    prenom: request.body.prenom,
    email: request.body.email,
    password: request.body.password,
    salt: "",
  };

  const password = user.password;
  const salt = GetSalt();

  user.salt = salt;
  user.password = GetHash(password, salt);

  const insert = Signup(user);

  insert
    .then(() => {
      return response.json("Nouveau client ajouter !").status(200);
    })
    .catch((error) => {
      return response.json(error);
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
        return response.json({ message: "Vous etes authentifié" }).status(200);
      } else {
        return response
          .json({ message: "Votre mot de passe est incorrect" })
          .status(401);
      }
    })
    .catch((error) => {
      return response.json("error").status(400);
    });
}

module.exports = {
  signup: signup,
  login: login,
};
