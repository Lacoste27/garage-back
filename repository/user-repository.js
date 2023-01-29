const { Console } = require("console");
var { getDatabase } = require("../models/connect");

async function signup(newuser) {
  const user = {
    nom: newuser.nom,
    prenom: newuser.prenom,
    email: newuser.email,
    password: newuser.password,
    salt: newuser.salt,
    role: "client",
    voitures: [],
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
    model: newvoiture.model,
  };

  const connection = getDatabase();

  connection
    .collection("client")
    .updateOne({ email: emailUser }, { $push: { voitures: voiture } })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function deposerVoiture(voiture, client) {
  const reparation = {
    date_depot: new Date(),
    date_sortie: null,
    paiement: {},
    client: {
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
    },
    voiture: voiture,
    reparateur: {},
    reparation_faire: [],
    status: "Deposer",
    sortie: {},
  };

  const connection = getDatabase();

  connection
    .collection("reparation")
    .insertOne(reparation)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function getreparationsuser(email) {
  const connection = getDatabase();
  return connection
    .collection("reparation")
    .find({ "client.email": email })
    .toArray();
}

async function paiementReparation(paiement, reparation_id) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne({ _id: reparation_id }, { $set: { paiement: paiement } })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function recuperationVoiture(reparation_id) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne(
      { _id: reparation_id },
      { $set: { sortie: { date_demande: new Date(), valideur: {}, valid: 0 } } }
    ).then((result) => {
      return result;
    }).catch((error) => {  
      return error;
    }) 
}

module.exports = {
  Signup: signup,
  GetUser: getUser,
  AddUserVoiture: addVoitureToUser,
  DeposerVoiture: deposerVoiture,
  AllUserReparations: getreparationsuser,
  PaiementReparation: paiementReparation,
  RecuperationVoiture: recuperationVoiture
};
