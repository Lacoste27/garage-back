async function getResponsable(email) {
  const connection = getDatabase();
  return connection.collection("responsable").findOne({ email: email });
}

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../models/connect");
const { REPARATIONETAT } = require("../utils/utils");

async function addResponsable(responsable) {
  const financier = {
    nom: responsable.nom,
    prenom: responsable.prenom,
    email: responsable.email,
    password: responsable.password,
    salt: responsable.salt,
    roles: responsable.roles,
  };

  const connection = getDatabase();

  connection
    .collection("responsable")
    .insertOne(financier)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function getResponsable(email) {
  const connection = getDatabase();
  return connection.collection("responsable").findOne({ email: email });
}

// Responssable atelier
async function receptionVoiture(reparation_id, reparateur) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne(
      { _id: ObjectId(reparation_id) },
      { $set: { reparateur: reparateur, status: REPARATIONETAT.encours } }
    )
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function validerBonSortie(reparation_id, atelier) {
  const connection = getDatabase();

  const valideur = {
    nom: atelier.nom,
    prenom: atelier.prenom,
    email: atelier.email,
  };

  connection
    .collection("reparation")
    .updateOne(
      { _id: ObjectId(reparation_id) },
      { $set: { "sortie.valideur": valideur, "sortie.valid": 1, "date_sortie":new Date() } }
    );
}

// Responsable financier
async function validerPaiement(valideur, paiement_id) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne(
      { "paiement._id": ObjectId(paiement_id) },
      { $set: { "paiement.valideur": valideur, "paiement.valid": 1, "date_sortie":new Date() } }
    )
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = {
  addResponsable: addResponsable,
  getResponsable: getResponsable,
  receptionVoiture: receptionVoiture,
  validationPaiement: validerPaiement,
  validerBonSortie : validerBonSortie
};
