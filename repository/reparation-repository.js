var { getDatabase } = require("../models/connect");
const { ObjectId, ObjectID } = require("mongodb");

async function getDetailReparation(idreparation) {
  const connection = getDatabase();
  return connection
    .collection("reparation")
    .findOne({ _id: ObjectId(idreparation) });
}

async function getAllReparation() {
  const connection = getDatabase();
  return connection.collection("reparation").find({}).toArray();
}

async function getListeReparation(etat){  
  const connection = getDatabase();
  return connection.collection("reparation").find({status:etat}).toArray();
}

async function addVoitureReparation(reparation_id, reparations) {
  const connection = getDatabase();
  connection
    .collection("reparation")
    .updateOne(
      { _id: ObjectId(reparation_id) },
      { $push: { reparation_faire: reparations } }
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function changeVoitureReparationEtat(
  repartion_id,
  reparation_details_id,
  etat
) {
  const connection = getDatabase();

  connection
    .collection("reparation")
    .updateOne(
      {
        _id: ObjectId(repartion_id),
        "reparation_faire._id": ObjectId(reparation_details_id),
      },
      { $set: { "reparation_faire.$.etat": etat } }
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = {
  GetAllReparation: getAllReparation,
  GetListeReparation: getListeReparation,
  DetailReparation: getDetailReparation,
  AddVoitureReparation: addVoitureReparation,
  ChangeVoitureReparationEtat: changeVoitureReparationEtat,
};
