var { getDatabase } = require("../models/connect");
const { ObjectId, ObjectID } = require("mongodb");

async function getDetailReparation(idreparation) {
  const connection = getDatabase();
  return connection
    .collection("reparation")
    .findOne({ _id: ObjectId(idreparation) });
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
      console.log(result);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

async function changeVoitureReparationEtat(repartion_id,reparation_details_id, etat) {
  const connection = getDatabase();

  connection
  .collection("reparation")
  .updateOne({ _id: ObjectId(repartion_id), "reparation_faire._id":ObjectId(reparation_details_id) }    , { $set: { "reparation_faire.$.etat": etat } })
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });
}

module.exports = {
  DetailReparation: getDetailReparation,
  AddVoitureReparation: addVoitureReparation,
  ChangeVoitureReparationEtat: changeVoitureReparationEtat,
};
