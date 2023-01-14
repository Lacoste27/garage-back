const { Console } = require("console");
var { getDatabase } = require("../models/connect");

async function signup(newuser) {
  const user = {
    nom: newuser.nom,
    prenom: newuser.prenom,
    email: newuser.email,
    password: newuser.password,
    salt: newuser.salt,
  };

  const connection = getDatabase();
  
  connection
    .collection("client")
    .insertOne(user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function getUser(email) {
  const connection = getDatabase();

  return connection.collection("client").findOne({ email: email });
}

module.exports = {
  Signup: signup,
  GetUser: getUser,
};
