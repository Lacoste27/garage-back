const { ObjectId } = require("mongodb");
const { getDatabase } = require("../models/connect");

async function GetListePaiement() {
  const connection = getDatabase();
  return connection
    .collection("reparation")
    .find({ "paiement.valid": 0 })
    .toArray();
}

async function ValiderPaiement(valideur, paiement_id) {
  const connection = getDatabase();

  return connection
    .collection("reparation")
    .updateOne(
      { "paiement._id": ObjectId(paiement_id) },
      { $set: { "paiement.valideur": valideur, "paiement.valid": 1 } }
    )
}

module.exports = {
  getListePaiement: GetListePaiement,
  validerPaiement: ValiderPaiement,
};
