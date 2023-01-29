const { getDatabase } = require("../models/connect");

async function addDepense(data) {
  const connection = getDatabase();
  return connection
    .collection("depense")
    .insertOne(data)
    .then((inserted) => {
      return inserted;
    })
    .catch((error) => {
      return error;
    });
}

async function all() {
  const connection = getDatabase();
  return connection.collection("depense").find().toArray();
}

async function get(filter) {
  const connection = getDatabase();
  return connection
    .collection("depense")
    .find(...filter)
    .toArray();
}

module.exports = {
  addDepense: addDepense,
  all: all,
  getDepense: get
};
