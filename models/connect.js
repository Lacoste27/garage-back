var { MongoClient } = require('mongodb');
var { Parametre } = require('../utils/parametre.js');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */


async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const client = new MongoClient(Parametre.uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        // await listDatabases(client);
        await getGarageDatabase(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    var databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getGarageDatabase() {

    const client = new MongoClient(Parametre.uri);
    await client.connect().then((value) => {
        return value.db("garage");
    }).finally(client => {
        client.close()
    });

}

module.exports = {
    getDatabase: getGarageDatabase
}
// main().catch(console.error);