const express = require('express');
const router = express.Router();

const postController = require('../Controllers/Ctrl_post');
const auth = require('../AuthToken/auth_Token');

router.post('/edit', auth, postController.addPost);
router.get('/showAllPosts', auth, postController.getAllPosts);
router.delete('/delete', auth, postController.DeleteOnePost);

module.exports = router;