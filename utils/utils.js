/**
 * Get a hash from the password.
 */
var crypto = require('crypto');

function GetSalt() {
    return crypto.randomBytes(16).toString('hex');
}

function GetHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
}

function VerifyPassword(user, password) {
    const user_hash = crypto.pbkdf2Sync(password,
        user.salt, 1000, 64, `sha512`).toString(`hex`);
    return user_hash == user.password;
}

const MODEPAIEMENT = {  
    Mvola: "Mvola",
    OrangeMoney:"OrangeMoney",
    AirtelMoney: "AirtelMony",
    Visa :"Visa",
    Espece: "Espece"
}

const REPARATIONETATS = {  
    deposer: "Deposer",
    encours: "En cours de réparation",
    fini: "Sortie"
}

const VOITUREREPARATIONETATS= {  
    encours : "En cours",
    fini:"Finis"
}

const TotalPaiement = function(reparation_faire){  
    const sum = reparation_faire.reduce((somme, reparation) => {  
        return somme+reparation.prix;
    },0)
    return sum;
}

module.exports = {
    GetHash: GetHash,
    GetSalt: GetSalt,
    VerifyPassword: VerifyPassword,
    REPARATIONETAT: REPARATIONETATS,
    VOITUREREPARATIONETAT: VOITUREREPARATIONETATS,
    MODEPAIEMENT:MODEPAIEMENT,
    TotalPaiement: TotalPaiement

}