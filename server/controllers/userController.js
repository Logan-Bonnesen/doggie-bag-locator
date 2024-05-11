const User = require('../models/User.js');

const userController = {
    register: (req, res) => {
        const { username, email, password } = req.body

        // check if email or password is missing
        if (!email || !password) {
            return res.status(400).json('email and password are required')
        }

        // Check if user with the provided email already exists
        User.findOne({ where: { email } })
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json('User already exists with this email')
                }
                User.create({ username, email, password })
                    .then(newUser => {
                        res.status(201).json('User registered successfully')
                    })
                    .catch(error => {
                        res.status(500).json(`internal server error: ${error}`)
                    })
            })
    },
    login: (req, res) => {
        const { email, password } = req.body;

        // find user by email
        User.findOne({ where: { email }})
            .then(user => {
                if (!user) {
                    return res.status(404).json('User not found')
                }

                // check if password is correct
                if (!user.checkPassword(password)) {
                    return res.status(401).json('Invalid email or password')
                }

                res.status(200).json(`login successful, ${user}`)
            })
            .catch(error => {
                res.status(500).json(`internal server error: ${error}`)
            })
    },
    getProfile: (req, res) => {
        const userId = req.userId // assuming userId is stored in req.userId after authentication
        // find user by userId
        User.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json('User not found')
                }

                res.status(200).json(`User data retrieved successfully: ${user}`)
            })
            .catch(error => {
                res.status(500).json(`Internal server error: ${error}`)
            })
    },
    updateUser: (req, res) => {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        //find user by userId
        User.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json('User not found')
                }

               user.update({ username, email, password })
                .then(updatedUser => {
                    res.status(200).json(`USer data updated successfully: ${updatedUser}`)
                }) 
                .catch(error => {
                    res.status(500).json(`Internal server error: ${error}`)
                })
            })
            .catch(error => {
                res.status(500).json(`internal server error: ${error}`)
            })
    },
    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.findByPk(userId) 
            .then(user => {
                if (!user) {
                    return res.status(404).json('User not found')
                }

                user.destroy()
                    .then(() => {
                        res.status(200).json(`User ${user} deleted successfully`)
                    })
                    .catch(error => {
                        res.status(500).json(`Internal server error: ${error}`)
                    })
            })
            .catch(error => {
                res.status(500).json(`Internal server error ${error}`)
            })
    },
    getAllUsers: (req, res) => {
        User.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json(`internal server error: ${error}`)
        })
    },
    getUserById: (req, res) => {
        const userId = req.params.id;
        
        User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found')
            }
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json(`Internal server error: ${error}`)
        })
    }
    
}

module.exports = userController;