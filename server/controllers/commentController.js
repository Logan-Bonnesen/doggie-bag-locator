const Comment = require('../models/Comment')
const User = require('../models/User')
const Location = require('../models/Location')

const commentController = {
    createComment: (req, res) => {
        const { text, userId, locationId } = req.body;
        User.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(400).json(`User ${userId} not found`);
                }
                return Location.findByPk(locationId)
                    .then(location => {
                        if (!location) {
                            return res.status(400).json(`Location ${locationId} not found`);
                        }
                        return Comment.create({ text, userId, locationId })
                            .then(comment => {
                                res.status(201).json(comment);
                            });
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(`Server error: ${error}`);
            });
    },
    getCommentsByLocation: (req, res) => {
        const { locationId } = req.params;
        Comment.findAll({ where: { locationId }, include: User })
            .then(comments => {
                res.json(comments)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(`Server error: ${error}`)
            })
    },
    getCommentsByUser: (req, res) => {
        const { userId } = req.params;
        Comment.findAll({ where: { locationID }, include: Location })
            .then(comments => {
                res.json(comments)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(`Server error: ${error}`)
            })
    },
    updateComment: (req, res) => {
        const { commentId } = req.params;
        const { text } = req.body;
        Comment.findByPk(commentId)
            .then(comment => {
                if(!comment) {
                    return res.status(404).json('Comment not found')
                }
                return comment.update({ text })
            })
            .then(comment => {
                res.json(`${comment}`)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(`Server error: ${error}`)
            })
    },
    deleteComment: (req, res) => {
        const { commentId } = req.params;
        Comment.findByPk(commentId)
            .then(comment => {
                if (!comment) {
                    return res.status(404).json('Comment not found')
                }
                return comment.destroy()
            })
            .then(() => {
                res.json('Comment deleted successfully')
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(`Server error: ${error}`)
            })
    }
}

module.exports = commentController