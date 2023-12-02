const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ensureBoxExists = require('../helpers/helperBox');

exports.signup = async (req, res, next) => {

    try {
        if (req.body.username == undefined) {
            return res.status(400).json({
                message: 'Champ vide !'
            });
        } else {
            username = req.body.username
            role = req.body.role
        }

        const validUsernameRegex = /^[a-zA-Z0-9]+$/; // Check that username contains only alphanumerics

        if (!validUsernameRegex.test(username)) {
            return res.status(400).json({
            message: 'Nom d\'utilisateur invalide. (caractères alphanumériques uniquement)'
            });

        } else if (username.length > process.env.MAX_USERNAME_LENGTH) {
            return res.status(400).json({
            message: `Nom d'utilisateur trop long. ${process.env.MAX_USERNAME_LENGTH} caractères maximum.`
            });

        } else if (await User.findOne({ username: username })) { // Search user in BDD
            return res.status(400).json({
                message: `Utilisateur déjà existant.`
                });

        } else {
            const tempPass = 'admin' // Don't change for the moment
            const user = new User({
                username: username,
                password: await bcrypt.hash(tempPass, 10),
                isTempPassword: true,
                role: role
            });
            
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé.',
                    tempPassword: tempPass
                }))
                .catch(error => {
                    res.status(400).json({ message : 'Erreur lors de la sauvegarde de l\'utilisateur dans la base de données. (voir logs)' })
                    console.log(error) // For unintended errors
                });
            
        }

    } catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error) // For unintended errors
    }

};

exports.login = (req, res, next) => {
    try  {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user === null) {
                    res.status(401).json({ message: 'Identifiants incorrects.' })
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then( async valid => {
                            if (!valid) {
                                res.status(401).json({ message: 'Identifiants incorrects.' })
                            } else {

                                 // Créer la box si elle n'existe pas
                                await ensureBoxExists(user._id);

                                res.status(201).json({
                                    userId: user._id,
                                    token: jwt.sign(
                                        { userId: user._id, role: user.role },
                                        process.env.JWT_SECRET_TOKEN,
                                        { expiresIn: '7d' }
                                    )
                                })
                            }
                        })
                        .catch(error => res.status(500).json({ error }))
                }
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error)
    }
};

exports.changePassword = (req, res, next) => {
    try {
        if (req.auth.userId !== req.params.id) {
            return res.status(401).json({ message: 'Accès non autorisé.' });
        }
        const newPassword = req.body.newPassword;
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Utilisateur introuvable.' });
                }
                return bcrypt.hash(newPassword, 10)
                    .then(hashedNewPassword => {
                        user.password = hashedNewPassword;
                        user.isTempPassword = false;

                        return user.save();
                    })
                    .then(() => res.status(200).json({ message: 'Mot de passe modifié.' }))
                    .catch(()=> res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)'}))
            })
            .catch(error => {
                res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)'});
                console.error(error);
            });
    } catch (error) {
        res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)', error: error.message });
        console.error(error);
    }
};