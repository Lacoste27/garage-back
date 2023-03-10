/**
 * Get a hash from the password.
 */
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var { SECRET_TOKEN } = require("../utils/parametre");

function GetSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function GetHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

function VerifyPassword(user, password) {
  const user_hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return user_hash == user.password;
}

function SendMail(data, to) {
  let transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "robsonatsiory07@gmail.com",
      pass: "zbemfwyeyycvqcaq",
    },
  });
  const message = {
    from: "robsonaapp22@gmail.com",
    to: to,
    subject: "Facture",
    html: data,
  };

  transporter.sendMail(message).then((response) =>{  
    console.log(response);
  }).catch((error) => {  
    console.log(error);
  })
}


const TotalReparation = function(reparation_faire){  
    const sum = reparation_faire.reduce((somme, reparation) => {  
        return somme+parseInt(reparation.prix);
    },0)
    return sum;
}

function generateAccessToken(user) {
  const payload = {
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: "1800s" });
}

const MODEPAIEMENT = {
  Mvola: "Mvola",
  OrangeMoney: "OrangeMoney",
  AirtelMoney: "AirtelMony",
  Visa: "Visa",
  Espece: "Espece",
};

const REPARATIONETATS = {
  deposer: "Deposer",
  encours: "En cours de réparation",
  fini: "Finis",
  sortie: "Sortie"
};

const VOITUREREPARATIONETATS = {
  encours: "En cours",
  fini: "Finis",
};

module.exports = {
  GetHash: GetHash,
  GetSalt: GetSalt,
  VerifyPassword: VerifyPassword,
  GenerateAccessToken: generateAccessToken,
  REPARATIONETAT: REPARATIONETATS,
  VOITUREREPARATIONETAT: VOITUREREPARATIONETATS,
  MODEPAIEMENT: MODEPAIEMENT,
  TotalReparation:TotalReparation,
  SendMail: SendMail
};
