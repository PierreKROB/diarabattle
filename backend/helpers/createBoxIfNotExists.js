const Box = require('../models/Box'); // Assurez-vous d'importer votre modèle de boîte
const mongoose = require('mongoose');

const findBoxByUserId = async (userId) => {
    try {
        const box = await Box.findOne({ id_User: userId });
        return box;
    } catch (error) {
        throw error; // Gérez les erreurs selon vos besoins
    }
};

const createBox = async (userId) => {
    try {
        await Box.create({
            id_User: userId,
            box: [] // Initialiser la box avec un tableau vide
        });
    } catch (error) {
        throw error;
    }
};


const createBoxIfNotExists = async (userId) => {
    // Vérifier si la box existe, sinon la créer
    const box = await findBoxByUserId(userId);

    if (!box) {
        await createBox(userId);
    }
};

module.exports = createBoxIfNotExists;