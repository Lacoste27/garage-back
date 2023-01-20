const jwt = require('jsonwebtoken');
const { HttpStatusCodes } = require("../utils/statuscode");
var { SECRET_TOKEN } = require("../utils/parametre");


function authenticateFinancierToken(req, res, next) {
    const authentificationHeader = req.headers['authorization'];
    const token = authentificationHeader && authentificationHeader.split(' ')[1]

    if (token == null) return res.status(HttpStatusCodes.UNAUTHORIZED).json({ data: {}, message: "Veuillez d'abord vous identifier" });

    jwt.verify(token, SECRET_TOKEN, (error, user) => {
        console.log(error);

        if (error) return res.status(HttpStatusCodes.EXPECTATION_FAILED).json(error);

        var role = user.role;
        // S'il ne posséde pas de role
        if (role == null && role == undefined) {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({ data: {}, message: "Vous n'avez pas accès à cette fonctionnalité" });
        }

        var isFinancier = false;
        role.forEach(element => {
            if (element == "financier") {
                isFinancier = true;
            }
        });
        // S'il ne possède pas un rôle "financier"
        if (!isFinancier) {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({ data: {}, message: "Vous n'avez pas accès à cette fonctionnalité" });
        }

        // S'il possède un rôle "financier"
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateFinancierToken: authenticateFinancierToken
}