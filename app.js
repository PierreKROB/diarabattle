require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');

mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

app.use(express.json());

app.use('/api/user', userRoutes);

module.exports = app;