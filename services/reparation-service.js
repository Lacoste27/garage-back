
var { DetailReparation } = require("../repository/reparation-repository");
const { HttpStatusCodes } = require("../utils/statuscode");

function detailReparation(request, response) {
    const idreparation = request.params.idreparation;

    const reparation = DetailReparation(idreparation);
    reparation.then((result) => {
        const rep = result;
        console.log(rep);
        if (rep != null) {
            return response.status(HttpStatusCodes.ACCEPTED).json({ reparation: rep })
        }
    }).catch((error) => {
        console.log(error);
        return response.status(HttpStatusCodes.EXPECTATION_FAILED).json("error");
    })
}

module.exports = {
    reparationDetail: detailReparation
}