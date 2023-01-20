var { getDatabase } = require("../models/connect");

async function getResponsable(email) {
    const connection = getDatabase();
    return connection.collection("responsable").findOne({ email: email });
}

module.exports = {
    getResponsable: getResponsable
}