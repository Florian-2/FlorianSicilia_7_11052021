const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../Controllers/Ctrl_user');

router.post('/signup', 
    check('email')
        .isEmail()
        .withMessage("Adresse email invalide")
        .notEmpty()
        .withMessage("Email requis"), 
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Le mot de passe doit être composé d'aux moins 8 caractères dont 1 Maj, 1 Min et 1 chiffre")
        .notEmpty()
        .withMessage("Email requis"),
    userController.signup);
    
router.post('/login',
    check('email')
        .isEmail()
        .withMessage("Adresse email invalide")
        .notEmpty()
        .withMessage("Email requis"),
    check('password')
        .notEmpty()
        .withMessage("Mot de passe requis"),
    userController.login);

router.get('/profile', userController.profile);

module.exports = router;