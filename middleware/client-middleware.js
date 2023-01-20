const jwt = require('jsonwebtoken');
const { HttpStatusCodes } = require("../utils/statuscode");
var { SECRET_TOKEN } = require("../utils/parametre");

function authenticateToken(req, res, next) {
    const authentificationHeader = req.headers['authorization'];
    const token = authentificationHeader && authentificationHeader.split(' ')[1]

    if (token == null) return res.status(HttpStatusCodes.UNAUTHORIZED).json({ data: {}, message: "Veuillez d'abord vous identifier" });

    jwt.verify(token, SECRET_TOKEN, (error, user) => {
        console.log(error);

        if (error) return res.status(HttpStatusCodes.EXPECTATION_FAILED).json(error);

        req.user = user;

        next();
    })
}

module.exports = {
    authenticateToken: authenticateToken
}