const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('doggiebag_db', 'root', 'PassWord1', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;