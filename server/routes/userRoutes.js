const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// route for user registration
router.post('/register', userController.register)

// route for user login
router.post('/login', userController.login)

// route for fetching user data
router.get('/profile', userController.getProfile)

module.exports = router;