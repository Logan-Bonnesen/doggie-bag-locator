const express = require('express')
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const User = require('../models/User')

// register route
router.post('/register', (req, res) => {
    const { email, password } = req.body

    //check if user already exists
    User.findOne({ where: { email }})
        .then(user => {
            if (user) {
                return res.status(400).json('Email already registered')
            }

            // hash the password before saving user
            bcrypt.hash(password, 10) 
                .then(hashedPassword => {
                    //creating new user with the hashed password
                    return User.create({ email, password: hashedPassword })
                })
                .then(newUser => {
                    res.status(201).json({ message: 'User registered successfully', user: newUser })
                })
                .catch(err => res.status(500).json({ message: 'error creating user', error: err }))
               
        })
        .catch(err => res.status(500).json({ message: 'Error checking user', error: err }))
})

// login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user })
})

// logout route
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err})
        }
        res.json({ message: 'Logged out successfully' })
    })
})

module.exports = router