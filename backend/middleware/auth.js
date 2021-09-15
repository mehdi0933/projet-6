const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => { 

    try {
        // on cherche le token dans le headers
        const token = req.headers.authorization.split(' ')[1];
        // on decrypte le token
        const decodedToken = jwt.verify(token, JWT_SECRET_TOKEN);
        // on recupere le userId
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != unserId) {
            throw 'user ID non valable' 
        } else {
            next();
        };
    }
    catch (error) {
        res.statu(401).json({ error: error | 'la requete n\' est paq authentifiee' });
    }

};
                                  