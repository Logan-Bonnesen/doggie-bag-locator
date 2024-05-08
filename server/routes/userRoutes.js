const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// user registration
router.post('/register', userController.register)

// user login
router.post('/login', userController.login)

// getting user data
router.get('/profile', userController.getProfile)

//updating user data
router.put('/:id', userController.updateUser)

// deleting a user
router.delete('/:id', userController.deleteUser)

// get all users
router.get('/', userController.getAllUsers)

// get user by id
router.get('/:id', userController.getUserById)

module.exports = router;