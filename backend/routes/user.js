const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// cree un utilisation
router.post('/signup', userCtrl.signup);

// cherche un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;

