const express = require('express');
const router = express.Router();

const postController = require('../Controllers/Ctrl_post');
const auth = require('../AuthToken/auth_Token');

router.post('/edit', auth, postController.addPost);
router.post('/edit/comment', auth, postController.addComment);
router.put('/modify/:id', auth, postController.updatePost);
router.get('/showAllPosts', auth, postController.getAllPosts);
router.delete('/delete/:id', auth, postController.deleteOnePost);

module.exports = router;