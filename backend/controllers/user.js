const User = require('../models/User');
// outil de cryptage
const bcrypt = require('bcrypt');
// outil d'identication
const jwt = require('jsonwebtoken');
// brute force
const bf = require('bruteforce');
//fiche.env
require('dotenv').config();
// email-validator
const mailValidator = require('email-validator'); 
// password-validator
const passwordValidator = require('password-validator'); 

//  schema de validation de mot de passe
var schema = new passwordValidator();
 
schema
.is().min(8)                                    
.is().max(20)                                 
.has().uppercase()                              
.has().lowercase()                              
.has().digits(2)
.has().symbols(1)                                 
.has().not().spaces();


// cree un utilisation
exports.signup = (req, res, next) => {
  if (!mailValidator.validate(req.body.email) || (!schema.validate(req.body.password))) {  
    throw { error: " entrer invalide !" }  
} else if (mailValidator.validate(req.body.email) && (schema.validate(req.body.password))) { 
  bcrypt.hash(req.body.password, 10) 
    .then(hash => {
      const user = new User({
        email:req.body.email ,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })

    .catch(error => res.status(500).json({ error }));
  }
  };

// cherche un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            bf({
              len: 3, 
              chars: ['[a-zA-Z0-9]+$'],
              step: console.log
            });
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};