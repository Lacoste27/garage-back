const { ObjectId } = require("mongodb");
const { HttpStatusCodes } = require("../utils/statuscode");
const { temps, chiffrejour, chiffreMois, depenseMois } = require("../repository/statistique-repository");

function tempsMoyen(request, response) {
    const temp = temps();
    temp.then((reponse) => {
        console.log(reponse);
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
        response.status(HttpStatusCodes.ACCEPTED).json({
            data: {
                chiffreJour: reponse
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

function chiffreParMois(request, response) {
    const chiffreByMonth = chiffreMois();
    chiffreByMonth.then((reponse) => {
        response.status(HttpStatusCodes.ACCEPTED).json({
            data: {
                chiffreMonth: reponse
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

function depenseParMois(request, response) {
    const depenseByMonth = depenseMois();
    depenseByMonth.then((reponse) => {
        console.log(reponse);
        response.status(HttpStatusCodes.ACCEPTED).json({
            data: {
                depenseMonth: reponse
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

module.exports = {
    moyen: tempsMoyen,
    chiffreParJour: chiffreParJour,
    chiffreParMois: chiffreParMois,
    depenseParMois: depenseParMois
}