const { Message } = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.addPost = (req, res) =>
{
    // Token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    User.findOne({ where: { id: userId } })
        .then(user =>
            {   
                if (!user) 
                {
                    return res.status(401).json({ message: "Utilisateur introuvable" });
                }

                Message.create({
                    UserId: user.dataValues.id,
                    message_title: req.body.header,
                    message_content: req.body.content,
                    message_like: 0,
                })
                .then(post => res.status(201).json({ post, message: "Votre message vient d'être publié" }))
                .catch(error => res.status(400).json({ error }))
            })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res) =>
{
    Message.findAll({
        order:[['createdAt', 'DESC']],
        include: {
            model: User,
            attributes: ['user_username']
        }
    })
    .then(allPosts => res.status(200).json({ allPosts }))
    .catch(error => res.status(400).json({ error }))
}