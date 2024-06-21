const express = require('express');

const router = express.Router();


//middleware pour vérifier si l'utilisateur est authentifié
function isAuthenticated(req,res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).send('Vous devez vous connecter pour acc"der a cette page');
}

//Route protégée pour la page de formation
router.get('/formation', isAuthenticated, (req,res) => {
    res.send('Bienvenue sur la la de formation !')
});


module.exports = router;