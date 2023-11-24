require('dotenv').config()
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// compatibilité avec différent host
app.use(cors())

//import routes
const userRoutes = require('./routes/user');
const characterRoutes = require('./routes/character');

mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

app.use(express.json());

//utilisation des routes
app.use('/api/user', userRoutes);
app.use('/api/character', characterRoutes);

module.exports = app;