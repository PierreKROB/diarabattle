const Box = require('../models/Box');

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


const ensureBoxExists = async (userId) => {
    // Vérifier si la box existe, sinon la créer
    const box = await findBoxByUserId(userId);

    if (!box) {
        await createBox(userId);
    }
};

const addCharacterToBox = async (userId, characters) => {
    try {
        // Ajouter les personnages à la box
        await Box.updateOne({ id_User: userId }, { $push: { box: { $each: characters } } });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des personnages à la box :', error);
        throw error;
    }
};


module.exports = {
    findBoxByUserId,
    createBox,
    ensureBoxExists,
    addCharacterToBox,
};