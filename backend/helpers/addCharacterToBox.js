const Box = require('../models/Box');

const addCharacterToBox = async (userId, characters) => {
    try {
        // Ajouter les personnages à la box
        await Box.updateOne({ id_User: userId }, { $push: { box: { $each: characters } } });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des personnages à la box :', error);
        throw error;
    }
};


module.exports = addCharacterToBox;