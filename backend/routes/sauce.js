const express = require('express');
const router = express.Router();
// authantification des routes
const auth = require('../middleware/auth');
 
const multer = require('../middleware/multer-config');


const sauceCtrl = require('../controllers/sauce');



// creation sauce
router.post('/',auth, multer,sauceCtrl.creeSauce);

// on demande une sauce 
router.get('/:id',auth, sauceCtrl.uneSauce);

// on recoit les sauce 
router.get('/',auth,sauceCtrl.recoitSauce);

// on veut modifier une sauce post
router.put('/:id',multer, sauceCtrl.modifSauce);

// on veut supprime unz sauce post 
router.delete('/:id', sauceCtrl.suppSauce);
 
// on veut un like ou dislike
router.post ('/:id/like',sauceCtrl.likeSauce)




module.exports = router;