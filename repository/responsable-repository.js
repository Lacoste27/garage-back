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

async function receptionVoiture(reparation_id, reparateur) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne({ _id: ObjectId(reparation_id) }, { $set: { reparateur: reparateur,status: REPARATIONETAT.encours } })
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
};
