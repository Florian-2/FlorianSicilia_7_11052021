const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js');
const { validationResult } = require('express-validator');

const encrypt = (text) => cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
const decrypt = (data) => cryptoJs.enc.Base64.parse(data).toString(cryptoJs.enc.Utf8);

const decoedToken = (req) => 
{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    return userId;
};

exports.signup = (req, res) => 
{
    const errors = validationResult(req);
    
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = encrypt(req.body.email);

    const admin = req.body.admin ? 1 : 0;

    try 
    {
        bcrypt.hash(req.body.password, 10)
            .then(hash =>
                {
                    const user = User.create({ 
                        user_username: req.body.pseudo, 
                        user_email: email,
                        user_password: hash,
                        user_isAdmin: admin,
                        createdAt: Date.now()
                    })
                    .then(() => res.status(201).json({ user: "Votre compte a été créé avec succès, Bienvenue !" }))
                    .catch(error => res.status(400).json({ error }))
                })
            .catch(error => res.status(500).json({ error }));
    } 
    catch (error) 
    {
        return res.status(500).json(error);
    }
};


exports.login = (req, res) => 
{
    const errors = validationResult(req);
    
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    // Email
    const email = encrypt(req.body.email);

    User.findOne({ where: { user_email: email } })
        .then(user =>
            {   
                if (!user) 
                    return res.status(401).json({ message: "Utilisateur non trouvé, veuillez vous inscrire" });

                bcrypt.compare(req.body.password, user.dataValues.user_password)
                    .then(mdpValid => 
                    {
                        if (!mdpValid)
                            return res.status(401).json({ message: "Email ou mot de passe incorrect" })

                        return res.status(201).json({
                            dataUser: 
                            {
                                userId: user.id, 
                                isAdmin: user.user_isAdmin,
                                token: jwt.sign( 
                                    { userId: user.id },
                                    process.env.JWT_TOKEN,
                                    { expiresIn: '20h' })
                            }
                        });
                    }).catch(error => res.status(500).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
};

// Profile utilisateur
exports.profile = (req, res) => 
{
    const userId = decoedToken(req);

    User.findOne({ 
        attributes: ['user_username', 'user_email', 'createdAt'],
        where: { id: userId }
    })
        .then(user =>
            {   
                const dataUser = {...user.dataValues};
                dataUser.user_email = decrypt(dataUser.user_email);

                return res.status(200).json({ dataUser });
            })
        .catch(error => res.status(500).json({ error }));
}

exports.deleteProfile = (req, res) =>
{
    const userId = decoedToken(req);

    User.destroy({ where: { id: userId } })
    .then(() => res.status(200).json({ message: "Compte supprimer" }))
    .catch(error => res.status(500).json({ error }));
}