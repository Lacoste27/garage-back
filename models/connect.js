var { MongoClient } = require("mongodb");
var { Parametre } = require("../utils/parametre.js");

function getGarageDatabase() {
  const client = new MongoClient(Parametre.uri);
  async () => {
    await client.connect();
  };
  return client.db('garage');
}

module.exports = {
  getDatabase: getGarageDatabase,
};
