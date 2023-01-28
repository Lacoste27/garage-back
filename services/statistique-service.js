const { ObjectId } = require("mongodb");
const { HttpStatusCodes } = require("../utils/statuscode");
const { temps, chiffrejour } = require("../repository/statistique-repository");

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
    }).catch((error) => {
        console.log(error);
        response
            .status(HttpStatusCodes.EXPECTATION_FAILED)
            .json({ data: {}, message: error, success: false, error: true });
    });
}

function chiffreParJour(request, response) {
    const chiffrebyDay = chiffrejour();
    chiffrebyDay.then((reponse) => {
        console.log(reponse);
    }).catch((error) => {
        console.log(error);
        response
            .status(HttpStatusCodes.EXPECTATION_FAILED)
            .json({ data: {}, message: error, success: false, error: true });
    });
}

module.exports = {
    moyen: tempsMoyen,
    chiffreParJour: chiffreParJour
}