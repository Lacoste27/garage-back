function validateemail(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailformat);
}

function validateuserdata(email, nom, prenom, password) {
  var _nom, _prenom, _password, _email;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  var message = {
    nom: "",
    prenom: "",
    password: "",
    email: "",
    result : ""
  };

  if (nom.length > 0) {
    _nom = true;
  }
  if (prenom.length > 0) {
    _prenom = true;
  }
  if (password.length > 8) {
    _password = true;
  }
  if (email.match(mailformat)) {
    _email = true;
  }
  if (_nom && _prenom && _password && _email) {
    message.nom = "";
    message.prenom = "";
    message.password = "";
    message.email = "";
    message.result = true;
  } else {  
    message.nom = _nom ? "" : "votre nom est incorrect";
    message.prenom = _prenom ? "" : "Votre prenom est incorrect";
    message.password = _password
      ? ""
      : "Le mot de pass doit avoir plus de 8 caractère";
    message.email = _email ? "" : "Votre email est incorrect";
    message.result = false;
  }

  return message;
}

module.exports = {
  validateemail: validateemail,
  validateuserdata: validateuserdata,
};
