const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();



//Route d'inscription
router.post('/register', async (req,res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).send('Le nom et mot de passe est requis');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('Utilisateur enregistré avec succès !');
    } catch (error) {
        res.status(400).send('Erreur lors de l\'enregistrement de l\'utilisateur');
    }
});

// Route de connexion
router.post('/login', async (req,res) => {
    const { username, password }= req.body;

    if (!username || !password) {
        return res.status(400).send('Le nom et mot de passe est requis');
    } 

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).send('Information d\'identification invalide');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).send('Information d\'identification invalide');
    }

    req.session.userId = user._id;
    res.send('Connexion réussi !')
});

module.exports = router;