const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// create a new comment
router.post('/', commentController.createComment);

// get comment by user ID
router.get('/user/:userId', commentController.getCommentsByUser);

// get comment by location ID
router.get('/location/:locationId', commentController.getCommentsByLocation);

// update comment 
router.put('/:commentId', commentController.updateComment);

// delete a comment
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;