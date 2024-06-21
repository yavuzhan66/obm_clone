const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dbConfig = require('./config/db')
const indexRoutes = require('./routes/index')


const app = express();
const port = 3000;


///Midleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true}));

//Configuration de la session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

//Connexion a MongoDB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>  console.log('Connecté à MongoDB !'))
.catch(err => console.log('Erreur de connexion à MongoDB', err));


//Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

//Fichiers Statiques pour html
app.use(express.static('public'));




// Démarrage du serveur 
app.listen(port, () => {
    console.log(`Serveur connecté sur http://localhost:${port}`);
});






