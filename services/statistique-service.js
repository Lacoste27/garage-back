const { ObjectId } = require("mongodb");
const { HttpStatusCodes } = require("../utils/statuscode");
const { temps } = require("../repository/statistique-repository");

function tempsMoyen(request, response) {
    const temp = temps();
    temp.then((reponse) => {
        response.status(HttpStatusCodes.ACCEPTED).json({
            data: {
                tempsmoyen: reponse
            },
            message: "",
            success: true,
            error: false,
        });
    })
}

module.exports = {
    moyen: tempsMoyen
}