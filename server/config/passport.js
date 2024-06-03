const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const { User } = require('../models')

const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Password or email incorrect'})
                }

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password or email incorrect'})
                        }
                    })
                    .catch(err => done(err))
            })
            .catch(err => done(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => done(null, user))
            .catch(err => done(err))
    })
}

module.exports = initializePassport