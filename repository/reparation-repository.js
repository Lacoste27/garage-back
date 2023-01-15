var { getDatabase } = require("../models/connect");
const { ObjectId } = require('mongodb');

async function getDetailReparation(idreparation) {
    const connection = getDatabase();
    return connection.collection("reparation").findOne({ _id: ObjectId(idreparation) });
}

module.exports = {
    DetailReparation: getDetailReparation
}