const { error } = require("console");
var { getResponsable } = require("../repository/responsable-repository");
const { GetSalt, GetHash, VerifyPassword, GenerateAccessToken } = require("../utils/utils");
const { validateemail, validateuserdata, validatevoituredata } = require("../utils/validation");
const { HttpStatusCodes } = require("../utils/statuscode");
var { SECRET_TOKEN } = require("../utils/parametre");
const jwt = require('jsonwebtoken');

function login(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    const user = getResponsable(email);
    user
        .then((result) => {
            const user = result;
            if (VerifyPassword(user, password)) {
                const token = GenerateAccessToken(user);
                return response
                    .status(HttpStatusCodes.ACCEPTED)
                    .json({
                        data: {
                            token: token
                        }, message: "Vous êtes authentifié en tant que responsable"
                    });
            } else {
                return response
                    .status(HttpStatusCodes.UNAUTHORIZED)
                    .json({ data: {}, message: "Votre mot de passe est incorrect" });
            }
        })
        .catch((error) => {
            console.log(error);
            return response.status(HttpStatusCodes.EXPECTATION_FAILED).json(error);
        });
}

module.exports = {
    login: login
}