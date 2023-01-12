var express = require('express');
var userRouter = express.Router();
var crypto = require('crypto');


/* GET users listing. */
userRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

userRouter.post('/signup', function (req, res) {
  const matchUser = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    salt: ""
  };

  matchUser.salt = crypto.randomBytes(16).toString('hex');
  matchUser.password = crypto.pbkdf2Sync(matchUser.password, matchUser.salt,
    1000, 64, `sha512`).toString(`hex`);

  req.client.collection('client').insertOne(matchUser, (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).send("Error inserting users.");
    } else {
      console.log('Added new users match');
      res.json(matchUser);
    }
  })

});

function validPassword(user, mdp) {
  var hash = crypto.pbkdf2Sync(mdp,
    user.salt, 1000, 64, `sha512`).toString(`hex`);

  return hash === user.password
}

module.exports = userRouter;
