const { Console } = require("console");
var { getDatabase } = require("../models/connect");

async function signup(newuser) {
  const user = {
    nom: newuser.nom,
    prenom: newuser.prenom,
    email: newuser.email,
    password: newuser.password,
    salt: newuser.salt,
    voitures: []
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

async function addVoitureToUser(newvoiture, emailUser) {
  const voiture = {
    numero: newvoiture.numero,
    marque: newvoiture.marque,
    model: newvoiture.model
  }

  const connection = getDatabase();

  connection.collection("client").updateOne({ email: emailUser }, { $push: { voitures: newvoiture } }).then((result) => {
    return result;
  }).catch((error) => {
    return error;
  })
}

module.exports = {
  Signup: signup,
  GetUser: getUser,
  AddUserVoiture: addVoitureToUser,
};
