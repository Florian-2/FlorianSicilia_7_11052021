const { Message } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models')
const jwt = require('jsonwebtoken');

const decodedToken = (req) => 
{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    return userId;
};

exports.addPost = (req, res) =>
{
    const userId = decodedToken(req);

    User.findOne({ where: { id: userId } })
        .then(user =>
            {   
                if (!user) 
                {
                    return res.status(401).json({ message: "Utilisateur introuvable" });
                }

                Message.create({
                    userId: user.dataValues.id,
                    message_title: req.body.header,
                    message_content: req.body.content,
                    createdAt: Date.now()
                })
                .then(post => res.status(201).json({ post, message: "Votre message vient d'être publié" }))
                .catch(error => res.status(400).json({ error }))
            })
        .catch(error => res.status(500).json({ error }));
};

exports.addComment = (req, res) =>
{
    const userId = decodedToken(req);

    Comment.create({
        id_user: userId,
        MessageId: req.body.postId,
        comment_username: req.body.username,
        comment_content: req.body.content
    })
    .then(comment => res.status(201).json({ comment }))
    .catch(error => res.status(400).json({ error }))
}

exports.updatePost = (req, res) =>
{
    Message.update({
        message_title: req.body.header,
        message_content: req.body.content,
    },
    { 
        where: { id: req.params.id } 
    })
    .then(message => res.status(200).json({ message }))
    .catch(error => res.status(500).json({ error }));
}

exports.getAllPosts = (req, res) =>
{
    Message.findAll({
        order:[['createdAt', 'DESC']],
        include: 
        [
            {
                model: User,
                attributes: ['user_username']
            },
            {
                model: Comment,
                attributes: ['id', 'id_user', 'MessageId', 'comment_content', 'comment_username']
            }
        ]
    })
    .then(allPosts => res.status(200).json({ allPosts }))
    .catch(error => res.status(400).json({ error }))
}


exports.deleteOnePost = (req, res) =>
{
    Message.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Post Supprimer" }))
    .catch(error => res.status(500).json({ error }));
}