const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database.js')
const User = require('./User.js')
const Location = require('./Location.js')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize, 
        modelName: 'Comment'
    }
)

User.hasMany(Comment)
Location.hasMany(Comment)
Comment.belongsTo(User)
Comment.belongsTo(Location)

module.exports = Comment